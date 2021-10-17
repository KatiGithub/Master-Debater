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

namespace backend.Controllers{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private ParticipantRepository participantRepository = new ParticipantRepository();
        private UserRepository userRepository = new UserRepository();
        private CourtRepository courtRepository = new CourtRepository();

        public ParticipantController()
        {
        }
        
        [HttpGet("checkhost/{court_id}")]
        public async Task<ActionResult<bool>> checkhost(string court_id)
        {
            string auth_token = Request.Headers["Authorization"];
            FirebaseAuth firebaseAuth = Firebase.GetFirebaseAuth();
            try
            {
                FirebaseToken token = await firebaseAuth.VerifyIdTokenAsync(auth_token);
                string uid = token.Uid;
                User user = await userRepository.retrieveByFirebaseUid(uid);
                
                if (await participantRepository.checkIfHost(court_id, user) == 1){
                    return true;
                }
                else 
                {
                    return false;
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
        // [HttpGet("checkhost/{court_token}")]
        // public async Task<ActionResult<bool>> checkhost(string court_token)
        // {
        //     string auth_token = Request.Headers["Authorization"];
        //     FirebaseAuth firebaseAuth = Firebase.GetFirebaseAuth();
            
        //     try
        //     {
        //         FirebaseToken token = await firebaseAuth.VerifyIdTokenAsync(auth_token);
        //         string uid = token.Uid;

        //         User user = await userRepository.retrieveByFirebaseUid(uid);
        //         Court court = await courtRepository.retrieveCourtByToken(court_token);

        //         if (await participantRepository.checkIfHost(court, user) == 1)
        //         {
        //             return true;
        //         }
        //         else
        //         {
        //             return false;
        //         }
        //     }
        //     catch (FirebaseAuthException)
        //     {
        //         return Unauthorized();
        //     }
        //     catch (Exception)
        //     {
        //         return NotFound();
        //     }
        // }
    
    }

}
