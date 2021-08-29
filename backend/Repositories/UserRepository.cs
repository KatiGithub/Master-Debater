using backend.lib.database;
using backend.Models;
using Npgsql;
using System;
using backend.RowMappers;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public class UserRepository {

        private database db = new database();

        public async Task<User> retrieveUserById(int id) {
            string query = "SELECT * FROM tblusers WHERE userid = @p;";
            query = query.Replace("@p", id.ToString());

            using(NpgsqlCommand cmd = new NpgsqlCommand(query, db.GetDb()))
            {                
                User user = await db.queryForSingleObject(cmd, new PublicUserRowMapper());

                return user;
            }
        }

        
    }    
}