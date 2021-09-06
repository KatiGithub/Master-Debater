using System.Threading.Tasks;
using backend.lib.database;
using backend.Models;
using Npgsql;

namespace backend.Repositories
{
    public class ChatroomRepository
    {
        private database db = new database();

        public async Task<int> createChatRoom()
        {
            string query = @"
            INSERT INTO tblchatroom(chat_start_time)
            VALUES((SELECT NOW())) RETURNING chatroomid;
            ";

            using (NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                int chatroomid = (int) await db.queryForSingleObject(command, typeof(int), "chatroomid");

                return chatroomid;
            }

        }
    }
}