
using System.Collections.Generic;

namespace backend.lib.database
{
    public interface RowMapper<T> {
        public List<T> mapRow(Npgsql.NpgsqlDataReader dataReader);
    }
}