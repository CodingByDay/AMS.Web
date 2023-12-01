using AMS.Web.Classes;
using AMS.Web.Database;
using AMS.Web.Models;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

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
using System.IO.Packaging;
using System.Data;

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
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
            var locations = db.GetAllLocations();
            return View(locations);
        }

       

        public IActionResult ItemListing()
        {
            ViewBag.Title = "Artikli";
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
            var items = db.GetAllItems();
            // db.GetUserNames(items)       
            return View(items);
        }


        public IActionResult AssetListing()
        {
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
            ViewBag.Title = "Sredstva";
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;


            var currentInventory = db.GetCurrentActiveInventory();

            var assets = db.GetAssets(currentInventory);
            return View(assets);
        }



        public IActionResult Dashboard()
        {
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            return View();
        }


        public IActionResult Index()
        {
     
            string username = HttpContext.Session.GetString("username") ?? "";
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);

            var names = db.getExportColumnNames();
            ViewBag.Columns = names;
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
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
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
            db.UpdateRow(table,field, type, data, anQId);

            return Json(true);
        }


        [HttpPost]
        public JsonResult DeleteInventoryAsset([FromQuery(Name = "id")] string id)
        {

            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"],_logger);
            var currentInventory = db.GetCurrentActiveInventory();
            var assets = db.GetAssets(currentInventory);
            db.DeleteInventoryAsset(assets.ElementAt(Int32.Parse(id)).anQId.ToString());
            return Json(true);
        }



        [HttpPost]
        public JsonResult DeleteInventoryLocation([FromQuery(Name = "id")] string id)
        {

            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
            var locations = db.GetAllLocations();
            db.DeleteInventoryLocation(locations.ElementAt(Int32.Parse(id)).anQId.ToString());
            return Json(true);
        }


        [HttpPost]
        public JsonResult DeleteInventoryItem([FromQuery(Name = "id")] string id)
        {

            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
            var items = db.GetAllItems();
            db.DeleteInventoryItem(items.ElementAt(Int32.Parse(id)).anQId.ToString());
            return Json(true);
        }



        [HttpPost]
        public JsonResult DeleteInventory([FromQuery(Name = "id")] string id) {

            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
            var invs = db.getInventories();
            db.DeleteInventory(invs.ElementAt(Int32.Parse(id)).qId.ToString());
            return Json(true);
        }



        [HttpPost]
        public JsonResult CreateInventory([FromQuery(Name = "name")] string name, [FromQuery(Name = "date")] string date, [FromQuery(Name = "leader")] string leader)
        {
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);

  
            DateTime.TryParse(date, out DateTime converted);

            bool created = db.CreateInventory(name, converted.ToShortDateString(), leader);
            return Json(created);
        }


        [HttpPost]
        public JsonResult getConfig([FromQuery(Name = "name")] string name)
        {
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
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
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
            var checkOuts = db.GetAllCheckOutItems();
            int index = Int32.Parse(id);
            var row = checkOuts.ElementAt(index);
            db.CommitRow(row, HttpContext.Session.GetString("username") ?? "");
            return Json(true);
        }




        [HttpPost]
        public JsonResult CheckDiscrepancies([FromQuery(Name = "id")] string id)
        {
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
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
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
            var inventories = db.getInventories();
            int index = Int32.Parse(id);
            var row = inventories.ElementAt(index);
            db.CommitInventory(row, HttpContext.Session.GetString("username"));
            return Json(true);
        }

        [HttpPost]
        public JsonResult DeleteInventoryPosition([FromQuery(Name = "id")] string id)
        {
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
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






            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);





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
                System.IO.MemoryStream stream = new System.IO.MemoryStream();

                using (SpreadsheetDocument package = SpreadsheetDocument.Create($"{basePath}\\{uid}.xlsx", SpreadsheetDocumentType.Workbook))
                {
                    package.AddWorkbookPart();
                    package.WorkbookPart.Workbook = new DocumentFormat.OpenXml.Spreadsheet.Workbook();
                    package.WorkbookPart.AddNewPart<WorksheetPart>();
                    string[] linesI, cells;

                    //sheetData.Append(row);
                    linesI = System.IO.File.ReadAllLines(Path.Combine(basePath, $"{uid}.txt"));

                    SheetData xlSheetData = new SheetData();



                    for (i = 0; i < linesI.Length; i++)
                    {
                        DocumentFormat.OpenXml.Spreadsheet.Row xlRow = new DocumentFormat.OpenXml.Spreadsheet.Row();
                        cells = lines[i].Split(new Char[] { '\t', ';' });
                        for (j = 0; j < cells.Length; j++)
                        {

                            var xlCell = new Cell(new InlineString(new DocumentFormat.OpenXml.Spreadsheet.Text(cells[j]))) { DataType = CellValues.InlineString };

                            xlRow.Append(xlCell);
                        }

                        xlSheetData.Append(xlRow);
                    }

                    package.WorkbookPart.WorksheetParts.First().Worksheet = new DocumentFormat.OpenXml.Spreadsheet.Worksheet(xlSheetData);
                    package.WorkbookPart.WorksheetParts.First().Worksheet.Save();

                    // create the worksheet to workbook relation
                    package.WorkbookPart.Workbook.AppendChild(new DocumentFormat.OpenXml.Spreadsheet.Sheets());
                    package.WorkbookPart.Workbook.GetFirstChild<DocumentFormat.OpenXml.Spreadsheet.Sheets>().AppendChild(new Sheet()
                    {
                        Id = package.WorkbookPart.GetIdOfPart(package.WorkbookPart.WorksheetParts.First()),

                        SheetId = 1,

                        Name = "Sheet1"

                    });

                     System.IO.File.Delete(Path.Combine(basePath, $"{uid}.txt"));
                     baseUrl = $"{this.Request.Scheme}://{this.Request.Host.Value}{this.Request.PathBase.Value}/Export/{uid}.xlsx";
                     name = uid + ".xlsx";

                    package.WorkbookPart.Workbook.Save();

                }
            }
            return Json(new FileResponse { name = name, url = baseUrl });
        }

        private void testWrite(string basePath, string uid, string ids)
        {
            System.IO.MemoryStream stream = new System.IO.MemoryStream();

            using (SpreadsheetDocument package = SpreadsheetDocument.Create($"{basePath}\\mytest.xlsx", SpreadsheetDocumentType.Workbook))
            {
                package.AddWorkbookPart();
                package.WorkbookPart.Workbook = new DocumentFormat.OpenXml.Spreadsheet.Workbook();
                package.WorkbookPart.AddNewPart<WorksheetPart>();

                string[] arrayIDS = ids.Split(",");






                DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);


                List<string> lines = db.GetRowsForConfiguration(arrayIDS);




                int i, j;




                string[] linesI, cells;

                //sheetData.Append(row);
                linesI = System.IO.File.ReadAllLines(Path.Combine(basePath, $"{uid}.txt"));

                SheetData xlSheetData = new SheetData();



                for (i = 0; i < linesI.Length; i++)
                {
                    DocumentFormat.OpenXml.Spreadsheet.Row xlRow = new DocumentFormat.OpenXml.Spreadsheet.Row();
                    cells = lines[i].Split(new Char[] { '\t', ';' });
                    for (j = 0; j < cells.Length; j++)
                    {

                        var xlCell = new Cell(new InlineString(new DocumentFormat.OpenXml.Spreadsheet.Text(cells[j]))) { DataType = CellValues.InlineString };

                        xlRow.Append(xlCell);
                    }

                    xlSheetData.Append(xlRow);
                }

                     package.WorkbookPart.WorksheetParts.First().Worksheet = new DocumentFormat.OpenXml.Spreadsheet.Worksheet(xlSheetData);
                    package.WorkbookPart.WorksheetParts.First().Worksheet.Save();

                    // create the worksheet to workbook relation
                    package.WorkbookPart.Workbook.AppendChild(new DocumentFormat.OpenXml.Spreadsheet.Sheets());
                    package.WorkbookPart.Workbook.GetFirstChild<DocumentFormat.OpenXml.Spreadsheet.Sheets>().AppendChild(new Sheet()
                    {
                        Id = package.WorkbookPart.GetIdOfPart(package.WorkbookPart.WorksheetParts.First()),

                        SheetId = 1,

                        Name = "Sheet1"

                    });

                    package.WorkbookPart.Workbook.Save();

                }
            
        
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
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
            return db.GetStructure(count);
        }

        [HttpPost]
        public JsonResult SendInvitationUser(string email)
        {
            var config = ConfigurationHelper.GetConfigurationObject();
            DatabaseOperations db = new DatabaseOperations(config.connectionString,  _logger);
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
            DatabaseOperations db = new DatabaseOperations(config.connectionString, _logger);
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
            DatabaseOperations db = new DatabaseOperations(config.connectionString, _logger);
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
            sbEmailBody.Append("<br/>"); sbEmailBody.Append($"http://inventura.riko.si/auth/register?uid=" + guid + "&company=" + company + "&email=" + email);
            sbEmailBody.Append("<br/><br/>");
            sbEmailBody.Append("<b>Riko d.o.o.</b>");
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = sbEmailBody.ToString();
            mailMessage.Subject = "Start using Inventory Masters";
            SmtpClient smtpClient = new SmtpClient("192.168.112.19", 25);

            smtpClient.Credentials = new System.Net.NetworkCredential()
            {
                UserName = config.email,
            };

            smtpClient.EnableSsl = false;
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
            sbEmailBody.Append("<br/>"); sbEmailBody.Append($"http://inventura.riko.si/auth/registeruser?uid=" + guid + "&user=" + email);
            sbEmailBody.Append("<br/><br/>");
            sbEmailBody.Append("<b>Riko d.o.o.</b>");
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = sbEmailBody.ToString();
            mailMessage.Subject = "Start using Inventory Masters";
            SmtpClient smtpClient = new SmtpClient("192.168.112.19", 25);
            smtpClient.Credentials = new System.Net.NetworkCredential()
            {
                UserName = config.email,
            };
         
            smtpClient.EnableSsl = false;
            smtpClient.Send(mailMessage);
        }
       

        public IActionResult Settings()
        {
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }

            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"] ?? "", _logger);
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
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            return View();
        }

        public IActionResult ActiveInventory()
        {
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"] ?? "", _logger);
            var checkOuts = db.GetAllCheckOutItems();
            return View(checkOuts);

        }
        public IActionResult DeviceSync()
        {
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            return View();
        }

        public IActionResult NotFinished()
        {
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }

            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"] ?? "", _logger);
            var checkOuts = db.GetAllCheckOutItemsNotFinished();
            return View(checkOuts);
        }


        public IActionResult Discrepancies()
        {
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }

            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"] ?? "", _logger);
            var checkOuts = db.GetAllCheckOutItemsDiscrepancies();
            return View(checkOuts);
        }
        public IActionResult Edit()
        {
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            return View();
        }
        public IActionResult Listing()
        {
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"] ?? "", _logger);
            var data = db.GetAllThreeTablesCurrentState();
            return View(data);
        }
        public IActionResult Synchronization()
        {
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
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
            string currentUrl = HttpContext.Request.Path;

            // Pass the current URL to the view
            ViewBag.CurrentUrl = currentUrl;
            if (HttpContext.Session.GetString("username") == string.Empty || HttpContext.Session.GetString("username") == null)
            {
                return RedirectToAction("Login", "Auth");
            }
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}