using AMS.Web.API;
using AMS.Web.Classes;
using AMS.Web.Database;
using AMS.Web.Interfaces;
using AMS.Web.Models;
using ExcelToCsv;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using Microsoft.VisualBasic.FileIO;
using System.Data.SqlClient;
using System.IO;
using System.Reflection;

namespace AMS.Web.Controllers
{
    public class BufferedFileUploadController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        readonly IBufferedFileUploadService _bufferedFileUploadService;
        Row dataMain;

        public BufferedFileUploadController(IBufferedFileUploadService bufferedFileUploadService, ILogger<HomeController> logger)
        {
            _bufferedFileUploadService = bufferedFileUploadService;
            _logger = logger;
        }


        public class SyncResponse
        {
            public string message { get; set; }
        }


        [HttpPost]
        public JsonResult Connection([FromBody]ConnectionViewModel connection, [FromQuery(Name = "headers")] string headers, [FromQuery(Name = "complete")] string complete)

        {
                List<bool> quotesNeeded = new List<bool>();
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
                Row row;


                if (filename.Contains("xlsx"))
                {
                    row = ReturnRowsExcel(Path.Combine(path, filename), headersResult);
                }
                else
                {
                    row = ShowTextRows(Path.Combine(path, filename), headersResult);
                }

                List<string> fileNames = new List<string>();


                if (headersResult)
                {
                    fileNames = row.columns[0];
                    // Step 1: Filter out empty elements from fileNames
                    fileNames = fileNames.Where(name => !string.IsNullOrEmpty(name)).ToList();
                }
                else
                {
                    for (int i = 0; i < connection.startObjects.Length; i++)
                    {
                        fileNames.Add($"Stolpec {i}");
                    }
                }
                // Step 2: Create a dictionary to map file names to their indices
                // Step 2: Create a dictionary to map file names to their indices
                Dictionary<string, int> fileNameToIndexMapping = fileNames
                    .Select((name, index) => new { Name = name, Index = index })
                    .ToDictionary(item => item.Name, item => item.Index);



                List<SecondTable> reorderedEndObjects = connection.endObjects
                    .OrderBy(obj => fileNameToIndexMapping.TryGetValue(obj.name, out var index) ? index : int.MaxValue)
                    .ToList();
                // Step 4: Create a list to store the indices used during sorting
                List<int> sortedIndices = connection.endObjects
                    .Select(obj => fileNameToIndexMapping.TryGetValue(obj.name, out var index) ? index : -1)
                    .ToList();
                // Step 4: Update the original objects with the reordered lists
                // Step 5: Use the sortedIndices to reorder startObjects
                connection.startObjects = sortedIndices
                    .Select(index => connection.startObjects[index])
                    .ToArray();
                connection.endObjects = reorderedEndObjects.ToArray();
            int counter = 0;
                foreach(var r in row.columns)
                {
                    List<int> finalOrder = new List<int>();
            
                    if (counter == 1 && headersResult) {
                        //for (int i = 0; i < r.Count; i++)
                        //{
                        //    fileNames.Add($"{r[i]}");
                        //}
                        continue;
                    }
                    else if (counter == 1 && !headersResult)
                    {
                        //for (int i = 0; i < r.Count; i++)
                        //{
                        //    fileNames.Add($"Stolpec {i}");
                        //}
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
                int helpCount = 0;
                foreach (string name in columns)
                {
                    var el = connection.startObjects.Where(x => x.field == name).FirstOrDefault();
                    SecondTable connector = getKeyValuePairs(connection).Where(x => x.Key == el).FirstOrDefault().Value;
                    //if (connector.name == fileNames.ElementAt(helpCount))
                    //{
                    //    finalOrder.Add(helpCount);
                    //}
                    //else
                    //{
                    //    finalOrder.Add(fileNames.IndexOf(connector.name));
                    //}

                    //helpCount += 1;
                    var table = connection.startObjects.ElementAt(0).table;

                    DatabaseOperations databaseFindtype = new DatabaseOperations(Request.Cookies["connection"], _logger);

                    quotesNeeded.Add(databaseFindtype.findType($"SELECT TOP 1 DATA_TYPE FROM tSetTables WHERE Field = '{name}' and  [Table] = '{table}'"));


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

                    if (r.Count < order.Count)
                    {
                        continue;
                    }


                    for (int i = 1; i <= order.Count; i++)
                    {
                        if (i != order.Count)
                        {
                            if (quotesNeeded.ElementAt(i - 1))
                            {

                                insert += "'" + r[order[i - 1]] + "'" + ",";

                            }
                            else
                            {

                                insert += r[order[i - 1]] + ",";

                            }
                        }
                        else
                        {
                            if (quotesNeeded.ElementAt(i - 1))
                            {

                                insert += "'" + r[order[i - 1]] + "'";

                            }
                            else
                            {

                                insert += r[order[i - 1]];


                            }

                        }
                    }
                    insert += ")";
                        query += $"INSERT INTO {connection.startObjects.ElementAt(0).table} {fieldNames} VALUES {insert}";
                        _logger.LogInformation("Insert query: " + query + DateTime.Now);
                        queries.Add(query);             
                }

                // Database call
            
                DatabaseOperations database = new DatabaseOperations(Request.Cookies["connection"], _logger);
                database.toggleFKConstraintsItems(true);
                database.toggleFKConstraintsAssets(true);
                database.insertBulk(queries);
                database.toggleFKConstraintsItems(false);
                database.toggleFKConstraintsAssets(false);
                // database.setConfiguration(getKeyValuePairs(connection), "test");
                try
                {

                    System.IO.File.SetAttributes(Path.Combine(path, filename), FileAttributes.Normal);
                    System.IO.File.Delete(Path.Combine(path, filename));
                }
                catch (Exception)
                {

                }
            return Json(new SyncResponse { message = "Success" });
        }

        private void ResolveImportAll(ConnectionViewModel connection, bool headersResult)
        {

            List<bool> quotesNeeded = new List<bool>();

            List<string> queries = new List<string>();
            var path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "Temp"));
            string filename = HttpContext.Session.GetString("filename");
            Row row;

            if(filename.Contains("xlsx"))
            {
                row = ReturnRowsExcel(Path.Combine(path, filename), headersResult);
            } else
            {
                row = ShowTextRows(Path.Combine(path, filename), headersResult);
            }

            List<string> fileNames = new List<string>();



            if (headersResult)
            {
                fileNames = row.columns[0];
                // Step 1: Filter out empty elements from fileNames
                fileNames = fileNames.Where(name => !string.IsNullOrEmpty(name)).ToList();
            } else
            {
                for(int i = 0; i < connection.startObjects.Length;i++)
                {
                    fileNames.Add($"Stolpec {i}"); 
                }
            }
            // Step 2: Create a dictionary to map file names to their indices
            // Step 2: Create a dictionary to map file names to their indices
            Dictionary<string, int> fileNameToIndexMapping = fileNames
                .Select((name, index) => new { Name = name, Index = index })
                .ToDictionary(item => item.Name, item => item.Index);

  

            List<SecondTable> reorderedEndObjects = connection.endObjects
                .OrderBy(obj => fileNameToIndexMapping.TryGetValue(obj.name, out var index) ? index : int.MaxValue)
                .ToList();
            // Step 4: Create a list to store the indices used during sorting
            List<int> sortedIndices = connection.endObjects
                .Select(obj => fileNameToIndexMapping.TryGetValue(obj.name, out var index) ? index : -1)
                .ToList();
            // Step 4: Update the original objects with the reordered lists
            // Step 5: Use the sortedIndices to reorder startObjects
            connection.startObjects = sortedIndices
                .Select(index => connection.startObjects[index])
                .ToArray();
            connection.endObjects = reorderedEndObjects.ToArray();

  



            // Step 4: Update the original startObjects with the reordered list


            //  Row row = dataMain;
            int counter = 0;
            foreach (var r in row.columns)
            {
                List<int> finalOrder = new List<int>();
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
                string correctedFieldNames = "(";
                int helpCount = 0;

                foreach (string name in columns)
                {
                    
                    var el = connection.startObjects.Where(x => x.field == name).FirstOrDefault();
                    SecondTable connector = getKeyValuePairs(connection).Where(x => x.Key == el).FirstOrDefault().Value;

                    //if(connector.name == fileNames.ElementAt(helpCount))
                    //{
                    //    finalOrder.Add(helpCount);
                    //} else
                    //{
                    //    finalOrder.Add(fileNames.IndexOf(connector.name));
                    //}

                    helpCount += 1;

                    DatabaseOperations databaseFindtype = new DatabaseOperations(Request.Cookies["connection"], _logger);
                    var table = connection.startObjects.ElementAt(0).table;

                    quotesNeeded.Add(databaseFindtype.findType($"SELECT TOP 1 DATA_TYPE FROM tSetTables WHERE Field = '{name}' and  [Table] = '{table}'"));
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
                int cCounter = 0;
                //List<string> columnsModified = new List<string>();

                //foreach (int final in finalOrder)
                //{
                //    columnsModified.Add(columns[final]);
                //    cCounter += 1;
                //}

                //fieldNames = "(";
                //for (int i = 1; i <= columnsModified.Count; i++)
                //{
                //    if (i != columnsModified.Count)
                //    {
                //        fieldNames += columnsModified.ElementAt(i - 1) + ",";
                //    }
                //    else
                //    {
                //        fieldNames += columnsModified.ElementAt(i - 1);
                //    }
                //}

                //fieldNames += ")";

                if ( r.Count < order.Count )
                {
                    continue;
                }


                for (int i = 1; i <= order.Count; i++)
                {
                    if (i != order.Count)
                    {
                        if (quotesNeeded.ElementAt(i - 1))
                        {

                                 insert += "'" + r[order[i - 1]] + "'" + ",";

                        } else
                        {

                                insert += r[order[i - 1]] + ",";

                        }
                    }
                    else
                    {
                        if (quotesNeeded.ElementAt(i - 1))
                        {

                               insert += "'" + r[order[i - 1]] + "'";

                        } else
                        {

                                insert += r[order[i - 1]];

                            
                        }

                    }
                }
                insert += ")";
                query += $"INSERT INTO {connection.startObjects.ElementAt(0).table} {fieldNames} VALUES {insert}";
                _logger.LogInformation("Insert query: " + query + DateTime.Now);
                queries.Add(query);

            }

            // Database call

            DatabaseOperations database = new DatabaseOperations(Request.Cookies["connection"], _logger);
            database.toggleFKConstraintsItems(true);
            database.toggleFKConstraintsAssets(true);
            database.insertBulk(queries);
            database.toggleFKConstraintsItems(false);
            database.toggleFKConstraintsAssets(false);

            // Working

            ResolveItems();
            ResolveLocations();
        }
        private void ResolveLocations()
        {
            DatabaseOperations database = new DatabaseOperations(Request.Cookies["connection"], _logger);
            database.CommitLocationsFromAssets();
        }

        private void ResolveItems()
        {
            DatabaseOperations database = new DatabaseOperations(Request.Cookies["connection"], _logger);
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
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
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
            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
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
                        DatabaseOperations dbLocation = new DatabaseOperations(Request.Cookies["connection"], _logger);
                        var resultLocation = dbLocation.getTableDataLocation();
                        Model = resultLocation;
                        break;
                    case "artiklov":
                        DatabaseOperations dbITem = new DatabaseOperations(Request.Cookies["connection"], _logger);
                        var resultITem = dbITem.getTableDataItem();
                        Model = resultITem;
                        break;
                    case "sredstev":
                        DatabaseOperations dbAsset = new DatabaseOperations(Request.Cookies["connection"], _logger);
                        var result = dbAsset.getTableDataAsset();
                        Model = result;
                        break;
                    case "vse":
                        DatabaseOperations dbAssetAll = new DatabaseOperations(Request.Cookies["connection"], _logger);
                        var resultAll = dbAssetAll.getTableDataAsset();
                        Model = resultAll;
                        break;
                }
            }


