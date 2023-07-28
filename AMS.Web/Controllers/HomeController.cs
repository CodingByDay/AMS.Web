using AMS.Web.Classes;
using AMS.Web.Database;
using AMS.Web.Models;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.Office.Interop.Excel;
using MimeKit;
using Sentry;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Xml;
using System.Xml.Linq;

namespace AMS.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }


        public IActionResult LocationListing()
        {
            ViewBag.Title = "Lokacije";
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection")??"");
            var locations = db.GetAllLocations();
            return View(locations);
        }

       

        public IActionResult ItemListing()
        {
            ViewBag.Title = "Artikli";
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection")??"");
            var items = db.GetAllItems();
            // db.GetUserNames(items)       
            return View(items);
        }


        public IActionResult AssetListing()
        {
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            ViewBag.Title = "Sredstva";
            var assets = db.GetAssets();
            return View(assets);
        }







        public IActionResult Index()
        {
     
            string username = HttpContext.Session.GetString("username") ?? "";
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");

            var names = db.getExportColumnNames();
            ViewBag.Columns = names;
            // Data for the configuration //
            var configuration = db.getConfigurationNamesOnly();
            var inventories = db.getInventories();
            ViewBag.Inventories = inventories;
            ViewBag.Configuration = configuration;
            ViewBag.Company = HttpContext.Session.GetString("company");
            string type = db.getUserTypeFromString(username) ?? "";
            UserList users = new UserList();
            if (type == "LADM")
            {
                users = db.GetAllUsersSpecificCompanyWithoutItself(HttpContext.Session.GetString("company"), HttpContext.Session.GetString("username") ?? "");
            }

            ViewBag.Type = type;

            return View(users);
        }


        [HttpPost]
        public JsonResult UpdateRow([FromQuery(Name = "table")] string table, [FromQuery(Name = "field")] string field, [FromQuery( Name = "type")] string type, [FromQuery(Name = "data")] string data, [FromQuery(Name = "anQId")] string anQId)
        {
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            db.UpdateRow(table,field, type, data, anQId);
            return Json(true);
        }


        [HttpPost]
        public JsonResult DeleteInventoryAsset([FromQuery(Name = "id")] string id)
        {

            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var assets = db.GetAssets();
            db.DeleteInventoryAsset(assets.ElementAt(Int32.Parse(id)).anQId.ToString());
            return Json(true);
        }



        [HttpPost]
        public JsonResult DeleteInventoryLocation([FromQuery(Name = "id")] string id)
        {

            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection")?? "");
            var locations = db.GetAllLocations();
            db.DeleteInventoryLocation(locations.ElementAt(Int32.Parse(id)).anQId.ToString());
            return Json(true);
        }


        [HttpPost]
        public JsonResult DeleteInventoryItem([FromQuery(Name = "id")] string id)
        {

            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var items = db.GetAllItems();
            db.DeleteInventoryItem(items.ElementAt(Int32.Parse(id)).anQId.ToString());
            return Json(true);
        }



        [HttpPost]
        public JsonResult DeleteInventory([FromQuery(Name = "id")] string id) {

            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var invs = db.getInventories();
            db.DeleteInventory(invs.ElementAt(Int32.Parse(id)).qId.ToString());
            return Json(true);
        }



        [HttpPost]
        public JsonResult CreateInventory([FromQuery(Name = "name")] string name, [FromQuery(Name = "date")] string date, [FromQuery(Name = "leader")] string leader)
        {
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");

  
            DateTime.TryParse(date, out DateTime converted);

            bool created = db.CreateInventory(name, converted.ToShortDateString(), leader);
            return Json(created);
        }


        [HttpPost]
        public JsonResult getConfig([FromQuery(Name = "name")] string name)
        {
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var res = db.getSpecificConfiguration(name);
            return Json(res);
        }

        [HttpPost]
        public JsonResult ExportInventory([FromQuery(Name = "type")] string type)
        {
            string json = string.Empty;
            ExportStructure structure = new ExportStructure();
            switch(type)
            {
                case "pdf":
                    structure = GetStructureFromDatabase(0);
                    json = JsonSerializer.Serialize(structure);
                    break;
                case "excel":
                    structure = GetStructureFromDatabase(0);
                    json = JsonSerializer.Serialize(structure);
                    break;

                case "notepad":
                    structure = GetStructureFromDatabase(0);
                    json = JsonSerializer.Serialize(structure);
                    break;
            }
            return Json(json);
        }

        [HttpPost]
        public JsonResult ConfirmInventory([FromQuery(Name="id")] string id)
        {
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var checkOuts = db.GetAllCheckOutItems();
            int index = Int32.Parse(id);
            var row = checkOuts.ElementAt(index);
            db.CommitRow(row, HttpContext.Session.GetString("username") ?? "");
            return Json(true);
        }




        [HttpPost]
        public JsonResult CheckDiscrepancies([FromQuery(Name = "id")] string id)
        {
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var inventories = db.getInventories();
            int index = Int32.Parse(id);
            var row = inventories.ElementAt(index);
            if (db.CheckDiscrepancies(row.qId) != -1 && db.CheckDiscrepancies(row.qId) != 0)
            {
                return Json(true);
            }
            return Json(false);
        }



        [HttpPost]
        public JsonResult ConfirmInventoryWhole([FromQuery(Name = "id")] string id)
        {
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var inventories = db.getInventories();
            int index = Int32.Parse(id);
            var row = inventories.ElementAt(index);
            db.CommitInventory(row, HttpContext.Session.GetString("username"));
            return Json(true);
        }

        [HttpPost]
        public JsonResult DeleteInventoryPosition([FromQuery(Name = "id")] string id)
        {
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var checkOuts = db.GetAllCheckOutItems();
            int index = Int32.Parse(id);
            var row = checkOuts.ElementAt(index);
            db.DeleteRow(row);
            return Json(true);
        }





        [HttpPost]
        public JsonResult DownloadInventory([FromQuery(Name = "type")] string type, [FromQuery(Name="ids")] string ids)
        {
            string[] arrayIDS = ids.Split(",");






            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");





            string baseUrl = string.Empty;
            string uid = Guid.NewGuid().ToString();
            string name = string.Empty;
            List<string> lines = db.GetRowsForConfiguration(arrayIDS);
            if (type == "notepad")
            {
                var basePath = System.IO.Path.GetFullPath(System.IO.Path.Combine(Environment.CurrentDirectory, "wwwroot\\Export"));
                using (StreamWriter outputFile = new StreamWriter(Path.Combine(basePath, $"{uid}.txt")))
                {
                    foreach (var c in lines)
                    {
                        outputFile.WriteLine(c);
                    }
                }
                baseUrl = $"{this.Request.Scheme}://{this.Request.Host.Value}{this.Request.PathBase.Value}/Export/{uid}.txt";
                name = uid + ".txt";
            }
            else
            {
                var basePath = System.IO.Path.GetFullPath(System.IO.Path.Combine(Environment.CurrentDirectory, "wwwroot\\Export"));
                using (StreamWriter outputFile = new StreamWriter(Path.Combine(basePath, $"{uid}.txt")))
                {
                    foreach (var c in lines)
                    {
                        outputFile.WriteLine(c);
                    }
                }
                int i, j;
                Microsoft.Office.Interop.Excel.Application xlApp;
                Microsoft.Office.Interop.Excel.Workbook xlWorkBook;
                Microsoft.Office.Interop.Excel._Worksheet xlWorkSheet;
                object misValue = System.Reflection.Missing.Value;
                string[] linesI, cells;
                linesI = System.IO.File.ReadAllLines(Path.Combine(basePath, $"{uid}.txt"));
                xlApp = new Microsoft.Office.Interop.Excel.Application();
                xlApp.DisplayAlerts = false;
                xlWorkBook = xlApp.Workbooks.Add();
                xlWorkSheet = (Microsoft.Office.Interop.Excel._Worksheet)xlWorkBook.ActiveSheet;
                for (i = 0; i < linesI.Length; i++)
                {
                    cells = lines[i].Split(new Char[] { '\t', ';' });
                    for (j = 0; j < cells.Length; j++)
                        xlWorkSheet.Cells[i + 1, j + 1] = cells[j];
                }
                xlWorkBook.SaveAs(Path.Combine(basePath, $"{uid}.xlsx"), Microsoft.Office.Interop.Excel.XlFileFormat.xlWorkbookDefault, misValue, misValue, misValue, misValue, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlShared, misValue, misValue, misValue, misValue, misValue);
                xlWorkBook.Close(true, misValue, misValue);
                xlApp.Quit();
                System.IO.File.Delete(Path.Combine(basePath, $"{uid}.txt"));
                baseUrl = $"{this.Request.Scheme}://{this.Request.Host.Value}{this.Request.PathBase.Value}/Export/{uid}.xlsx";
                name = uid + ".xlsx";
            }
            return Json(new FileResponse { name = name, url = baseUrl });
        }



        public class FileResponse {
            public string url { get; set; }
            public string name { get; set; }
        }

        public IActionResult DownloadFile([FromQuery (Name = "data")] string data)
        {
            ViewBag.Data = data;
            return RedirectToAction("Export");
        }
        private ExportStructure GetStructureFromDatabase(int count)
        {
            var config = ConfigurationHelper.GetConfigurationObject();
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            return db.GetStructure(count);
        }

        [HttpPost]
        public JsonResult SendInvitationUser(string email)
        {
            var config = ConfigurationHelper.GetConfigurationObject();
            DatabaseOperations db = new DatabaseOperations(config.connectionString);
            string guid = Guid.NewGuid().ToString();
            string company = HttpContext.Session.GetString("company") ?? "";
            db.CreateUser(email, company, guid);
            SendEmailInviteUser(company, guid, email);
            return Json(true);
        }


        [HttpPost]
        public JsonResult SendInvitationAdmin(string email, string company)
        {
            var config=ConfigurationHelper.GetConfigurationObject();
            DatabaseOperations db = new DatabaseOperations(config.connectionString);
            bool exists = db.CheckIfCompanyExists(company, email);

            if (!exists)
            {
                var invite = db.CreateCompany(company);
                SendEmailInvite(company, invite, email);
                return Json(true);
            } else
            {
                return Json(false);
            }
        }



        [HttpPost]
        public JsonResult DeleteUserByEmail(string email)
        {

            // db layer initialization

            var config = ConfigurationHelper.GetConfigurationObject();
            DatabaseOperations db = new DatabaseOperations(config.connectionString);
            db.DeleteUserByEmail(email);
            // db layer initialization


            return Json(true);
        }




        private void SendEmailInvite(string company, string guid, string email) {
            // MailMessage class is present is System.Net.Mail namespace
            var config = ConfigurationHelper.GetConfigurationObject();
            MailMessage mailMessage = new MailMessage(config.email, email);
            var requestString = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";


            // StringBuilder class is present in System.Text namespace
            StringBuilder sbEmailBody = new StringBuilder();
            sbEmailBody.Append("Dear " + "user" + ",<br/><br/>");
            sbEmailBody.Append("Please click on the following link to activate your account");
            sbEmailBody.Append("<br/>"); sbEmailBody.Append($"{requestString}/auth/register?uid=" + guid + "&company=" + company + "&email=" + email);
            sbEmailBody.Append("<br/><br/>");
            sbEmailBody.Append("<b>Riko d.o.o.</b>");
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = sbEmailBody.ToString();
            mailMessage.Subject = "Start using Inventory Masters";
            SmtpClient smtpClient = new SmtpClient("smtp.office365.com", 587);

            smtpClient.Credentials = new System.Net.NetworkCredential()
            {
                UserName = config.email,
                Password = config.password
            };

            smtpClient.EnableSsl = true;
            smtpClient.Send(mailMessage);
        }


        private void SendEmailInviteUser(string company, string guid, string email)
        {
            // MailMessage class is present is System.Net.Mail namespace
            var config = ConfigurationHelper.GetConfigurationObject();
            MailMessage mailMessage = new MailMessage(config.email, email);
            var requestString = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";

            // StringBuilder class is present in System.Text namespace
            StringBuilder sbEmailBody = new StringBuilder();
            sbEmailBody.Append("Dear " + "user" + ",<br/><br/>");
            sbEmailBody.Append("Please click on the following link to activate your account");
            sbEmailBody.Append("<br/>"); sbEmailBody.Append($"{requestString}/auth/registeruser?uid=" + guid + "&user=" + email);
            sbEmailBody.Append("<br/><br/>");
            sbEmailBody.Append("<b>Riko d.o.o.</b>");
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = sbEmailBody.ToString();
            mailMessage.Subject = "Start using Inventory Masters";
            SmtpClient smtpClient = new SmtpClient("smtp.office365.com", 587);
            smtpClient.Credentials = new System.Net.NetworkCredential()
            {
                UserName = config.email,
                Password = config.password
            };
            smtpClient.EnableSsl = true;
            smtpClient.Send(mailMessage);
        }
       

        public IActionResult Settings()
        {
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }

            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            string username = HttpContext.Session.GetString("username") ?? "";
            string type = db.getUserTypeFromString(username) ?? "";
            UserList users = new UserList();



            if(type == "SADM")
            {
                users = db.GetAllUsers();
            } else if (type == "LADM")
            {
                users = db.GetAllUsersSpecificCompany(HttpContext.Session.GetString("company"));
            }

           
            ViewBag.Type = type;

            return View(users);
        }


        public IActionResult Privacy()
        {
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            return View();
        }

        public IActionResult ActiveInventory()
        {
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var checkOuts = db.GetAllCheckOutItems();
            return View(checkOuts);

        }
        public IActionResult DeviceSync()
        {
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            return View();
        }

        public IActionResult NotFinished()
        {
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }

            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var checkOuts = db.GetAllCheckOutItemsNotFinished();
            return View(checkOuts);
        }


        public IActionResult Discrepancies()
        {
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }

            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var checkOuts = db.GetAllCheckOutItemsDiscrepancies();
            return View(checkOuts);
        }
        public IActionResult Edit()
        {
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            return View();
        }
        public IActionResult Listing()
        {
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection") ?? "");
            var data = db.GetAllThreeTablesCurrentState();
            return View(data);
        }
        public IActionResult Synchronization()
        {
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            ConnectionViewModel connection = new ConnectionViewModel();
            if(TempData["ConnectionViewModel"] != null)
            {
                connection = (ConnectionViewModel)TempData["ConnectionViewModel"] ;
            }
            return View(connection);
        }




        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}