using AMS.Web.API;
using AMS.Web.Classes;
using AMS.Web.Database;
using AMS.Web.Interfaces;
using AMS.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using Microsoft.VisualBasic.FileIO;

using System.IO;
using System.Reflection;

namespace AMS.Web.Controllers
{
    public class BufferedFileUploadController : Controller
    {
        readonly IBufferedFileUploadService _bufferedFileUploadService;

        public BufferedFileUploadController(IBufferedFileUploadService bufferedFileUploadService)
        {
            _bufferedFileUploadService = bufferedFileUploadService;
        }


        public class SyncResponse
        {
            public string message { get; set; }
        }


        [HttpPost]
        public JsonResult Connection([FromBody]ConnectionViewModel connection, [FromQuery(Name = "headers")] string headers, [FromQuery(Name = "complete")] string complete)

        {
                bool headersResult = false;
                if(headers == "true")
                {
                    headersResult = true;
                }

                if(complete == "true")
                {
                    ResolveImportAll(connection, headersResult);
                    return Json(new SyncResponse { message = "Success" });
                }

                List<string> queries = new List<string>();
                if(connection.startObjects.Length!=connection.endObjects.Length)
                {
                    return Json(new SyncResponse { message = "Error data is not of same size."});
                } 
                
                var path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "Temp"));
                string filename = HttpContext.Session.GetString("filename");
                Row row = ShowTextRows(Path.Combine(path, filename), headersResult);
                int counter = 0;
                foreach(var r in row.columns)
                {

                    counter += 1;
                    if(counter == 1 && headersResult) {
                    continue;
                    }
                    string query = string.Empty;
                    List<string> columns = new List<string>();
                    string fieldNames = "("; 
                    for(int i = 1; i <= connection.startObjects.Length;i++)
                    {
                        columns.Add(connection.startObjects.ElementAt(i-1).field);
                        if (i != connection.startObjects.Length)
                        {
                            fieldNames += connection.startObjects.ElementAt(i - 1).field + ",";
                        } else
                        {
                            fieldNames += connection.startObjects.ElementAt(i - 1).field;

                        }
                    }
                        string insert = string.Empty;
                        fieldNames += ")";
                        insert += "(";
                        List<int> order = new List<int>();
                int count = 0;
                foreach (string name in columns)
                {
                    var el = connection.startObjects.Where(x => x.field == name).FirstOrDefault();
                    SecondTable connector = getKeyValuePairs(connection).Where(x => x.Key == el).FirstOrDefault().Value;

                    if (!headersResult)
                    {
                        string n = connector.name.Replace("Stolpec", string.Empty).Trim();
                        try
                        {
                            int commit = Int32.Parse(n);
                            order.Add(commit);
                        }
                        catch

                        {
                            throw new KeyNotFoundException("Error");

                        }
                    } else
                    {
                        order.Add(count);
                        count++;
                    }
                      }
                        for (int i = 1; i <= order.Count;i++)
                        {
                            if (i != order.Count)
                            {
                                insert += "'" + r[order[i-1]] + "'" + ",";
                            } else
                            {

                                insert += "'" + r[order[i-1]] + "'";

                            }
                        }
                        insert += ")";
                        query += $"INSERT INTO {connection.startObjects.ElementAt(0).table} {fieldNames} VALUES {insert}";
                        queries.Add(query);             
                }

                // Database call
            
                DatabaseOperations database = new DatabaseOperations(HttpContext.Session.GetString("connection"));
                database.toggleFKConstraintsItems(true);
                database.insertBulk(queries);
                database.toggleFKConstraintsItems(false);
                // database.setConfiguration(getKeyValuePairs(connection), "test");

