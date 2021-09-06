using Microsoft.EntityFrameworkCore;
using backend.lib.database;
using System;

namespace backend.Models
{
    public class Topics {
        private Nullable<int> _topicid;
        private string _topic;
        private Nullable<int> _vote_count;

        public string topic { get => _topic; set => _topic = value; }
        public Nullable<int> vote_count { get => _vote_count; set => _vote_count = value; }
        public Nullable<int> topicid { get => _topicid; set => _topicid = value; }
        
        public Topics() {}
    }
}