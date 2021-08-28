using System.Collections.Generic;
using backend.lib.database;
using backend.Models;
using Npgsql;

namespace backend.RowMappers
{
    public class UserRowMapper : RowMapper<List<User>>
    {
        public List<User> mapRow(NpgsqlDataReader dataReader)
        {
            List<User> lUsers = new List<User>();

            while (dataReader.Read())
            {
                User user = new User();
                
                user.userid = (int) dataReader.GetValue(0);
                user.peerid = dataReader.GetValue(1).ToString();
                user.firebaseuid = dataReader.GetValue(2).ToString();
                user.email = dataReader.GetValue(3).ToString();
                user.firstname = dataReader.GetValue(4).ToString();
                user.lastname = dataReader.GetValue(5).ToString();

                lUsers.Add(user);
            }

            return lUsers;
        }
    }
}