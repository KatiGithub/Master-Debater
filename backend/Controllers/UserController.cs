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

        // [HttpGet]
        [Route("{id}")]
        public IActionResult retrieveUserById(int id) {
            User user = userRepository.retrieveUserById(id);
            return Ok(user);
        }
    }
}