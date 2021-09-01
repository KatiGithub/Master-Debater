using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using backend.Repositories;
using backend.Models;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController()
        {}

        private UserRepository userRepository = new UserRepository();

        // GET: /user/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> retrieveUserById(int id) {
            Response.Headers.Add("test", "test again");

            User user = await userRepository.retrieveUserById(id);
            return Ok(user);
        }
    }
}