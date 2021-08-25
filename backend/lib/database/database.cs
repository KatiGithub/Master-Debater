using System.Collections.Generic;
using Npgsql;

namespace backend.lib.database
{
    public class database {
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
                ";Database=" + this.conn_params["database"] +";";
        }

        public NpgsqlConnection GetDb() {
            return new NpgsqlConnection(this.conn_string);
        }
    }
}