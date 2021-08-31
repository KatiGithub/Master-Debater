using Microsoft.EntityFrameworkCore;
using backend.lib.database;

namespace backend.Models
{
    public class Messages {

        private string _messages;
        private string _time_sent;
 
        public string messages { get => _messages; private set; }
        public string time_sent { get => _time_sent; private set; }       
        
        public Messages() {}
    }
}