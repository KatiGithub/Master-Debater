using backend.lib.database;
using Npgsql;
using backend.Models;
using System.Threading.Tasks;
using backend.RowMappers;
using System.Collections.Generic;

namespace backend.Repositories
{
    public class MessageRepository
    {
        private database db = new database();
        public MessageRepository() {

        }

        public async Task addMessages(string message, int chatroomid, int userid) {
            string query = @"
            INSERT INTO tblmessages(messageid, userid, chatroomid, message, time_sent)
            VALUES(DEFAULT, @a, @b, '@c', NOW());
            ";

            query = query.Replace("@a", userid.ToString());
            query = query.Replace("@b", chatroomid.ToString());
            query = query.Replace("@c", message);

            using(NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                await db.execute(command);
            }
        }

        public async Task<Messages> retrieveMessageById(int messageid)
        {
            string query = @"
            SELECT * FROM tblmessages WHERE messageid = @a;
            ";

            query = query.Replace("@a", messageid.ToString());

            using(NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                Messages msg = await db.queryForSingleObjectWithRepo(command, new MessageRowMapper());

                return msg;
            }
        }

        public async Task<List<Messages>> retrieveMessageByChatroomId(int chatroomid)
        {
            string query = @"
            SELECT * FROM tblmessages WHERE chatroomid = @a;
            ";

            query = query.Replace("@a", chatroomid.ToString());

            using(NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                List<Messages> lMessage = await db.queryForMultipleObject(command, new MessageRowMapper());

                return lMessage;
            }
        }
    }
}