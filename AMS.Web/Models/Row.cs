namespace AMS.Web.Models
{
    public class Row
    {
        public List<List<String>> columns;
        public bool headers { get; set; }
        public Row()
        {
            columns = new List<List<String>>();
        }

        public void add(List<String> column)
        {
            columns.Add(column);
        }
        public List<String> getColumnAtIndex(int index) {



            return columns[index];
                
                
                
                
        }
    }



  
}
