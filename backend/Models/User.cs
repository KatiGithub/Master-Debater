using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class User : DbContext {

        public int userid { get => userid; set => userid = value; }
        
        public string firebaseuid { get => firebaseuid; set => firebaseuid = value;}

        public string email { get => email; set => email = value;}

        public string firstname { get => firstname; set => firstname = value;}

        public string lastname { get => lastname; set => lastname = value;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            

        }
    }
}