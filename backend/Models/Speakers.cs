using Microsoft.EntityFrameworkCore;
using backend.lib.database;
using backend.Models;
using System.Collections.Generic;

namespace backend.Models
{
    public class Speakers
    {
        private string _speaking_time;
        private string _position_name;
        private string _position_order;
        private string _start_speaking_time;
        private string _end_speaking_time;
        private int _score;
        private List<Poi> _pois;


        public string speaking_time { get => _speaking_time; set => _speaking_time = value; }
        public string position_time { get => _position_name; set => _position_name = value; }
        public string postion_order { get => _position_order; set => _position_order = value; }
        public string start_speaking_time { get => _start_speaking_time; set => _start_speaking_time = value; }
        public string end_speaking_time { get => _end_speaking_time; set => _end_speaking_time = value; }
        public int score { get => _score; set => _score = value; }
        public List<Poi> pois { get => _pois; set => _pois = value; }


        public Speakers() { }
    }
}