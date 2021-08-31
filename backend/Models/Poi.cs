using Microsoft.EntityFrameworkCore;
using backend.lib.database;

namespace backend.Models
{
    public class Poi {

        private string _poi_time;
        private bool _acceptance;

        public string poi_time { get => _poi_time; set => _poi_time = value; }
        public bool acceptance { get => _acceptance; set => _acceptance = value; }
        public Poi() {}
    }
}