using Microsoft.EntityFrameworkCore;
using backend.lib.database;

namespace backend.Models
{
    public class Roles {
        private string _roles;
        public string roles { get => _roles; set => _roles = value; }
        public Roles() {}
    }
}