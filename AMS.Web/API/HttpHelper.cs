using Microsoft.DotNet.Scaffolding.Shared.CodeModifier.CodeChange;
using System.Text;
using RestSharp;
using Method = RestSharp.Method;

namespace AMS.Web.API
{
    public static class HttpHelper
    {
        public static string GetMethodCall(string json, string endpoint)
        {
        
            string? result = string.Empty;
            Root settings = ConfigurationHelper.GetConfigurationObject();
            var client = new RestClient(settings.baseURL);
            var request = new RestRequest(endpoint);
            request.Method = Method.Post;
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Accept", "application/json");
            request.AddJsonBody(json);
            var response = client.Execute(request);
            var content = response.Content;
            if(content != null)
            {
                result = content;

            }
            return result; 
       
        }


        public static string PostMethodCall(string json, string endpoint)
        {

            string? result = string.Empty;
            Root settings = ConfigurationHelper.GetConfigurationObject();
            var client = new RestClient(settings.baseURL);
            var request = new RestRequest(endpoint);
            request.Method = Method.Post;
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Accept", "application/json");
            request.AddJsonBody(json);
            var response = client.Execute(request);
            var content = response.Content;
            if (content != null)
            {
                result = content;

            }
            return result;

        }
    }
}
