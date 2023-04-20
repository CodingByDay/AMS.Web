using AMS.Web.Models;

namespace AMS.Web.Interfaces
{
    public interface IBufferedFileUploadService
    {
        List<string> GetHeader(string location);
        Task<Row> UploadFile(IFormFile file, bool headerResult);
    }
}
