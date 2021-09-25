using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;

namespace backend.utils
{
    public class Firebase
    {
        private static FirebaseApp _firebase = FirebaseApp.Create(new AppOptions()
        {
            Credential = GoogleCredential.FromFile(System.AppDomain.CurrentDomain.BaseDirectory + "credentials.json")
        });
        private static bool alreadyinit = false;

        public static FirebaseApp firebase
        {
            get
            {
                return _firebase;
            }
        }

        private static void initFirebase()
        {
            if (!alreadyinit)
            {
                _firebase = FirebaseApp.Create(new AppOptions()
                {
                    Credential = GoogleCredential.FromFile(System.AppDomain.CurrentDomain.BaseDirectory + "credentials.json")
                });
            }
            else { }
        }

        public static FirebaseAuth GetFirebaseAuth()
        {
            return FirebaseAuth.GetAuth(Firebase._firebase);
        }
    }
}