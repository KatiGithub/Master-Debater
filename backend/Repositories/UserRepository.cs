using backend.lib.database;

namespace backend.Repositories
{
    public class UserRepository {
        private static Npgsql.NpgsqlConnection db = new database().GetDb();

        
    }    
}