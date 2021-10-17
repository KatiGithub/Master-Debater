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

        public async Task insertOriginalHost(Court court, User user) {
            string query = "INSERT INTO tblparticipants(courtid, userid, role) VALUES(@a, @b, 1);";

            query = query.Replace("@a", court.courtid.ToString());
            query = query.Replace("@b", user.userid.ToString());

            using(NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb())) {
                await db.execute(command);
            }
        }

        public async Task insertNewAudience(Court court, User user) {
            string query = "INSERT INTO tblparticipants(courtid, userid, role) VALEUS(@a, @b, 2);";

            query = query.Replace("@a", court.courtid.ToString());
            query = query.Replace("@b", user.userid.ToString());
            
            using(NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb())) {
                await db.execute(command);
            }
        }
    }
}