using System.Collections.Generic;
using backend.lib.database;
using backend.Models;
using Npgsql;

namespace backend.RowMappers
{
    public class CourtRowMapper : RowMapper<Court>
    {
        public List<Court> mapRow(NpgsqlDataReader dataReader)
        {
            List<Court> lCourt = new List<Court>();

            while(dataReader.Read()) {
                Court court = new Court();
                court.courtid = !dataReader.IsDBNull(dataReader.GetOrdinal("courtid")) ? dataReader.GetInt32(dataReader.GetOrdinal("courtid")) : (int?) null;
                court.court_token = !dataReader.IsDBNull(dataReader.GetOrdinal("court_token")) ? dataReader.GetValue(dataReader.GetOrdinal("court_token")).ToString() : (string) null;
                court.current_state = !dataReader.IsDBNull(dataReader.GetOrdinal("current_state")) ? dataReader.GetInt32(dataReader.GetOrdinal("current_state")) : (int?) null;
                court.topic.topicid = !dataReader.IsDBNull(dataReader.GetOrdinal("topicid")) ? dataReader.GetInt32(dataReader.GetOrdinal("topicid")) : (int?) null;

                court.prep_time = !dataReader.IsDBNull(dataReader.GetOrdinal("prep_time")) ? dataReader.GetInt32(dataReader.GetOrdinal("prep_time")) : (int?) null;
                court.general_chat_id.room_id = !dataReader.IsDBNull(dataReader.GetOrdinal("general_chat")) ? dataReader.GetInt32(dataReader.GetOrdinal("general_chat")) : (int?) null;
                court.team1_chat_id.room_id = !dataReader.IsDBNull(dataReader.GetOrdinal("team1_chat")) ? dataReader.GetInt32(dataReader.GetOrdinal("team1_chat")) : (int?) null;
                court.team2_chat_id.room_id = !dataReader.IsDBNull(dataReader.GetOrdinal("team2_chat")) ? dataReader.GetInt32(dataReader.GetOrdinal("team2_chat")) : (int?) null;
                court.adjudicator_chat_id.room_id = !dataReader.IsDBNull(dataReader.GetOrdinal("adjudicator_chat")) ? dataReader.GetInt32(dataReader.GetOrdinal("adjudicator_chat")) : (int?) null;
                
                lCourt.Add(court);
            }

            return lCourt;
        }
    }
}