using System.Collections.Generic;
using backend.lib.database;
using backend.Models;
using Npgsql;

namespace backend.RowMappers
{
    public class ParticipantsRowMapper : RowMapper<Participants>
    {
        public List<Participants> mapRow(NpgsqlDataReader dataReader)
        {   
            List<Participants> lsParticipants = new List<Participants>();

            while(dataReader.Read()) {
                Participants participants = new Participants();
                Roles role = new Roles();

                participants.courtid = (int) dataReader.GetValue(dataReader.GetOrdinal("courtid"));
                participants.userid = (int) dataReader.GetValue(dataReader.GetOrdinal("userid"));

                role.roles = dataReader.GetValue(dataReader.GetOrdinal("role")).ToString();
                participants.role = role;

                lsParticipants.Add(participants);
            }

            return lsParticipants;
        }
    }
}