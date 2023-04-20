using RestSharp;

namespace AMS.Web.Classes
{
    public class Configuration
    {
        public List<List<KeyValuePair<FirstTable, SecondTable>>>? Configurations { get; set; }

        public Configuration()
        {
            this.Configurations = new List<List<KeyValuePair<FirstTable, SecondTable>>>();
        }



    }
}
