using System.Threading.Tasks;
using backend.lib.database;
using backend.Models;
using backend.RowMappers;
using Npgsql;
using backend.utils;
using System.Diagnostics;

namespace backend.Repositories
{
    public class CourtRepository
    {
        public CourtRepository() { }

        private database db = new database();
        private ChatroomRepository chatroomRepository = new ChatroomRepository();
        private ParticipantRepository participantRepository = new ParticipantRepository();
        public async Task<Court> retrieveCourtByToken(string court_token)
        {
            string query = @"
            SELECT * FROM tblcourts
            WHERE court_token = '@p';
            ";

            query = query.Replace("@p", court_token);

            using (NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                Court court = await db.queryForSingleObjectWithRepo(command, new CourtRowMapper());
                return court;
            }
        }

        public async Task<string> createCourt(User user)
        {
            // Create court chatrooms
            Court court = new Court();

            court.adjudicator_chat_id.room_id = await chatroomRepository.createChatRoom();
            court.general_chat_id.room_id = await chatroomRepository.createChatRoom();
            court.team1_chat_id.room_id = await chatroomRepository.createChatRoom();
            court.team2_chat_id.room_id = await chatroomRepository.createChatRoom();
            court.court_token = CommonUtils.GenerateRandomToken();

            string query = @"
            INSERT INTO tblcourts(courtid, current_state, general_chat, team1_chat, team2_chat, adjudicator_chat, court_token)
            VALUES(DEFAULT, @b, @c, @d, @e, @f, '@g') RETURNING *;
            ";

            query = query.Replace("@b", "0");
            query = query.Replace("@c", court.general_chat_id.room_id.ToString());
            query = query.Replace("@d", court.team1_chat_id.room_id.ToString());
            query = query.Replace("@e", court.team2_chat_id.room_id.ToString());
            query = query.Replace("@f", court.adjudicator_chat_id.room_id.ToString());
            query = query.Replace("@g", court.court_token);

            using (NpgsqlCommand command = new NpgsqlCommand(query, db.GetDb()))
            {
                Court new_court = await db.queryForSingleObjectWithRepo(command, new CourtRowMapper());
                await participantRepository.insertOriginalHost(new_court, user);

                return new_court.court_token;
            }

        }


        public async Task<bool> userJoinCourt(User user, Court court, bool host)
        {
            try {
                await participantRepository.insertNewAudience(court, user);
                return true;
            } catch(System.Exception) {
                return false;
            }
        }

        // public async Task<bool> setCourtHost(string email) {
        //     string query = @"INSERT INTO tblparticipants(";

        //     query = query.Replace("@a", )
        // } 

    }
}