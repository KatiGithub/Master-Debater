using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Npgsql;

namespace backend.lib.database
{
    public class database
    {
        private Dictionary<string, string> conn_params = new Dictionary<string, string>();
        private string conn_string;

        public database()
        {
            conn_params.Add("host", "127.0.0.1");
            conn_params.Add("username", "postgres");
            conn_params.Add("password", "music_2001");
            conn_params.Add("port", "5555");
            conn_params.Add("database", "MasterDebater");

            this.conn_string = "Host=" + this.conn_params["host"] +
                ";Username=" + this.conn_params["username"] +
                ";Password=" + this.conn_params["password"] +
                ";Port=" + this.conn_params["port"] +
                ";Database=" + this.conn_params["database"] + ";";

            NpgsqlConnection.GlobalTypeMapper.UseJsonNet();
        }

        public NpgsqlConnection GetDb()
        {
            NpgsqlConnection conn = new NpgsqlConnection(this.conn_string);
            conn.Open();
            return conn;
        }

        public string GetConnString()
        {
            return this.conn_string;
        }

        public async Task<T> queryForSingleObjectWithRepo<T>(NpgsqlCommand cmd, RowMapper<T> rowMapper)
        {
            using (NpgsqlDataReader dataReader = await cmd.ExecuteReaderAsync(System.Data.CommandBehavior.SingleResult))
            {
                List<T> queryresult = rowMapper.mapRow(dataReader);
                try
                {
                    T singleObject = queryresult[0];

                    return singleObject;
                }
                catch (ArgumentOutOfRangeException)
                {
                    return default(T);
                }
            }
        }

        public async Task<List<T>> queryForMultipleObject<T>(NpgsqlCommand cmd, RowMapper<T> rowMapper)
        {
            using (NpgsqlDataReader dataReader = await cmd.ExecuteReaderAsync(System.Data.CommandBehavior.Default))
            {
                List<T> queryResult = rowMapper.mapRow(dataReader);

                return queryResult;
            }
        }

        public async Task<object> queryForSingleObject(NpgsqlCommand command, Type t, string columnname)
        {
            using (NpgsqlDataReader dataReader = await command.ExecuteReaderAsync(System.Data.CommandBehavior.SingleResult))
            {
                var queryResult = Activator.CreateInstance(t);


                dataReader.Read();
                queryResult = dataReader.GetValue(dataReader.GetOrdinal(columnname));

                return queryResult;
            }
        }

        public async Task execute(NpgsqlCommand command) {
            await command.ExecuteNonQueryAsync();
        }
    }
}