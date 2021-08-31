using Microsoft.EntityFrameworkCore;
using backend.lib.database;

namespace backend.Models
{
    public class Participants {

        private string _userid;
        private Roles _role;

        public string userid { get => _userid; set => _userid = value; }
        public Roles role { get => _roleid; set => _roleid = value; }
        public Participants() {}
    }
}