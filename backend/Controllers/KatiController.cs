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

        // [HttpGet("{id}")]
        // public ActionResult<TModel> GetTModelById(int id)
        // {
        //     return null;
        // }

        // [HttpPost("")]
        // public ActionResult<TModel> PostTModel(TModel model)
        // {
        //     return null;
        // }

        // [HttpPut("{id}")]
        // public IActionResult PutTModel(int id, TModel model)
        // {
        //     return NoContent();
        // }

        // [HttpDelete("{id}")]
        // public ActionResult<TModel> DeleteTModelById(int id)
        // {
        //     return null;
        // }

        [HttpGet]
        public String Get() {
            return "hello world";
        }

        [HttpGet]
        public String test() {
            return "test";
        }
    }
}
