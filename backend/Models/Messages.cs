using Microsoft.EntityFrameworkCore;
using backend.lib.database;
using System;

namespace backend.Models
{
    public class Messages {

        private string _messages;
        private DateTime _time_sent;
        private User _user;

        private int _chatroomid;
 
        public string messages { get => _messages; set => _messages = value; }
        public DateTime time_sent { get => _time_sent; set => _time_sent = value; }       
        
        public int chatroomid { get => _chatroomid; set => _chatroomid = value; }
        public User user { get => _user; set => _user = value; }

        public Messages() {}
    }
}