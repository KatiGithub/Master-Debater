using System;
using System.Linq;

namespace backend.utils
{
    public class CommonUtils
    {

        private static Random random = new Random();
        public static string GenerateRandomToken()
        {
            const string chars = "abcdefghijklmnopqrstuvwxyz1234567890";
            return new string(Enumerable.Repeat(chars, 9)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}