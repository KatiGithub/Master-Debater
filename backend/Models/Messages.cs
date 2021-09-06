using Microsoft.EntityFrameworkCore;
using backend.lib.database;

namespace backend.Models
{
    public class Messages {

        private string _messages;
        private string _time_sent;

        private int _chatroomid;
 
        public string messages { get => _messages; set => _messages = value; }
        public string time_sent { get => _time_sent; set => _time_sent = value; }       
        
        public int chatroomid { get => _chatroomid; set => _chatroomid = value; }

        public Messages() {}
    }
}