namespace AMS.Web.API
{
    public class LoginRequest
    {
        public string company { get; set; }
        public string username { get; set; }

        public string password { get; set; }

        public string mode { get; set; }
    }
}
