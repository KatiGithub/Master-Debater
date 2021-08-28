using Microsoft.EntityFrameworkCore;
using backend.lib.database;

namespace backend.Models
{
    public class User {

        private int _userid;
        private string _peerid;
        private string _firebaseuid;
        private string _email;
        private string _firstname;
        private string _lastname;

        public int userid { get => _userid; set => _userid = value; }

        public string peerid { get => _peerid; set => _peerid = value;}
        
        public string firebaseuid { get => _firebaseuid; set => _firebaseuid = value;}

        public string email { get => _email; set => _email = value;}

        public string firstname { get => _firstname; set => _firstname = value;}

        public string lastname { get => _lastname; set => _lastname = value;}

        public User() {}
    }
}