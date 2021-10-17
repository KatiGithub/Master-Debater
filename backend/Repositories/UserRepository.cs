using backend.lib.database;
using backend.Models;
using Npgsql;
using System;
using backend.RowMappers;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace backend.Repositories
{
    public class UserRepository
    {

        private database db = new database();

        public async Task<User> retrieveUserById(int id)
        {
            string query = "SELECT * FROM tblusers WHERE userid = @p;";
            query = query.Replace("@p", id.ToString());

            using (NpgsqlCommand cmd = new NpgsqlCommand(query, db.GetDb()))
            {
                User user = await db.queryForSingleObjectWithRepo(cmd, new PublicUserRowMapper());

                return user;
            }
        }

        public async Task<bool> checkUserExists(string uid)
        {
            string query = "SELECT * FROM tblusers WHERE firebaseuid = '@p'";

            query = query.Replace("@p", uid);

            using (NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                User user = await db.queryForSingleObjectWithRepo(command, new UserRowMapper());
                return (user != null) ? true : false;
            }
        }

        public async Task<bool> checkUserExistsByEmail(string email)
        {
            string query = "SELECT * FROM tblusers WHERE email = '@p'";
            query = query.Replace("@p", email);

            using (NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                User user = await db.queryForSingleObjectWithRepo(command, new UserRowMapper());
                return (user != null) ? true : false;
            }

        }

        public async Task<User> retrieveByFirebaseUid(string uid)
        {
            string query = "SELECT * FROM tblusers WHERE firebaseuid = '@p'";

            query = query.Replace("@p", uid);

            using (NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                User user = await db.queryForSingleObjectWithRepo(command, new UserRowMapper());
                return user;
            }
        }

        public async Task createNewUser(User user)
        {
            string query = @"
            INSERT INTO tblusers(userid, firstname, lastname, email, firebaseuid)
            VALUES(DEFAULT, '@a', '@b', '@c', '@d');
            ";

            query = query.Replace("@a", user.firstname);
            query = query.Replace("@b", user.lastname);
            query = query.Replace("@c", user.email);
            query = query.Replace("@d", user.firebaseuid);

            using (NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                await db.execute(command);
            }
        }

        public async Task<Boolean> checkUserHost(string court_token, string uid) {
            string query = @"
            SELECT COUNT() FROM tblcourt
            JOIN tblparticipants WHERE tblcourt.courtid = tblparticipants.courtid
            JOIN tbluser WHERE tbluser.userid = tblparticipants.userid
            WHERE tbluser.firebaseuid = '@a' AND tblcourt.court_token = '@b' AND tblparticipants.role = 'host';
            ";

            query = query.Replace("@a", uid);
            query = query.Replace("@b", court_token);

            using(NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb())) {
                return ((int) await db.queryForSingleObject(command, typeof(int), "COUNT") > 0);
            }
        }
    }
}