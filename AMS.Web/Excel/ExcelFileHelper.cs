using AMS.Web.Models;
using ExcelDataReader;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ExcelToCsv
{
    public class ExcelFileHelper
    {
        public static Row ReadAsRowObject(string excelFilePath, bool header)
        {

            using (var stream = new FileStream(excelFilePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            {
                IExcelDataReader reader = null;
                if (excelFilePath.EndsWith(".xls"))
                {
                    reader = ExcelReaderFactory.CreateBinaryReader(stream);
                }
                else if (excelFilePath.EndsWith(".xlsx"))
                {
                    reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                }

                if (reader == null)
                    return new Row();

                var ds = reader.AsDataSet(new ExcelDataSetConfiguration()
                {
                    ConfigureDataTable = (tableReader) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = false
                    }
                });

                var csvContent = string.Empty;
                int row_no = 0;
                while (row_no < ds.Tables[0].Rows.Count)
                {
                    var arr = new List<string>();
                    for (int i = 0; i < ds.Tables[0].Columns.Count; i++)
                    {
                        arr.Add(ds.Tables[0].Rows[row_no][i].ToString());
                    }
                    row_no++;
                    csvContent += string.Join(";", arr) + "\n";
                }
               

                var lines = csvContent.Split('\n');
                Row row = TransformObject(lines, header);

                return row;
            }
        }

        private static Row TransformObject(string[] data, bool header)
        {
            Row inner = new Row();
            foreach (string row in data)
            {
                if (header)
                {
                    inner.headers = true;
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
    }
}