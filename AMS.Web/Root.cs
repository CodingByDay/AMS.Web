using Newtonsoft.Json;

namespace AMS.Web
{
    public class Logging
    {
        public LogLevel LogLevel { get; set; }
    }

    public class LogLevel
    {
        public string Default { get; set; }

        [JsonProperty("Microsoft.AspNetCore")]
        public string MicrosoftAspNetCore { get; set; }
    }

    public class Root
    {
        public string email { get; set; }
        public string password { get; set; }
        public string baseURL { get; set; }
        public string connectionString { get; set; }
        public Logging Logging { get; set; }
        public string AllowedHosts { get; set; }
    }



}
