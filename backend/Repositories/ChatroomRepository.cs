using System.Collections.Generic;
using System.Threading.Tasks;
using backend.lib.database;
using backend.Models;
using backend.RowMappers;
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
                int chatroomid = (int)await db.queryForSingleObject(command, typeof(int), "chatroomid");

                return chatroomid;
            }

        }

        public async Task<List<string>> getConnectionIds(int chatroomid)
        {
            string query = @"
            SELECT FROM tblchatroommembers
            WHERE chatroomid = @p;
            ";

            query = query.Replace("@p", chatroomid.ToString());

            using (NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                List<ChatroomMember> lmember = await db.queryForMultipleObject(command, new ChatroomMembersRowMapper());
                List<string> lconnectionid = new List<string>();

                foreach(ChatroomMember member in lmember) {
                    lconnectionid.Add(member.connectionid);
                }

                return lconnectionid;
            }
        }
    }
}