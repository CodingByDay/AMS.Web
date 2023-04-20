using AMS.Web.Classes;

namespace AMS.Web.Models
{
    public class CompleteConnectionConfiguration
    {
        public string company { get; set; }
        public bool hasHeaders { get; set; }
        public List<KeyValuePair<FirstTable, SecondTable>> baseData { get; set; }

        public CompleteConnectionConfiguration(List<KeyValuePair<FirstTable, SecondTable>> baseData, bool hasHeaders, string company)
        {
            this.baseData = baseData;
            this.hasHeaders = hasHeaders;
            this.company = company;
        }
    }
}
