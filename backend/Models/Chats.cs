using Microsoft.EntityFrameworkCore;
using backend.lib.database;

namespace backend.Models
{
    public class Chats {

        private Messages[] _room_messages;
        private int _room_id;
        private string _start_time;
// why do we need chat start time tho

        public Messages[] room_messages { get => _room_messages; set => _room_messages = value; }       
        public int room_id { get => _room_id; set => _room_id = value; }
        public string start_time { get => _start_time; private set; }
        public Chats() {}
    }
}