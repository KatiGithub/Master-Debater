using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Repositories;
using backend.Models;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Hubs;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController: ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task SendMessage(Chats message)
        {
            await _hubContext.Clients.All.SendAsync("hi", "user");
        }


    }
}