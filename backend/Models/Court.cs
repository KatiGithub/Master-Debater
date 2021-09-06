using Microsoft.EntityFrameworkCore;
using backend.lib.database;
using System.Collections.Generic;
using System;

namespace backend.Models
{
    public class Court
    {

        private Nullable<int> _courtid;
        private Nullable<int> _current_state = 0;
        private Nullable<int> _prep_time;
        private Chats _general_chat_id = new Chats();
        private Chats _team1_chat_id = new Chats();
        private Chats _team2_chat_id = new Chats();
        private Chats _adjudicator_chat_id = new Chats();
        private List<Topics> _topic_candidates = new List<Topics>();
        private Topics _topic = new Topics();
        private List<Participants> _participants;
        private string _court_token;
        public Nullable<int> courtid { get => _courtid; set => _courtid = value; }
        public Topics topic { get => _topic; set => _topic = value; }
        public Nullable<int> current_state { get => _current_state; set => _current_state = value; }
        public Nullable<int> prep_time { get => _prep_time; set => _prep_time = value; }
        public List<Topics> topics { get => _topic_candidates; set => _topic_candidates = value; }
        public Chats general_chat_id { get => _general_chat_id; set => _general_chat_id = value; }
        public Chats team1_chat_id { get => _team1_chat_id; set => _team1_chat_id = value; }
        public Chats team2_chat_id { get => _team2_chat_id; set => _team2_chat_id = value; }
        public Chats adjudicator_chat_id { get => _adjudicator_chat_id; set => _adjudicator_chat_id = value; }
        public List<Participants> participants { get => _participants; set => _participants = value; }
        public string court_token { get => _court_token; set => _court_token = value; }
        public Court() { }
    }
}