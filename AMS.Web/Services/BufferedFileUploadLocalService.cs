using AMS.Web.Interfaces;
using AMS.Web.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis;

using System.Data.OleDb;
using NuGet.Protocol;
using System.Runtime.InteropServices;
using System.Threading;


//Microsoft Excel 16 object in references-> COM tab

using ExcelToCsv;

namespace AMS.Web.Services
{
    public class BufferedFileUploadLocalService : IBufferedFileUploadService
    {
        public List<string> GetHeader(string location)
        {
            // Open text file
            string[] rows = System.IO.File.ReadAllLines(location);
            String row = rows[0];
            string[] found = row.Split(';');
            List<string> lines = new List<string>();
            foreach (string line in found)
            {
                lines.Add(line);
            }
            return lines;
        }



        public async Task<Row> UploadFile(IFormFile file, bool headers)
        {
            string path = "";
            Row items = new Row();
            try
            {
                if (file.Length > 0)
                {
                    path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "Temp"));
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    using (var fileStream = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                    string fileType = file.FileName;
                    string extension = fileType.Split(".")[1];
         
                    switch(extension.ToLower())
                    {
                        case "txt":
                            items = ShowTextRows(Path.Combine(path, file.FileName), headers);
                            return items;
                        case "xlsx":
                            items = ReturnRowsExcel(Path.Combine(path, file.FileName), headers);
                            return items;
                    }              
                    return items;
                }
                else
                {                     
                    return null;
                }
            }
            catch (Exception)
            {
                throw new KeyNotFoundException("Error service");
            }
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

        public Row ShowTextRows(string location, bool header)
        {
            Row inner = new Row();
            // Open text file
            string[] rows = System.IO.File.ReadAllLines(location);

            foreach (string row in rows)
            {
               
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
    }
}
