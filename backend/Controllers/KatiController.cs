using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
//using backend.Models;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class KatiController : ControllerBase
    {
        public KatiController()
        {
        }

        


        //Redirect from home, get state
        [HttpGet("{state}")]
        public IActionResult GetCurrectState()
        {
            return "your current state is: " + state.ToString();
        }
        //Get court id to enter the room
        [HttpGet("{courtId}")]
        public IActionResult GetCourtID(int courtId)
        {
            return "your court id is: " + courtId.ToString();
        }

        [HttpPost("prepRoomData")]
        public IActionResult PostPrepRoomData()
        {
            return "string: topic, int: prep-time, string: format";
        }

        //POI
        [HttpGet("acceptance")]
        public IActionResult CheckPOIAcceptance()
        {
            return "POI acceptance available";
        }

        [HttpGet("poi_time")]
        public IActionResult GetPOITime(string poi_time)
        {
            return "POI Time: " + poi_time;
        }
        
        [HttpGet("{speakerid}")]
        public IActionResult GetSpeakerId(int speakerid)
        {
            return "Speaker ID: " + speakerid;
        }

        
        [HttpGet("{topic}")]
        public IActionResult GetTopic(string topic)
        {
            return "topic" + topic();
        }
        
        [HttpGet("{prep_time}")]
        public IActionResult GetPrepTime(int prep_time)
        {
            return prep_time;
        }

        

        [HttpGet]
        public String Get() {
            return "hello world";
        }

        [HttpGet]
        public String test() {
            return "test";
        }
        [HttpGet]
        public String 
    }
}