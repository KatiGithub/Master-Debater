using Microsoft.EntityFrameworkCore;
using backend.lib.database;

namespace backend.Models
{
    public class Participants {

        private int _userid;
        private Roles _role;
        private int _courtid;

        public int userid { get => _userid; set => _userid = value; }
        public Roles role { get => _role; set => _role = value; } 
        public int courtid { get => _courtid; set => _courtid = value; }
        public Participants() {}
    }
}