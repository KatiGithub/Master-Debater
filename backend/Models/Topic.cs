using Microsoft.EntityFrameworkCore;
using backend.lib.database;

namespace backend.Models
{
    public class Topics {
        private string _topic;
        private int _vote_count;

        public string topic { get => _topic; set => _topic = value; }
        public int vote_count { get => _vote_count; set => _vote_count = value; }
        
        
        public Topics() {}
    }
}