            DatabaseOperations db = new DatabaseOperations(Request.Cookies["connection"], _logger);
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
                            DatabaseOperations dbLocation = new DatabaseOperations(Request.Cookies["connection"], _logger);
                            var resultLocation = dbLocation.getTableDataLocation();
                            Model = resultLocation;
                            var namesLocations = dbLocation.getConfigurationNamesOnly();
                            ViewBag.Configuration = namesLocations;
                            break;
                        case "artiklov":
                            DatabaseOperations dbItem = new DatabaseOperations(Request.Cookies["connection"], _logger);
                            var resultItem = dbItem.getTableDataItem();
                            Model = resultItem;
                            var namesItems = dbItem.getConfigurationNamesOnly();
                            ViewBag.Configuration = namesItems;
                            break;
                        case "sredstev":
                            DatabaseOperations dbAsset = new DatabaseOperations(Request.Cookies["connection"], _logger);
                            var result = dbAsset.getTableDataAsset();
                            Model = result;
                            var names = dbAsset.getConfigurationNamesOnly();
                            var namesAssets = dbAsset.getConfigurationNamesOnly();
                            ViewBag.Configuration = namesAssets;
                            break;
                        case "vse":
                            DatabaseOperations dbAssetAll = new DatabaseOperations(Request.Cookies["connection"], _logger);
                            var resultAll = dbAssetAll.getTableDataAsset();
                            Model = resultAll;
                            var namesAll = dbAssetAll.getConfigurationNamesOnly();
                            ViewBag.Configuration = namesAll;
                            break;
                    }
                }



                Row? row = await _bufferedFileUploadService.UploadFile(file, headerResult);

                dataMain = row;

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

                _logger.LogError("Error: " + exception.Message + DateTime.Now);
                // Log ex
                ViewBag.Message = "File Upload Failed";
            }
            return View(Model);
        }
        public Row ReadExcel(string fileName, string fileExt, bool header)
        {
            // Excel.Cursor.Current = Cursors.WaitCursor;
            Row row = ExcelFileHelper.ReadAsRowObject(fileName, header);
            return row;
        }

        private Row ReturnRowsExcel(string path, bool headers)
        {
            Row row = new Row();
            // Read xlsx file and return items
            var data = ReadExcel(path, "xlsx", headers);
            return data;
        }
    }
}
