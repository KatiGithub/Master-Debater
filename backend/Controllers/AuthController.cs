using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using backend.utils.AuthenticationHandlers;
using Microsoft.AspNetCore.Authorization;
using FirebaseAdmin.Auth;
using backend.utils;
using backend.Models;
using backend.Repositories;
using System.Security.Claims;
using System.Text.Json;
//using backend.Models;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserRepository userRepository = new UserRepository();

        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly IOptionsMonitorCache<ValidateJwtTokenAuthenticationSchemeOptions> _optionsCache;

        public AuthController(IAuthenticationSchemeProvider schemeProvider, IOptionsMonitorCache<ValidateJwtTokenAuthenticationSchemeOptions> optionsCache)
        {
            _schemeProvider = schemeProvider;
            _optionsCache = optionsCache;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> login(string scheme, string optionsMessage)
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return Unauthorized("No auth token sent");
            }

            string auth_token = Request.Headers["Authorization"];
            FirebaseAuth firebaseAuth = Firebase.GetFirebaseAuth();

            try
            {
                FirebaseToken token = await firebaseAuth.VerifyIdTokenAsync(auth_token);
                string uid = token.Uid;

                User user = await userRepository.retrieveByFirebaseUid(uid);

                if (user != null)
                {
                    return Ok();
                }
                else
                {
                    return Unauthorized("User is not registered");
                }
            }
            catch (FirebaseAuthException)
            {
                return Unauthorized("invalid token");
            }
            catch (FormatException)
            {
                return Unauthorized("no");
            }
        }

        [Route("signup/{email=}")]
        public async Task<IActionResult> signup(string email)
        {
            if(await userRepository.checkUserExistsByEmail(email))
            {
                return Ok();
            } else {
                return Unauthorized();
            }
        }

        [Route("register")]
        public async Task<IActionResult> register([FromBody] string content) {
            if(!Request.Headers.ContainsKey("Authorization")) {
                return Unauthorized("no authorization key");
            }

            var values = JsonSerializer.Deserialize<Dictionary<string, string>>(content);

            var auth_token = Request.Headers["Authorization"];

            FirebaseAuth firebaseAuth = Firebase.GetFirebaseAuth();
            
            try {
                User user = new User();
                
                FirebaseToken token = await firebaseAuth.VerifyIdTokenAsync(auth_token);
                string uid = token.Uid;

                if(await userRepository.checkUserExists(uid)) {
                    return Unauthorized();
                }

                UserRecord user_new = await firebaseAuth.GetUserAsync(uid);

                user.email = user_new.Email;
                user.firebaseuid = uid;
                user.firstname = values["firstname"];
                user.lastname = values["lastname"];

                return Ok();
            } catch (Exception) {
                return Unauthorized();
            }
        }
    }
}