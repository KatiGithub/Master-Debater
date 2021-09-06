using Microsoft.EntityFrameworkCore;
using backend.lib.database;
using backend.Models;
using System.Collections.Generic;
using System;

namespace backend.Models
{
    public class Chats {
        private Nullable<int> _room_id;
        private string _start_time;
        // why do we need chat start time tho    
        public Nullable<int> room_id { get => _room_id; set => _room_id = value; }
        public string start_time { get => _start_time; set => _start_time = value; }
        public Chats() {}
    }
}