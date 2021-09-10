namespace backend.Models
{
    public class ChatroomMember {
        public ChatroomMember() {}

        private User _user = new User();
        private Chats _chat = new Chats();
        private string _connectionid;

        public User user {get => _user; set => _user = value;}
        public Chats chat {get => _chat; set => _chat = value;}
        public string connectionid {get => _connectionid; set => _connectionid = value;}
    }
}