using Microsoft.EntityFrameworkCore;
using backend.lib.database;

namespace backend.Models
{
    public class Court {

        private int _courtid;
        private string _topic;
        private int _current_state;
        private string _prep_time;
        private Chats[] _chatrooms;
        private Topics[] _topics;
        

        public int courtid { get => _courtid; set => _courtid = value; }
        public string topic { get => _topic; set => _topic = value; }
        public int current_state {get => _courtid; set => _current_state = value; }
        public string prep_time { get => _prep_time; set => _prep_time = value; }
        public Chats[] chatrooms { get => _chatrooms; set => _chatrooms = value; }
        public Topics[] topics { get => _topics; set => _topics = value; }
        public Court() {}
    }
}