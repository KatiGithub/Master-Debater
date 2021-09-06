using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Npgsql;
using backend.lib.database;
using backend.RowMappers;

namespace backend.Repositories
{
    public class ParticipantRepository {
        public ParticipantRepository() {}

        private database db = new database();

        public async Task<List<Participants>> getParticipantsByCourtId(int courtid) {
            string query = "SELECT * FROM tblparticipants INNER JOIN tblroles ON tblparticipants.roleid = tblroles.roleid WHERE courtid = @p;";
            query = query.Replace("@p", courtid.ToString());

            using(NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                List<Participants> lsParticipants = await db.queryForMultipleObject(command, new ParticipantsRowMapper());
                return lsParticipants;
            }
        } 

        public Participants getParticipantByUserid(int userid) {
            return null;
        }
    }
}