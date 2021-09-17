using backend.Models;
using backend.lib.database;
using System.Collections.Generic;
using Npgsql;

namespace backend.RowMappers
{
    public class MessageRowMapper : RowMapper<Messages>
    {
        public List<Messages> mapRow(NpgsqlDataReader dataReader)
        {
            List<Messages> lMessages = new List<Messages>();

            while(dataReader.Read())
            {
                Messages msg = new Messages();

                msg.chatroomid = dataReader.GetInt32(dataReader.GetOrdinal("chatroomid"));
                msg.messages = dataReader.GetString(dataReader.GetOrdinal("message"));
                msg.user.userid = dataReader.GetInt32(dataReader.GetOrdinal("userid"));
                msg.time_sent = dataReader.GetDateTime(dataReader.GetOrdinal("time_sent"));

                lMessages.Add(msg);
            }

            return lMessages;
        }
    }
}