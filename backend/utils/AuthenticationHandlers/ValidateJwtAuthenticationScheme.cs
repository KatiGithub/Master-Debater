using System;
using System.IO;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using backend.utils;
using FirebaseAdmin.Auth;
using backend.Repositories;
using backend.Models;

namespace backend.utils.AuthenticationHandlers
{
    public class ValidateJwtTokenAuthenticationSchemeOptions : AuthenticationSchemeOptions
    {
        public const string name = "FirebaseJwtAuthenticationScheme";
        public string DisplayMessage { get; set; }
    }

    public class ValidateJwtTokenAuthenticationHandler : AuthenticationHandler<ValidateJwtTokenAuthenticationSchemeOptions>
    {
        private UserRepository userRepository = new UserRepository();

        public ValidateJwtTokenAuthenticationHandler(IOptionsMonitor<ValidateJwtTokenAuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock) : base(options, logger, encoder, clock)
        {
        }

        protected async override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return await Task.FromResult(AuthenticateResult.Fail("No Authorization header found"));
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
                    var claims = new[] {
                        new Claim(ClaimTypes.Email, user.email),
                        new Claim(ClaimTypes.Name, (user.firstname + user.lastname)),
                        new Claim(ClaimTypes.NameIdentifier, user.userid.ToString())
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, nameof(ValidateJwtTokenAuthenticationHandler));
                    var ticket = new AuthenticationTicket(
                        new ClaimsPrincipal(claimsIdentity), this.Scheme.Name);

                    return await Task.FromResult(AuthenticateResult.Success(ticket));

                }
                else
                {
                    return await Task.FromResult(AuthenticateResult.Fail("User does not exist"));
                }
            }
            catch (FirebaseAuthException)
            {
                return await Task.FromResult(AuthenticateResult.Fail("Invalid JWT Token"));
            } catch(FormatException) {
                return await Task.FromResult(AuthenticateResult.Fail("Something something"));
            }
        }
    }
}