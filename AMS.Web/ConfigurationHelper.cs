using AMS.Web.API;
using Microsoft.DotNet.MSIdentity.Shared;
using Newtonsoft.Json;
using System.Text.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace AMS.Web
{
    public static class ConfigurationHelper
    {

        public static void UpdateAppSetting(string key, string value)
        {
            var configJson = File.ReadAllText("appsettings.json");
            var config = JsonSerializer.Deserialize<Dictionary<string, object>>(configJson);
            config[key] = value;
            var updatedConfigJson = JsonSerializer.Serialize(config, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText("appsettings.json", updatedConfigJson);
        }


        public static Root GetConfigurationObject()
        {
            Root configuration = new Root();
            var configJson = File.ReadAllText("appsettings.json");
            configuration = JsonConvert.DeserializeObject<Root>(configJson);           
            return configuration;
        }
    }
}
