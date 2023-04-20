namespace AMS.Web.Models
{
    public class UserList
    {

        public List<User> users { get; set; }


        public class User
        {
            public string email { get; set; }
            public string company { get; set; }
            public string type { get; set; }
        }


        public UserList()
        {
            users = new List<User>();
        }

    }
}
