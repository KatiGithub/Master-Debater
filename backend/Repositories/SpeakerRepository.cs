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
        
        public const Poi dummyPoi = new Poi {
            private readonly static poi_time = "3 minutes",
            acceptance = true
        };

        private const Speakers dummyspeaker = new Speakers {
            speaking_time = "3 minutes",
            position_name = "deputy of opp",
            position_order = "third speaker",
            start_speaking_time = "3023",
            end_speaking_time = "32542",
            score = 32,
            pois = this.dummyPoi
        }
        

        public Speakers getSpeakersByCourt(int courtid) {
            return dummyspeaker;
        }
    }
}