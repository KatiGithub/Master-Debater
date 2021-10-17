using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Repositories;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using FirebaseAdmin.Auth;
using backend.utils;
using System.Text.Json;
using System.Text.Json.Serialization;
//using backend.Models;

namespace backend.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class CourtController : ControllerBase
    {
        private CourtRepository courtRepository = new CourtRepository();
        private UserRepository userRepository = new UserRepository();

        public CourtController()
        {
        }

        [HttpGet("retrieve/{court_token}")]
        public async Task<ActionResult<Court>> retrieveCourtByToken(string court_token)
        {
            Court court = await courtRepository.retrieveCourtByToken(court_token);
            return Ok(court);
        }

        [HttpPost("create")]
        public async Task<ActionResult<string>> createCourt()
        {
            string court_token = await courtRepository.createCourt();
            string json_court_token = JsonSerializer.Serialize(court_token);
            
            string auth_token = Request.Headers["Authorization"];
            FirebaseAuth firebaseAuth = Firebase.GetFirebaseAuth();

            try
            {
                FirebaseToken token = await firebaseAuth.VerifyIdTokenAsync(auth_token);
                string uid = token.Uid;

                User user = await userRepository.retrieveByFirebaseUid(uid);
                Court court = await courtRepository.retrieveCourtByToken(court_token);

                if (await courtRepository.userJoinCourt(user, court, true))
                {
                    return Ok(json_court_token);
                }
                else
                {
                    return Ok("ok but there's an error here!");
                }
            }
            catch (FirebaseAuthException)
            {
                return Unauthorized();
            }
            catch (Exception)
            {
                return NotFound();
            }

        }

        [HttpGet("join/{court_token}")]
        public async Task<ActionResult<string>> joinCourt(string court_token)
        {
            string auth_token = Request.Headers["Authorization"];
            FirebaseAuth firebaseAuth = Firebase.GetFirebaseAuth();

            try
            {
                FirebaseToken token = await firebaseAuth.VerifyIdTokenAsync(auth_token);
                string uid = token.Uid;

                User user = await userRepository.retrieveByFirebaseUid(uid);
                Court court = await courtRepository.retrieveCourtByToken(court_token);

                if (await courtRepository.userJoinCourt(user, court, false))
                {
                    return Ok();
                }
                else
                {
                    return Ok();
                }
            }
            catch (FirebaseAuthException)
            {
                return Unauthorized();
            }
            catch (Exception)
            {
                return NotFound();
            }

            // return Ok();
        }

    }
}