using Microsoft.AspNetCore.Mvc;

namespace AMS.Web.Controllers
{
    public class ErrorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        public IActionResult Resolve([FromQuery(Name = "error")] string error)
        {
            ViewBag.Error = error;

            return View();
        }
    }
}
