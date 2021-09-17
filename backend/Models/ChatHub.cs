using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using backend.Models;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub<IChatHub>
    {
        public async Task SendBroadcastAsync(Chats chatMessage, string _user)
        {
            await Clients.All.MessageReceivedFromHub(chatMessage, _user);
        }
        public override async Task OnConnectedAsync()
        {
            await Clients.All.NewUserConnected("a new user connected");
        }
    }

    public interface IChatHub
    {
        Task MessageReceivedFromHub(Chats chatMessage, string user);
        Task NewUserConnected(string message);
    }
}