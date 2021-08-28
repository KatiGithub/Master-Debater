
namespace backend.lib.database
{
    public interface RowMapper<T> {
        public T mapRow(Npgsql.NpgsqlDataReader dataReader);
    }
}