using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Repositories;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
//using backend.Models;

namespace backend.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class CourtController : ControllerBase
    {
        private CourtRepository courtRepository = new CourtRepository();

        public CourtController()
        {
        }

        [HttpGet("retrieve/{court_token}")]
        public async Task<ActionResult<Court>> retrieveCourtByToken(string court_token)
        {
            Court court = await courtRepository.retrieveCourtById(court_token);
            return Ok(court);
        }

        [HttpPost("create")]
        public async Task<ActionResult<string>> createCourt() {
            string court_token = await courtRepository.createCourt();
            return Ok(court_token);
        } 
    }
}