using System.Collections.Generic;
using backend.lib.database;
using backend.Models;
using Npgsql;

namespace backend.RowMappers
{
    public class ChatroomMembersRowMapper : RowMapper<ChatroomMember>
    {
        public List<ChatroomMember> mapRow(NpgsqlDataReader dataReader)
        {
            List<ChatroomMember> lmember = new List<ChatroomMember>();

            while(dataReader.Read()) {
                ChatroomMember member = new ChatroomMember();

                member.chat.room_id = dataReader.GetInt32(dataReader.GetOrdinal("chatroomid"));
                member.user.userid = dataReader.GetInt32(dataReader.GetOrdinal("userid"));
                member.connectionid = dataReader.GetString(dataReader.GetOrdinal("connectionid"));

                lmember.Add(member);
            }

            return lmember;
        }
    }
}