                return Json(new SyncResponse { message = "Success" });
        }

        private void ResolveImportAll(ConnectionViewModel connection, bool headersResult)
        {
            List<string> queries = new List<string>();
            var path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "Temp"));
            string filename = HttpContext.Session.GetString("filename");
            Row row = ShowTextRows(Path.Combine(path, filename), headersResult);
            int counter = 0;
            foreach (var r in row.columns)
            {
                counter += 1;
                if (counter == 1 && headersResult)
                {
                    continue;
                }

                string query = string.Empty;
                List<string> columns = new List<string>();
                string fieldNames = "(";
                for (int i = 1; i <= connection.startObjects.Length; i++)
                {
                    columns.Add(connection.startObjects.ElementAt(i - 1).field);
                    if (i != connection.startObjects.Length)
                    {
                        fieldNames += connection.startObjects.ElementAt(i - 1).field + ",";
                    }
                    else
                    {
                        fieldNames += connection.startObjects.ElementAt(i - 1).field;

                    }
                }
                string insert = string.Empty;
                fieldNames += ")";
                insert += "(";
                List<int> order = new List<int>();
                int count = 0;
                foreach (string name in columns)
                {
                    var el = connection.startObjects.Where(x => x.field == name).FirstOrDefault();
                    SecondTable connector = getKeyValuePairs(connection).Where(x => x.Key == el).FirstOrDefault().Value;

                    if (!headersResult)
                    {

                        string n = connector.name.Replace("Stolpec", string.Empty).Trim();


                        try
                        {
                            int commit = Int32.Parse(n);
                            order.Add(commit);
                        }

                        catch
                        {
                            throw new KeyNotFoundException("Error");

                        }
                    }
                    else
                    {
                        order.Add(count);
                        count++;
                    }
                }
                for (int i = 1; i <= order.Count; i++)
                {
                    if (i != order.Count)
                    {
                        insert += "'" + r[order[i - 1]] + "'" + ",";
                    }
                    else
                    {

                        insert += "'" + r[order[i - 1]] + "'";

                    }
                }
                insert += ")";
                query += $"INSERT INTO {connection.startObjects.ElementAt(0).table} {fieldNames} VALUES {insert}";
                queries.Add(query);

            }


            // Database call

            DatabaseOperations database = new DatabaseOperations(HttpContext.Session.GetString("connection"));
            database.toggleFKConstraintsItems(true);
            database.insertBulk(queries);
            database.toggleFKConstraintsItems(false);

            // Working

            ResolveItems();
            ResolveLocations();


        }
        private void ResolveLocations()
        {
            DatabaseOperations database = new DatabaseOperations(HttpContext.Session.GetString("connection"));
            database.CommitLocationsFromAssets();

        }
        private void ResolveItems()
        {
            DatabaseOperations database = new DatabaseOperations(HttpContext.Session.GetString("connection"));
            database.CommitItemsFromAssets();

        }

        private int getIndexStart(FirstTable[] data, string element)
        {
            for(int i = 0; i < data.Length; i++)
            {
                if (data[i].field == element) { 
                
                return i;
                
                }
            }


            return -1;
        }


        [HttpPost]
        public JsonResult getConfig([FromQuery(Name = "name")] string name)
        {
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection"));
            var res = db.getSpecificConfiguration(name);        
            return Json(res);
        }

        public class ConfigResponse {
            public string message { get; set; }
        }

        [HttpPost]
        public JsonResult saveConfig([FromBody] ConnectionViewModel connection, [FromQuery(Name = "header")] string header, [FromQuery(Name = "name")] string name)
        {
            bool headerResult = false;
            if(header == "true") { headerResult = true; }
            var toSave = getKeyValuePairs(connection);
            var configName = name;
            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection"));
            if(db.setConfiguration(toSave, headerResult, configName, HttpContext.Session.GetString("company")))
            {
                return Json(new ConfigResponse { message = "Success" });
            } else
            {
                return Json(new ConfigResponse { message = "Error" });
            }
            // This is the method for saving the configuration.
        }



        private List<KeyValuePair<FirstTable, SecondTable>> getKeyValuePairs(ConnectionViewModel connection)
        {
            List<KeyValuePair<FirstTable, SecondTable>> pairs = new List<KeyValuePair<FirstTable, SecondTable>>();
            for(int i = 0; i < connection.startObjects.Length;i++)
            {
                pairs.Add(new KeyValuePair<FirstTable, SecondTable>(connection.startObjects.ElementAt(i), connection.endObjects.ElementAt(i)));
            }
            return pairs;
        }






        private Row ShowTextRows(string location, bool headersResult)
        {
            Row inner = new Row();

            // Open text file
            string[] rows = System.IO.File.ReadAllLines(location);
            int counter = 0;
            foreach (string row in rows)
            {
                counter++;


                if (!headersResult)
                {
                    if (counter == 1) { continue; }
                }
                string[] found = row.Split(';');
                List<string> lines = new List<string>();
                foreach (string line in found)
                {
               
                    lines.Add(line);
                    
                }
                inner.add(lines);
            }
            return inner;
        }



        public IActionResult Location()
        {

            TempData["type"] = "lokacij";
            return RedirectToAction("Index");
        }
        public IActionResult Item()
        {

            TempData["type"] = "artiklov";
            return RedirectToAction("Index");
        }
        public IActionResult Asset()
        {

            TempData["type"] = "sredstev";
            return RedirectToAction("Index");
        }

        public IActionResult TotalImport()
        {
            TempData["type"] = "vse";
            return RedirectToAction("Index");
        }


        public IActionResult Index()
        {
            List<SetTables>? Model = new List<SetTables>();
            if (TempData["type"]!=null)
            {
                ViewBag.Type = TempData["type"];
                string type = (string)TempData["type"];
                HttpContext.Session.SetString("type", type);
                switch (type)
                {
                    case "lokacij":
                        DatabaseOperations dbLocation = new DatabaseOperations(HttpContext.Session.GetString("connection"));
                        var resultLocation = dbLocation.getTableDataLocation();
                        Model = resultLocation;
                        break;
                    case "artiklov":
                        DatabaseOperations dbITem = new DatabaseOperations(HttpContext.Session.GetString("connection"));
                        var resultITem = dbITem.getTableDataItem();
                        Model = resultITem;
                        break;
                    case "sredstev":
                        DatabaseOperations dbAsset = new DatabaseOperations(HttpContext.Session.GetString("connection"));
                        var result = dbAsset.getTableDataAsset();
                        Model = result;
                        break;
                    case "vse":
                        DatabaseOperations dbAssetAll = new DatabaseOperations(HttpContext.Session.GetString("connection"));
                        var resultAll = dbAssetAll.getTableDataAsset();
                        Model = resultAll;
                        break;
                }
            }


            DatabaseOperations db = new DatabaseOperations(HttpContext.Session.GetString("connection"));
            // List<string> returnObjects = db.getConfiguration();
            var configuration = db.getConfigurationNamesOnly();
            ViewBag.Configuration = configuration;
            ViewBag.Company = HttpContext.Session.GetString("company");
            return View(Model);
        }

        [HttpPost]
        public async Task<ActionResult> Index(IFormFile file, string header)
        {
            bool headerResult = false;
            if (header == "true")
            {
                headerResult = true;
            }
            List<SetTables>? Model = new List<SetTables>();

            try
            {
                // Session information
                if (HttpContext.Session.GetString("type") != null)
                {
                    ViewBag.Type = HttpContext.Session.GetString("type");
                    switch (HttpContext.Session.GetString("type"))
                    {
                        case "lokacij":
                            DatabaseOperations dbLocation = new DatabaseOperations(HttpContext.Session.GetString("connection"));
                            var resultLocation = dbLocation.getTableDataLocation();
                            Model = resultLocation;
                            var namesLocations = dbLocation.getConfigurationNamesOnly();
                            ViewBag.Configuration = namesLocations;
                            break;
                        case "artiklov":
                            DatabaseOperations dbItem = new DatabaseOperations(HttpContext.Session.GetString("connection"));
                            var resultItem = dbItem.getTableDataItem();
                            Model = resultItem;
                            var namesItems = dbItem.getConfigurationNamesOnly();
                            ViewBag.Configuration = namesItems;
                            break;
                        case "sredstev":
                            DatabaseOperations dbAsset = new DatabaseOperations(HttpContext.Session.GetString("connection"));
                            var result = dbAsset.getTableDataAsset();
                            Model = result;
                            var names = dbAsset.getConfigurationNamesOnly();
                            var namesAssets = dbAsset.getConfigurationNamesOnly();
                            ViewBag.Configuration = namesAssets;
                            break;
                        case "vse":
                            DatabaseOperations dbAssetAll = new DatabaseOperations(HttpContext.Session.GetString("connection"));
                            var resultAll = dbAssetAll.getTableDataAsset();
                            Model = resultAll;
                            var namesAll = dbAssetAll.getConfigurationNamesOnly();
                            ViewBag.Configuration = namesAll;
                            break;
                    }
                }



                Row? row = await _bufferedFileUploadService.UploadFile(file, headerResult);
                if (headerResult)
                {
                    List<String> headers = row.getColumnAtIndex(0);
                    ViewBag.Headers = headers;
                    row.headers = true;
                   
                }



                string fileType = file.FileName;
                string extension = fileType.Split(".")[1];

                if(extension.ToLower() == "txt")
                {
                    ViewBag.TXT = true;
                } else
                {
                    @ViewBag.TXT = false;
                }



                try
                {
                    var path = System.IO.Path.GetFullPath(System.IO.Path.Combine(Environment.CurrentDirectory, "Temp"));
                    var pReal = System.IO.Path.Combine(path, file.FileName);
                    System.IO.File.SetAttributes(pReal, FileAttributes.Normal);
                    System.IO.File.Delete(pReal);
                } catch (Exception)
                {

                }


                HttpContext.Session.SetString("filename", file.FileName);
                if (row != null)
                {
                    int max = 0;
                    foreach(var one in row.columns)
                    {
                        if(one.Count > max)
                        {
                            max = one.Count;
                        }
                    }
                    ViewBag.Max = max;
                    ViewBag.Message = "File Upload Successful";
                    ViewBag.Row = row;
                }
                else
                {
                    ViewBag.Message = "File Upload Failed";
                }
            }
            catch (Exception exception)
            {


                // Log ex
                ViewBag.Message = "File Upload Failed";
            }
            return View(Model);
        }
    }
}
