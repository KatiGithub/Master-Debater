using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Npgsql;
using backend.lib.database;
using backend.RowMappers;

namespace backend.Repositories
{
    public class SpeakerRepository {
        public SpeakerRepository() {}

        private database db = new database();

        // public async Task<List<Participants>> getSpeakers() {
        //     await
        // } 

        public Speakers getSpeakersByUserid(int userid) {
            return null;
        }
    }
}