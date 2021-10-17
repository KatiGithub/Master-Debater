using Microsoft.EntityFrameworkCore;
using backend.lib.database;
using backend.Models;
using System.Collections.Generic;
using System;

namespace backend.utils{
    
    public class RolesInit
    {
        public List<Roles> RolesList = new List<Roles>{
            new Roles{ roles = "Host" },
            new Roles{ roles = "Audience"},
            new Roles{ roles = "Judge"},
            new Roles{ roles = "Speaker"}
        };
    }
}
