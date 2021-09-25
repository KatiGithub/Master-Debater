using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using backend.Repositories;
using System.Collections.Generic;

namespace backend.Hubs
{
    public class ChatHub : Hub
    {
        private ChatroomRepository chatroomRepository = new ChatroomRepository();

        // public async Task SendMessage(string message, int chatroomid)
        // {
        //     List<string> lsConnectionId = await chatroomRepository.getConnectionIds(chatroomid);

        //     foreach(string connectionid in lsConnectionId) {
        //         await Clients.Client(connectionid).SendAsync("ReceiveMessage", message);
        //     }
        // }

       
    }
}