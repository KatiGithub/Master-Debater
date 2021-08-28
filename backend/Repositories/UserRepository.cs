using backend.lib.database;
using backend.Models;
using Npgsql;
using System;
using backend.RowMappers;

namespace backend.Repositories
{
    public class UserRepository {

        private database db = new database();

        public User retrieveUserById(int id) {
            string query = "SELECT * FROM tblusers WHERE userid = @p;";
            query = query.Replace("@p", id.ToString());

            using(NpgsqlCommand cmd = new NpgsqlCommand(query, db.GetDb()))
            {                
                User user = db.queryForSingleObject(cmd, new UserRowMapper())[0];

                return user;
            }
        }

        
    }    
}