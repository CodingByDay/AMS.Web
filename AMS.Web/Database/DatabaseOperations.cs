using AMS.Web.Classes;
using AMS.Web.Controllers;
using AMS.Web.Models;
using DocumentFormat.OpenXml.Office2010.Excel;
using Org.BouncyCastle.Utilities;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text.Json;

namespace AMS.Web.Database
{
    public class DatabaseOperations
    {
        private String connectionString;
        private SqlTransaction objTrans;
        private Root config;

        private readonly ILogger<HomeController> _logger;
        public DatabaseOperations(string connection, ILogger<HomeController> logger)
        {
            connectionString = connection;
            config = ConfigurationHelper.GetConfigurationObject();
            _logger = logger;

            // call the api to ask
        }

        public string? getUserTypeFromString(string userType)
        {
            String userTypeInner = string.Empty;
            SqlCommand command = new SqlCommand();
            //var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection objConn = new SqlConnection(config.connectionString)) 
            {
                try
                {
                    objConn.Open();
                    command = new SqlCommand($"SELECT UserType FROM Accounts WHERE UserName = '{userType}'", objConn);
                    string? type = (string)command.ExecuteScalar();
                    return type ?? string.Empty;
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message); 
                }
                finally
                {
                    objConn.Close();
                }
            }
        }

        public void toggleFKConstraintsItems(bool disable)
        {
            SqlCommand current = new SqlCommand();
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                try
                {
                    objConn.Open();
                    if (disable)
                    {
                        current = new SqlCommand("EXEC sp_msforeachtable \"ALTER TABLE tItem NOCHECK CONSTRAINT all\"", objConn);
                    }
                    else
                    {
                        current = new SqlCommand("EXEC sp_msforeachtable \"ALTER TABLE tItem WITH CHECK CHECK CONSTRAINT all\"", objConn);
                    }
                    current.ExecuteNonQuery();
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    return;
                }
                finally
                {
                    objConn.Close();
                }
            }
        }

        public void toggleFKConstraintsAssets(bool disable)
        {
            SqlCommand current = new SqlCommand();
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                try
                {
                    objConn.Open();
                    if (disable)
                    {
                        current = new SqlCommand("EXEC sp_msforeachtable \"ALTER TABLE tAsset NOCHECK CONSTRAINT all\"", objConn);
                    }
                    else
                    {
                        current = new SqlCommand("EXEC sp_msforeachtable \"ALTER TABLE tAsset WITH CHECK CHECK CONSTRAINT all\"", objConn);
                    }
                    current.ExecuteNonQuery();
                }
                catch (Exception ex) {

                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    
                    return;
                
                
                }
                finally { objConn.Close(); }
            }
        }

        public void insertBulk(List<string> statements)
        {
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                objConn.Open();

                foreach (string statement in statements)
                {
                    try
                    {
                        SqlCommand current = new SqlCommand(statement, objConn);
                        current.ExecuteNonQuery();
                    } catch (Exception err)
                    {
                        _logger.LogError("Error: " + err.Message + DateTime.Now);
                        try
                        {
                            if (err.Message.Contains("Violation of PRIMARY KEY constraint 'PK_Asset'."))
                            {
                                var valueSplit = statement.Split("VALUES");
                                var commaSplit = valueSplit[1].Split(",");
                                var name = commaSplit[1].Replace("'", string.Empty).Replace("'", string.Empty);

                                if (commaSplit[0] == "(''" || commaSplit[0] == " (''")
                                {
                                    string leftName = string.Empty;
                                    if (name.Length < 32)
                                    {
                                        leftName = name.Substring(0, name.Length);
                                    }
                                    else
                                    {
                                        leftName = name.Substring(0, 32);
                                    }
                                    commaSplit[0] = $"('{leftName}'";
                                    valueSplit[1] = string.Join(",", commaSplit);
                                    var commandString = string.Join("VALUES", valueSplit);
                                    try
                                    {
                                        SqlCommand current = new SqlCommand(commandString, objConn);
                                        current.ExecuteNonQuery();
                                    } catch
                                    {
                                        continue;
                                    }
                                }
                            }
                        } catch (Exception ex)
                        {
                            _logger.LogError("Error: " + ex.Message + DateTime.Now);
                            continue;
                        }                 
                    }
                 }           
                    objConn.Close();                
            }
        }

        public List<SetTables> getTableDataLocation()
        {
            List<SetTables> returnObject = new List<SetTables>();
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                objConn.Open();

                try
                {
                    SqlCommand command = new SqlCommand("SELECT * FROM tSetTables WHERE [Table] = 'tLocation';", objConn);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        // Call Read before accessing data.
                        while (reader.Read())
                        {
                            string? table = string.Empty;
                            string? field = string.Empty;
                            string? name = string.Empty;
                            string? customName = string.Empty;
                            string? description = string.Empty;

                            if (!reader.IsDBNull(0))
                            {
                                table = reader.GetString(0) ?? "";
                            }

                            if (!reader.IsDBNull(1))
                            {
                                field = reader.GetString(1) ?? "";
                            }

                            if (!reader.IsDBNull(8))
                            {
                                name = reader.GetString(8) ?? "";
                            }

                            if (!reader.IsDBNull(9))
                            {
                                customName = reader.GetString(9) ?? "";
                            }
                            if (!reader.IsDBNull(10))
                            {
                                description = reader.GetString(10) ?? "";
                            }

                            SetTables row = new SetTables
                            {
                                Table = table,
                                Field = field,
                                Name = name,
                                CustomName = customName,
                                Description = description,
                            };
                            returnObject.Add(row);
                        }
                    }
                    return returnObject;
                }
                catch (Exception ex) { 
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message); 
                
                }
                finally
                {
                    objConn.Close();
                }
            }
        }

        public List<SetTables> getTableDataItem()
        {
            List<SetTables> returnObject = new List<SetTables>();
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                objConn.Open();

                try
                {
                    SqlCommand command = new SqlCommand("SELECT * FROM tSetTables WHERE [Table] = 'tItem';", objConn);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        // Call Read before accessing data.
                        while (reader.Read())
                        {
                            string? table = string.Empty;
                            string? field = string.Empty;
                            string? name = string.Empty;
                            string? customName = string.Empty;
                            string? description = string.Empty;

                            if (!reader.IsDBNull(0))
                            {
                                table = reader.GetString(0) ?? "";
                            }

                            if (!reader.IsDBNull(1))
                            {
                                field = reader.GetString(1) ?? "";
                            }

                            if (!reader.IsDBNull(8))
                            {
                                name = reader.GetString(8) ?? "";
                            }

                            if (!reader.IsDBNull(9))
                            {
                                customName = reader.GetString(9) ?? "";
                            }
                            if (!reader.IsDBNull(10))
                            {
                                description = reader.GetString(10) ?? "";
                            }

                            SetTables row = new SetTables
                            {
                                Table = table,
                                Field = field,
                                Name = name,
                                CustomName = customName,
                                Description = description
                            };
                            returnObject.Add(row);
                        }
                    }
                    return returnObject;
                }
                catch (Exception ex) {

                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                
                
                }
                finally
                {
                    objConn.Close();
                }
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        public Configuration getConfigurationNames()
        {
            Configuration configuration = new Configuration();
            // update tSettings set value = data where name = 'configurations'
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                SqlCommand sql = new SqlCommand($"SELECT value FROM tSettings", conn);
                using (SqlDataReader reader = sql.ExecuteReader())
                {
                    // Call Read before accessing data.
                    while (reader.Read())
                    {
                        if (!reader.IsDBNull(0))
                        {
                            configuration.Configurations.Add(JsonSerializer.Deserialize<List<KeyValuePair<FirstTable, SecondTable>>>((string)reader[0]));
                        }
                    }
                }
                sql.ExecuteNonQuery();
            }
            return configuration;
        }

        public List<string> getConfigurationNamesOnly()
        {
            List<string> configurations = new List<string>();
            // update tSettings set value = data where name = 'configurations'
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                SqlCommand sql = new SqlCommand($"SELECT name FROM tSettings", conn);
                using (SqlDataReader reader = sql.ExecuteReader())
                {
                    // Call Read before accessing data.
                    while (reader.Read())
                    {
                        if (!reader.IsDBNull(0))
                        {
                            configurations.Add((string)reader[0]);
                        }
                    }
                }
                sql.ExecuteNonQuery();
            }
            return configurations;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="data"></param>
        public bool setConfiguration(List<KeyValuePair<FirstTable, SecondTable>> data, bool hasHeaders, string name, string company)
        {
            string companyName = company;
            // System.Web.HttpContext.Session.GetString("Company");
            CompleteConnectionConfiguration configuration = new CompleteConnectionConfiguration(data, hasHeaders, company);
            var json = JsonSerializer.Serialize(configuration);
            // update tSettings set value = data where name = 'configurations'
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                try
                {
                    conn.Open();
                    SqlCommand sql = new SqlCommand($"INSERT INTO tSettings(name, value, company) VALUES ('{name}', '{json}', '{companyName}')", conn);
                    sql.ExecuteNonQuery();
                    return true;
                }

                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }
        }

        public string getSpecificConfiguration(string name)
        {
            // update tSettings set value = data where name = 'configurations'
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                try
                {
                    conn.Open();
                    SqlCommand sql = new SqlCommand($"SELECT value FROM tSettings WHERE name = '{name}'", conn);
                    string json = sql.ExecuteScalar().ToString();
                    return json;
                }
                catch (Exception err)
                {
                    _logger.LogError("Error: " + err.Message + DateTime.Now);
                    throw new KeyNotFoundException("Database error");
                }
            }
        }

        public List<SetTables> getTableDataAsset()
        {
            List<SetTables> returnObject = new List<SetTables>();
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                objConn.Open();

                try
                {
                    SqlCommand command = new SqlCommand("SELECT * FROM tSetTables WHERE [Table] = 'tAsset';", objConn);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        // Call Read before accessing data.
                        while (reader.Read())
                        {
                            string? table = string.Empty;
                            string? field = string.Empty;
                            string? name = string.Empty;
                            string? customName = string.Empty;
                            string? description = string.Empty;

                            if (!reader.IsDBNull(0))
                            {
                                table = reader.GetString(0) ?? "";
                            }

                            if (!reader.IsDBNull(1))
                            {
                                field = reader.GetString(1) ?? "";
                            }

                            if (!reader.IsDBNull(8))
                            {
                                name = reader.GetString(8) ?? "";
                            }

                            if (!reader.IsDBNull(9))
                            {
                                customName = reader.GetString(9) ?? "";
                            }
                            if (!reader.IsDBNull(10))
                            {
                                description = reader.GetString(10) ?? "";
                            }

                            SetTables row = new SetTables
                            {
                                Table = table,
                                Field = field,
                                Name = name,
                                CustomName = customName,
                                Description = description,
                            };
                            returnObject.Add(row);
                        }
                    }
                    return returnObject;
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message); 
                }
                finally
                {
                    objConn.Close();
                }
            }
        }

        public string CreateCompany(string companyName)
        {
            //           var config = ConfigurationHelper.GetConfigurationObject();
            String invite = string.Empty;
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "INSERT INTO Companies(Company, DBConnectionString) VALUES(@Company, @Connection)";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Company", companyName);
                        cmd.Parameters.AddWithValue("@Connection", "empty");
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                }
            }

            string guid = Guid.NewGuid().ToString();
            UpdateInviteLink(companyName, guid);
            return guid;
        }

        private void UpdateInviteLink(string company, string guid)
        {
            //  var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "UPDATE Companies SET InviteGuid = @Guid WHERE Company = @Company";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Guid", guid);
                        cmd.Parameters.AddWithValue("@Company", company);

                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }
        }

        internal bool checkGuidInviteUser(string uid, string user)
        {
            // var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "SELECT Password FROM Accounts WHERE UserName = @Username";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Username", user);
                        var guid = (String)cmd.ExecuteScalar();

                        if (guid == uid)
                        {
                            return true;
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException("Database error");
                }
            }
            return false;
        }

        internal bool checkGuidInvite(string uid, string company)
        {
            //  var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "SELECT InviteGuid FROM Companies WHERE Company = @Company";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Company", company);
                        var guid = (String)cmd.ExecuteScalar();
                        if (guid != uid)
                        {
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }
        }

        internal void RegisterUserWithData(string username, string password, string company)
        {
            //  var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "INSERT INTO Accounts (Company, UserName, Password, UserType) values (@Company, @Username, @Password, 'LADM')";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Company", company);
                        cmd.Parameters.AddWithValue("@UserName", username);
                        cmd.Parameters.AddWithValue("@Password", password);

                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }
        }

        internal string getCompanyForUserName(string username)
        {
            string result = string.Empty;

            // var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "SELECT Company FROM Accounts WHERE UserName = @Email;";

                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Email", username);

                        string company = (string)cmd.ExecuteScalar();

                        result = company;
                    }

                    return result;
                }
                catch (Exception ex) { throw new KeyNotFoundException(ex.Message); }
            }
        }

        internal void insertLogGUID(string username, string guid)
        {
            string result = string.Empty;

            // var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "  update Accounts set LoginGUID = 'test' where UserName = @Username";

                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Username", username);

                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }
        }

        internal void CreateUser(string email, string company, string guid)
        {
            string result = string.Empty;

            // var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "INSERT INTO Accounts (Company, UserName, Password, UserType) Values (@Company, @Username, @Password, @Usertype);";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Company", company);
                        cmd.Parameters.AddWithValue("@Username", email);
                        cmd.Parameters.AddWithValue("@Password", guid);
                        cmd.Parameters.AddWithValue("@Usertype", "USER");
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex) { throw new KeyNotFoundException(ex.Message); }
            }
        }

        internal void UpdateUserPassword(string email, string password)
        {
            string result = string.Empty;

            //   var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "UPDATE Accounts SET Password = @Password WHERE UserName = @Username";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Password", password);
                        cmd.Parameters.AddWithValue("@Username", email);

                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }
        }

        internal UserList GetAllUsers()
        {
            UserList users = new UserList();

            string result = string.Empty;

            //  var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "SELECT UserName, Company, UserType FROM Accounts;";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            // Call Read before accessing data.
                            while (reader.Read())
                            {
                                string email = string.Empty;
                                string company = string.Empty;
                                string type = string.Empty;

                                if (!reader.IsDBNull(0))
                                {
                                    email = reader.GetString(0) ?? "";
                                }
                                if (!reader.IsDBNull(1))
                                {
                                    company = reader.GetString(1) ?? "";
                                }
                                if (!reader.IsDBNull(2))
                                {
                                    type = reader.GetString(2) ?? "";
                                }
                                if (type != "SADM")
                                {
                                    users.users.Add(new UserList.User { company = company, type = type, email = email });
                                }
                            }
                        }
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }

            return users;
        }

        internal UserList GetAllUsersSpecificCompany(string? companyParam)
        {
            UserList users = new UserList();

            string result = string.Empty;

            //  var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "SELECT UserName, Company, UserType FROM Accounts WHERE Company = @Company;";

                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Company", companyParam);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            // Call Read before accessing data.
                            while (reader.Read())
                            {
                                string email = string.Empty;
                                string company = string.Empty;
                                string type = string.Empty;

                                if (!reader.IsDBNull(0))
                                {
                                    email = reader.GetString(0) ?? "";
                                }
                                if (!reader.IsDBNull(1))
                                {
                                    company = reader.GetString(1) ?? "";
                                }
                                if (!reader.IsDBNull(2))
                                {
                                    type = reader.GetString(2) ?? "";
                                }
                                if (type != "LADM")
                                {
                                    users.users.Add(new UserList.User { company = company, type = type, email = email });
                                }
                            }
                        }
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }

            return users;
        }

        public UserList GetAllUsersSpecificCompanyWithoutItself(string? companyParam, string self)
        {
            UserList users = new UserList();

            string result = string.Empty;

            // var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "SELECT UserName, Company, UserType FROM Accounts WHERE Company = @Company;";

                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Company", companyParam);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            // Call Read before accessing data.
                            while (reader.Read())
                            {
                                string email = string.Empty;
                                string company = string.Empty;
                                string type = string.Empty;

                                if (!reader.IsDBNull(0))
                                {
                                    email = reader.GetString(0) ?? "";
                                }
                                if (!reader.IsDBNull(1))
                                {
                                    company = reader.GetString(1) ?? "";
                                }
                                if (!reader.IsDBNull(2))
                                {
                                    type = reader.GetString(2) ?? "";
                                }
                                if (type != "LADM")
                                {
                                    users.users.Add(new UserList.User { company = company, type = type, email = email });
                                }
                            }
                        }
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }

            users.users.Remove(users.users.Where(x => x.email == self).FirstOrDefault());

            return users;
        }

        internal void DeleteUserByEmail(string email)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = $"DELETE FROM Accounts WHERE UserName = '{email}';";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }
        }

        internal void CommitItemsFromAssets()
        {
            List<Item> items = new List<Item>();
            //  var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "SELECT acItem, acName, Count(*) AS Repeaters from tAsset GROUP BY acItem, acName HAVING  COUNT(*) > 0; ";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            // Call Read before accessing data.
                            while (reader.Read())
                            {
                                string item = string.Empty;
                                string name = string.Empty;
                                string qty = string.Empty;
                                if (!reader.IsDBNull(0))
                                {
                                    item = reader.GetString(0) ?? "";
                                }
                                if (!reader.IsDBNull(1))
                                {
                                    name = reader.GetString(1) ?? "";
                                }
                                if (!reader.IsDBNull(2))
                                {
                                    qty = reader.GetInt32(2).ToString() ?? "";
                                }
                                Item current = new Item();
                                current.item = item;
                                current.name = name;
                                current.qty = qty;
                                items.Add(current);
                            }
                        }
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
            }

            InsertRows(items);
            int result = 9 + 9;
        }

        internal void CommitLocationsFromAssets()
        {
            List<string> items = new List<string>();
            //  var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                try
                {
                    conn.Open();
                    var sql = "SELECT acLocation, Count(*) AS Repeaters from tAsset WHERE acLocation != '' GROUP BY acLocation HAVING  COUNT(*) > 0; \r\n";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            // Call Read before accessing data.
                            while (reader.Read())
                            {
                                string location = string.Empty;

                                if (!reader.IsDBNull(0))
                                {
                                    location = reader.GetString(0) ?? "";
                                }

                                items.Add(location);
                            }
                        }
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message); 
                }
            }
            InsertRowsLocations(items);
        }

        private void InsertRowsLocations(List<string> items)
        {
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                objConn.Open();



                foreach (string item in items)
                {

                    try
                    {
                        SqlCommand current = new SqlCommand($"INSERT INTO tLocation (acLocation, acName) VALUES ('{item}', '{item}'); ", objConn);
                        current.ExecuteNonQuery();
                    } catch
                    {
                        continue;
                    }
                }
                
               
          
                    objConn.Close();
                
            }
        }

        private void InsertRows(List<Item> items)
        {
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                objConn.Open();
             
                

                foreach (Item item in items)
                {
                    try
                    {
                        SqlCommand current = new SqlCommand($"INSERT INTO tItem (acItem, acName, anQty) VALUES ('{item.item}', '{item.name}', {item.qty})", objConn);
                        current.ExecuteNonQuery();
                    } catch (Exception ex)
                    {
                        _logger.LogError("Error: " + ex.Message + DateTime.Now);
                        continue;
                    }
                }

                    objConn.Close();
                

            }


        }

        internal ExportStructure GetStructure(int count)
        {
            ExportStructure structure = new ExportStructure();
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                objConn.Open();
                try
                {
                    SqlCommand current = new SqlCommand($"SELECT * FROM tAsset;", objConn);

                    using (SqlDataReader reader = current.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            ItemExport item = new ItemExport();
                            try
                            {
                                item.anQId = Int32.Parse(reader["anQId"].ToString());
                            }
                            catch
                            {
                                item.anQId = -1;
                            }
                            item.acECD = reader["acECD"].ToString();
                            item.acItem = reader["acItem"].ToString();
                            item.acCode = reader["acCode"].ToString();
                            item.acLocation = reader["acLocation"].ToString();
                            item.acType = reader["acType"].ToString();
                            item.acName = reader["acName"].ToString();

                            if (item.anQId == -1) { continue; }
                            else
                            {
                                structure.items.Add(item);
                            }
                        }
                    }
                }
                catch (Exception ex) {
                    _logger.LogError("Error: " + ex.Message + DateTime.Now);
                    throw new KeyNotFoundException(ex.Message);
                }
                finally
                {
                    objConn.Close();
                }
            }
            return structure;
        }

        internal List<string> GetRowsForConfiguration(string[] ids)
        {
            List<string> structure = new List<string>();
            List<string> rows = new List<string>();
            foreach (var singular in ids)
            {
                var names = getExportColumnNames();
                int number = Int32.Parse(singular);
                rows.Add(names.ElementAt(number).Text);
            }
            string select = "";
            foreach (var row in rows)
            {
                select += row + ",";
            }
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                SqlCommand current = new SqlCommand($"SELECT {select.Remove(select.Length - 1)} FROM vAssetCheck;", conn);
                using (SqlDataReader reader = current.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        String currentLine = "";
                        foreach (var singular in rows)
                        {

                            string currentValue = Convert.ToString(reader[$"{singular}"]);
                            if (currentValue != null)
                            {
                                if (currentValue != "")
                                {
                                    // Not empty
                                    currentLine += currentValue + ";";
                                }
                                else
                                {
                                    currentLine += ";";
                                }
                            }
                        }
                        structure.Add(currentLine);
                        // REturn all data
                    }
                }
            }

            return structure;
        }

        public static T ConvertFromDBVal<T>(object obj)
        {
            if (obj == null || obj == DBNull.Value)
            {
                return default(T); // returns the default value for the type
            }
            else
            {
                return (T)obj;
            }
        }

        public List<InventoryGlobal> getInventories()
        {
            List<InventoryGlobal> inventories = new List<InventoryGlobal>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM tInventory;", connection);
                using (SqlDataReader rdr = command.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        String name;
                        String datet;
                        String closed;
                        String confirm;
                        int qId;
                        bool active;
                        name = ConvertFromDBVal<string>(rdr["acNote"]);
                        datet = ConvertFromDBVal<DateTime>(rdr["adDateCheck"]).ToString();
                        closed = ConvertFromDBVal<DateTime>(rdr["adDateConfirm"]).ToString();
                        confirm = ConvertFromDBVal<DateTime>(rdr["adDateConfirm"]).ToString();
                        var defaultDateTime = ConvertFromDBVal<DateTime>(rdr["adDateConfirm"]);
                        if (defaultDateTime == default(DateTime))
                        {
                            confirm = string.Empty;
                        }
                        qId = ConvertFromDBVal<int>(rdr["anQId"]);
                        if (confirm.Length > 3)
                        {
                            active = true;
                        }
                        else
                        {
                            active = false;
                        }
                        inventories.Add(new InventoryGlobal { name = name, date = datet.ToString(), closed = confirm, active = active, qId = qId });
                    }
                }
            }

            return inventories;
        }

        public bool CreateInventory(string name, string date, string leader)
        {
            string id;

            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                conn.Open();
                SqlCommand command = new SqlCommand("SELECT ID FROM Accounts WHERE UserName = @Leader", conn);
                command.Parameters.AddWithValue("@Leader", leader);

                id = command.ExecuteScalar()?.ToString();
            }

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand checkOpen = new SqlCommand("SELECT COUNT(*) as openInventory FROM tInventory WHERE adDateConfirm IS NULL;", conn);
                int countOpen = (int)checkOpen.ExecuteScalar();

                if (countOpen > 0)
                {
                    return false;
                }

                SqlCommand command = new SqlCommand("INSERT INTO tInventory VALUES (@Date, @ID, NULL, NULL, NULL, NULL, NULL, NULL, @Name)", conn);

                command.Parameters.AddWithValue("@Date", date);
                command.Parameters.AddWithValue("@ID", id);
                command.Parameters.AddWithValue("@Name", name);

                command.ExecuteNonQuery();
            }

            return true;
        }


        public void DeleteInventory(string qid)
        {
            // var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand($"DELETE FROM tInventory WHERE anQId = {qid}", connection);
                command.ExecuteNonQuery();

            }
        }

        public void DeleteInventoryItem(string qid)
        {
            // var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand($"DELETE FROM tItem WHERE anQId = {qid}", connection);
                command.ExecuteNonQuery();
            }
        }

        public void DeleteInventoryLocation(string qid)
        {
            // var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand($"DELETE FROM tLocation WHERE anQId = {qid}", connection);
                command.ExecuteNonQuery();
            }
        }

        public class CheckOutAPI
        {
            private int totalCount { get; set; }
            public List<CheckOut> data { get; set; }

            public void setCount()
            {
                this.totalCount = data.Count;
            }
        }

        public List<CheckOut> GetAllCheckOutItems()
        {
            int qid;
            List<CheckOut> items = new List<CheckOut>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {


                connection.Open();
                SqlCommand getOpenInventory = new SqlCommand("SELECT anQId FROM tInventory WHERE adDateConfirm IS NULL;", connection);
                try
                {
                    qid = (int) getOpenInventory.ExecuteScalar();
                } catch
                {
                    return new List<CheckOut>();
                }


                SqlCommand command = new SqlCommand($"SELECT a.*, b.* FROM tCheckout AS a LEFT JOIN tAsset AS b ON a.anAssetID = b.anQId WHERE a.anInventory = {qid} AND a.adDateConfirm IS NULL AND abWriteOff != 1;", connection);

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        CheckOut checkOut = new CheckOut();
                        checkOut.anQId = ConvertFromDBVal<int>(reader["anQId"]);
                        checkOut.anInventory = ConvertFromDBVal<int>(reader["anInventory"]);
                        checkOut.anAssetID = ConvertFromDBVal<int>(reader["anAssetID"]);
                        checkOut.acItem = ConvertFromDBVal<string>(reader["acItem"]);
                        checkOut.acLocation = ConvertFromDBVal<string>(reader["acLocation"]);
                        checkOut.acCode = ConvertFromDBVal<string>(reader["acCode"]);
                        checkOut.acECD = ConvertFromDBVal<string>(reader["acECD"]);
                        checkOut.acName = ConvertFromDBVal<string>(reader["acName"]);
                        checkOut.acName2 = ConvertFromDBVal<string>(reader["acName2"]);
                        checkOut.acCareTaker = ConvertFromDBVal<string>(reader["acCareTaker"]);
                        checkOut.adDateCheck = ConvertFromDBVal<DateTime>(reader["adDateCheck"]).ToString();
                        checkOut.anUserCheck = ConvertFromDBVal<int>(reader["anUserCheck"]);
                        checkOut.adStringConfirm = "Test";
                        checkOut.anUserConfirm = ConvertFromDBVal<int>(reader["anUserConfirm"]);
                        checkOut.adTimeIns = ConvertFromDBVal<DateTime>(reader["adTimeIns"]).ToString();
                        checkOut.anUserIns = ConvertFromDBVal<int>(reader["anUserIns"]);
                        checkOut.adTimeChg = ConvertFromDBVal<DateTime>(reader["adTimeChg"]).ToString();
                        checkOut.anUserChg = ConvertFromDBVal<int>(reader["anUserChg"]);
                        checkOut.acNote = ConvertFromDBVal<string>(reader["acNote"]);
                        items.Add(checkOut);
                    }
                }
            }

            CheckOutAPI api = new CheckOutAPI();
            api.data = items;
            api.setCount();



            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                foreach (var i in items)
                {
                    conn.Open();
                    SqlCommand getEmail = new SqlCommand($"SELECT [UserName] FROM Accounts WHERE ID = {i.anUserCheck};", conn);

                    String email = (string) getEmail.ExecuteScalar();

                    i.user = email;
                    conn.Close();
                }

            }

            return items;
        }

        public void CommitRow(CheckOut row, string user)
        {
            string currentStamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            int userID = getUserId(user);
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                SqlCommand sql = new SqlCommand($"UPDATE tCheckOut SET adDateConfirm = '{currentStamp}', anUserConfirm = {userID} WHERE anQId = {row.anQId}", conn);
                sql.ExecuteNonQuery();
            }
        }

        public int getUserId(string user)
        {
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                conn.Open();
                SqlCommand sql = new SqlCommand($"SELECT ID FROM Accounts WHERE UserName='{user}'", conn);
                int id = (int)sql.ExecuteScalar();
                return id;
            }
        }

        public void DeleteRow(CheckOut row)
        {
            string currentStamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                SqlCommand sql = new SqlCommand($"DELETE FROM tCheckOut WHERE anQId = {row.anQId}", conn);
                sql.ExecuteNonQuery();
            }
        }

        public CurrentState GetAllThreeTablesCurrentState()
        {
            var item = new CurrentState();
            return item;
        }

        public void CommitInventory(InventoryGlobal row, string? user)
        {
            string currentStamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            int userID = getUserId(user);

            List<CheckOut> items = new List<CheckOut>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand getCheckoutItems = new SqlCommand($"select * FROM tCheckOut WHERE anInventory = {row.qId};", conn);
                
                using(SqlDataReader reader = getCheckoutItems.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        CheckOut checkOut = new CheckOut();
                        checkOut.anQId = ConvertFromDBVal<int>(reader["anQId"]);
                        checkOut.anInventory = ConvertFromDBVal<int>(reader["anInventory"]);
                        checkOut.anAssetID = ConvertFromDBVal<int>(reader["anAssetID"]);
                        checkOut.acItem = ConvertFromDBVal<string>(reader["acItem"]);
                        checkOut.acLocation = ConvertFromDBVal<string>(reader["acLocation"]);
                        checkOut.acCode = ConvertFromDBVal<string>(reader["acCode"]);
                        checkOut.acECD = ConvertFromDBVal<string>(reader["acECD"]);
                        checkOut.acName = ConvertFromDBVal<string>(reader["acName"]);
                        checkOut.acName2 = ConvertFromDBVal<string>(reader["acName2"]);
                        checkOut.adDateCheck = ConvertFromDBVal<DateTime>(reader["adDateCheck"]).ToString();
                        checkOut.anUserCheck = ConvertFromDBVal<int>(reader["anUserCheck"]);
                        checkOut.adStringConfirm = "Test";
                        checkOut.anUserConfirm = ConvertFromDBVal<int>(reader["anUserConfirm"]);
                        checkOut.adTimeIns = ConvertFromDBVal<DateTime>(reader["adTimeIns"]).ToString();
                        checkOut.anUserIns = ConvertFromDBVal<int>(reader["anUserIns"]);
                        checkOut.adTimeChg = ConvertFromDBVal<DateTime>(reader["adTimeChg"]).ToString();
                        checkOut.anUserChg = ConvertFromDBVal<int>(reader["anUserChg"]);
                        checkOut.acNote = ConvertFromDBVal<string>(reader["acNote"]);
                        items.Add(checkOut); 
                    }
                }
                foreach (CheckOut item in items)
                {
                    try
                    {
                        SqlCommand command = new SqlCommand($"UPDATE tAsset SET acLocation = '{item.acLocation}', acECD = '{item.acECD}' WHERE anQId = '{item.anAssetID}';", conn);
                        command.ExecuteNonQuery();
                    } catch (Exception ex)
                    {
                        _logger.LogError("Error: " + ex.Message + DateTime.Now);
                        var err = ex;
                    }
                    try
                    {
                        SqlCommand confirm = new SqlCommand($"UPDATE tCheckOut SET adDateConfirm = '{DateTime.Now}', anUserConfirm = {userID} WHERE anQId = {item.anQId}", conn);
                        confirm.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        var err = ex;
                    }
                }
                // Closing the inventory
                SqlCommand sql = new SqlCommand($"UPDATE tInventory SET adDateConfirm = '{currentStamp}', anUserConfirm = {userID} WHERE anQId = {row.qId}", conn);
                sql.ExecuteNonQuery();
            }
        }

        public List<LocationListing> GetAllLocations()
        {
            List<LocationListing> data = new List<LocationListing>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand sql = new SqlCommand("SELECT * FROM tLocation", connection);
                using (SqlDataReader reader = sql.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int anQId = ConvertFromDBVal<int>(reader["anQId"]);
                        string acLocation = ConvertFromDBVal<string>(reader["acLocation"]);
                        string acName = ConvertFromDBVal<string>(reader["acName"]);
                        string acDept = ConvertFromDBVal<string>(reader["acDept"]);
                        int anUserIns = ConvertFromDBVal<int>(reader["anUserIns"]);
                        int anUserChg = ConvertFromDBVal<int>(reader["anUserChg"]);
                        string adTimeChg = ConvertFromDBVal<DateTime>(reader["adTimeChg"]).ToString();
                        string adTimeIns = ConvertFromDBVal<DateTime>(reader["adTimeIns"]).ToString();
                        string acCostDrv = ConvertFromDBVal<string>(reader["acCostDrv"]);
                        string acCompany = ConvertFromDBVal<string>(reader["acCompany"]);
                        string acNote = ConvertFromDBVal<string>(reader["acNote"]);
                        string acActive = ConvertFromDBVal<string>(reader["acActive"]);
                        string acCode = ConvertFromDBVal<string>(reader["acCode"]);
                        LocationListing row = new LocationListing(anQId, acLocation, acName, acDept, anUserIns, anUserChg, adTimeChg, adTimeIns, acCostDrv, acCompany, acNote, acActive, acCode);
                        data.Add(row);
                    }
                }
            }

            return data;
        }

        public List<ItemListing> GetAllItems()
        {
            List<ItemListing> data = new List<ItemListing>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand sql = new SqlCommand("SELECT * FROM tItem", connection);
                using (SqlDataReader reader = sql.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int anQId = ConvertFromDBVal<int>(reader["anQId"]);
                        string acType = ConvertFromDBVal<string>(reader["acType"]);
                        string acItem = ConvertFromDBVal<string>(reader["acItem"]);
                        string acName = ConvertFromDBVal<string>(reader["acName"]);
                        decimal anQty = ConvertFromDBVal<decimal>(reader["anQty"]);
                        string acOrderKey = ConvertFromDBVal<string>(reader["acOrderKey"]);
                        int anOrderNo = ConvertFromDBVal<int>(reader["anOrderNo"]);
                        string adOrderDate = ConvertFromDBVal<DateTime>(reader["adOrderDate"]).ToString();
                        decimal anAcqVal = (decimal)ConvertFromDBVal<decimal>(reader["anAcqVal"]);
                        decimal anWrtOffVal = (decimal)ConvertFromDBVal<decimal>(reader["anWrtOffVal"]);
                        string acStatus = ConvertFromDBVal<string>(reader["acStatus"]);
                        string adTimeIns = ConvertFromDBVal<DateTime>(reader["adTimeIns"]).ToString();
                        int anUserIns = ConvertFromDBVal<int>(reader["anUserIns"]);
                        string adTimeChg = ConvertFromDBVal<DateTime>(reader["adTimeChg"]).ToString();
                        int anUserChg = ConvertFromDBVal<int>(reader["anUserChg"]);
                        string acNote = ConvertFromDBVal<string>(reader["acNote"]);
                        byte[] abIcon = ConvertFromDBVal<byte[]>(reader["abIcon"]);
                        ItemListing row = new ItemListing(anQId, acType, acItem, acName, anQty, acOrderKey, anOrderNo, adOrderDate, anAcqVal, anWrtOffVal, acStatus, adTimeIns, anUserIns, adTimeChg, anUserChg, acNote, abIcon, "");
                        data.Add(row);
                    }
                }
            }
            return data;
        }

        public List<AssetListing> GetAssets(int current)
        {
            List<AssetListing> data = new List<AssetListing>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand sql = new SqlCommand($"select * from vAssetCheck where anInventory = {current}", connection);
                using (SqlDataReader reader = sql.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int anQId = ConvertFromDBVal<int>(reader["anQId"]);
                        string acType = ConvertFromDBVal<string>(reader["acType"]);
                        string acItem = ConvertFromDBVal<string>(reader["acItem"]);
                        string acLocation = ConvertFromDBVal<string>(reader["acLocation"]);
                        string acCode = ConvertFromDBVal<string>(reader["acCode"]);
                        string acECD = ConvertFromDBVal<string>(reader["acECD"]);
                        string acName = ConvertFromDBVal<string>(reader["acName"]);
                        string acName2 = ConvertFromDBVal<string>(reader["acName2"]);
                        string adDateOfACQ = ConvertFromDBVal<string>(reader["adDateOfACQ"]);
                        string adDateOfACT = ConvertFromDBVal<string>(reader["adDateOfACT"]);
                        string adDateOfLIQ = ConvertFromDBVal<string>(reader["adDateOfLIQ"]);
                        string adDateOfELI = ConvertFromDBVal<string>(reader["adDateOfELI"]);
                        string acCareTaker = ConvertFromDBVal<string>(reader["acCareTaker"]);
                        string adTimeIns = ConvertFromDBVal<DateTime>(reader["adTimeIns"]).ToString();
                        int anUserIns = ConvertFromDBVal<int>(reader["anUserIns"]);
                        string adTimeChg = ConvertFromDBVal<DateTime>(reader["adTimeChg"]).ToString();
                        int anUserChg = ConvertFromDBVal<int>(reader["anUserChg"]);
                        string acNote = ConvertFromDBVal<string>(reader["acNote"]);
                        string acFieldSA = ConvertFromDBVal<string>(reader["acFieldSA"]);
                        string acFieldSB = ConvertFromDBVal<string>(reader["acFieldSB"]);
                        string acFieldSC = ConvertFromDBVal<string>(reader["acFieldSC"]);
                        string acFieldSD = ConvertFromDBVal<string>(reader["acFieldSD"]);
                        string acFieldSE = ConvertFromDBVal<string>(reader["acFieldSE"]);
                        string acFieldSF = ConvertFromDBVal<string>(reader["acFieldSF"]);
                        string acFieldSG = ConvertFromDBVal<string>(reader["acFieldSG"]);
                        string acFieldSH = ConvertFromDBVal<string>(reader["acFieldSH"]);
                        string acFieldSI = ConvertFromDBVal<string>(reader["acFieldSI"]);
                        string acFieldSJ = ConvertFromDBVal<string>(reader["acFieldSJ"]);
                        decimal anFieldNA = ConvertFromDBVal<decimal>(reader["anFieldNA"]);
                        decimal anFieldNB = ConvertFromDBVal<decimal>(reader["anFieldNB"]);
                        decimal anFieldNC = ConvertFromDBVal<decimal>(reader["anFieldNC"]);
                        decimal anFieldND = ConvertFromDBVal<decimal>(reader["anFieldND"]);
                        decimal anFieldNE = ConvertFromDBVal<decimal>(reader["anFieldNE"]);
                        decimal anFieldNF = ConvertFromDBVal<decimal>(reader["anFieldNF"]);
                        decimal anFieldNG = ConvertFromDBVal<decimal>(reader["anFieldNG"]);
                        decimal anFieldNH = ConvertFromDBVal<decimal>(reader["anFieldNH"]);
                        decimal anFieldNI = ConvertFromDBVal<decimal>(reader["anFieldNI"]);
                        decimal anFieldNJ = ConvertFromDBVal<decimal>(reader["anFieldNJ"]);
                        string adFieldDA = ConvertFromDBVal<string>(reader["adFieldDA"]);
                        string adFieldDB = ConvertFromDBVal<string>(reader["adFieldDB"]);
                        string adFieldDC = ConvertFromDBVal<string>(reader["adFieldDC"]);
                        string adFieldDD = ConvertFromDBVal<string>(reader["adFieldDD"]);
                        string acActive = ConvertFromDBVal<string>(reader["acActive"]);
                        bool abWriteOff = ConvertFromDBVal<bool>(reader["abWriteOff"]);
                        string abWriteOffReason = ConvertFromDBVal<string>(reader["abWriteOffReason"]);
                        int anSeqNo = ConvertFromDBVal<int>(reader["anSeqNo"]);
                        string acInsertedFrom = ConvertFromDBVal<string>(reader["acInsertedFrom"]);
                        bool checkedOut = ConvertFromDBVal<bool>(reader["checkedOut"]);
                        data.Add(new AssetListing(anQId, acType, acItem, acLocation, acCode, acECD, acName, acName2, adDateOfACQ, adDateOfACT, adDateOfLIQ, adDateOfELI, acCareTaker, adTimeIns, anUserIns, adTimeChg, anUserChg, acNote,

                            acFieldSA, acFieldSB, acFieldSC, acFieldSD, acFieldSE, acFieldSF, acFieldSG, acFieldSH, acFieldSI, acFieldSJ, anFieldNA, anFieldNB, anFieldNC, anFieldND, anFieldNE, anFieldNF, anFieldNG, anFieldNH,

                            anFieldNI, anFieldNJ, adFieldDA, adFieldDB, adFieldDC, adFieldDD, acActive, anSeqNo, acInsertedFrom, abWriteOff, abWriteOffReason, checkedOut));
                    }
                }
            }
            return data;
        }




        public void UpdateRow(string table, string field, string type, string data, string id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string updateQuery = "";

                if (type == "bool")
                {
                    updateQuery = $"UPDATE {table} SET {field} = @data";

                    if (data == "true")
                    {
                        updateQuery += ", adWriteOffDate = GETDATE()";
                    }
                    else
                    {
                        updateQuery += ", adWriteOffDate = NULL";
                    }

                    updateQuery += " WHERE anQId = @id";
                }
                else if (type == "string")
                {
                    updateQuery = $"UPDATE {table} SET {field} = @data WHERE anQId = @id";
                }
                else
                {
                    updateQuery = $"UPDATE {table} SET {field} = @data WHERE anQId = @id";
                }

                using (SqlCommand command = new SqlCommand(updateQuery, connection))
                {
                    // Add parameters with explicit data types
                    command.Parameters.Add("@data", GetSqlDbType(type)).Value = data ?? string.Empty;
                    command.Parameters.AddWithValue("@id", id);

                    command.ExecuteNonQuery();
                }
            }
        }

        private SqlDbType GetSqlDbType(string type)
        {
            // Map your type strings to SqlDbType
            switch (type.ToLower())
            {
                case "int":
                    return SqlDbType.Int;
                case "bool":
                    return SqlDbType.Bit;
                case "string":
                    return SqlDbType.NVarChar;
                default:
                    return SqlDbType.NVarChar;
            }
        }




        internal List<CheckOut> GetAllCheckOutItemsNotFinished()
        {
            int qid;
            List<CheckOut> items = new List<CheckOut>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {


                connection.Open();
                SqlCommand getOpenInventory = new SqlCommand("SELECT anQId FROM tInventory WHERE adDateConfirm IS NULL;", connection);
                try
                {
                    qid = (int)getOpenInventory.ExecuteScalar();
                } catch
                {
                    return new List<CheckOut>();
                }


                SqlCommand command = new SqlCommand($"SELECT * FROM tAsset WHERE anQId not in (SELECT distinct anAssetID FROM tCheckOut WHERE anInventory = {qid}) AND abWriteOff != 1", connection);

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        CheckOut checkOut = new CheckOut();
                        checkOut.anQId = ConvertFromDBVal<int>(reader["anQId"]);
                        checkOut.anInventory = qid;
                        checkOut.anAssetID = ConvertFromDBVal<int>(reader["anQId"]);
                        checkOut.acItem = ConvertFromDBVal<string>(reader["acItem"]);
                        checkOut.acLocation = ConvertFromDBVal<string>(reader["acLocation"]);
                        checkOut.acCode = ConvertFromDBVal<string>(reader["acCode"]);
                        checkOut.acECD = ConvertFromDBVal<string>(reader["acECD"]);
                        checkOut.acName = ConvertFromDBVal<string>(reader["acName"]);
                        checkOut.acName2 = ConvertFromDBVal<string>(reader["acName2"]);
                        checkOut.acCareTaker = ConvertFromDBVal<string>(reader["acCareTaker"]);
                        checkOut.adStringConfirm = "Test";
                        checkOut.adTimeIns = ConvertFromDBVal<DateTime>(reader["adTimeIns"]).ToString();
                        checkOut.anUserIns = ConvertFromDBVal<int>(reader["anUserIns"]);
                        checkOut.adTimeChg = ConvertFromDBVal<DateTime>(reader["adTimeChg"]).ToString();
                        checkOut.anUserChg = ConvertFromDBVal<int>(reader["anUserChg"]);
                        checkOut.acNote = ConvertFromDBVal<string>(reader["acNote"]);
                        items.Add(checkOut);
                    }
                }
            }

            CheckOutAPI api = new CheckOutAPI();
            api.data = items;
            api.setCount();




            return items;
        }

        internal List<CheckOut> GetAllCheckOutItemsDiscrepancies()
        {
            int qid;
            List<CheckOut> items = new List<CheckOut>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand getOpenInventory = new SqlCommand("SELECT anQId FROM tInventory WHERE adDateConfirm IS NULL;", connection);
                try
                {
                    qid = (int)getOpenInventory.ExecuteScalar();
                } catch
                {
                    return new List<CheckOut>();
                }
                SqlCommand command = new SqlCommand($"SELECT a.*, b.* FROM tCheckOut AS a LEFT JOIN tAsset AS b ON a.anAssetID = b.anQId WHERE anInventory = {qid} AND anAssetID in (SELECT anAssetID FROM tCheckOut WHERE anInventory = {qid} GROUP BY anAssetID HAVING count(anAssetID) > 1) AND anAssetID not in (SELECT anAssetID FROM tCheckOut WHERE anInventory = {qid} AND adDateConfirm is not null) AND abWriteOff != 1;", connection);

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        CheckOut checkOut = new CheckOut();
                        checkOut.anQId = ConvertFromDBVal<int>(reader["anQId"]);
                        checkOut.anInventory = ConvertFromDBVal<int>(reader["anInventory"]);
                        checkOut.anAssetID = ConvertFromDBVal<int>(reader["anAssetID"]);
                        checkOut.acItem = ConvertFromDBVal<string>(reader["acItem"]);
                        checkOut.acLocation = ConvertFromDBVal<string>(reader["acLocation"]);
                        checkOut.acCode = ConvertFromDBVal<string>(reader["acCode"]);
                        checkOut.acECD = ConvertFromDBVal<string>(reader["acECD"]);
                        checkOut.acName = ConvertFromDBVal<string>(reader["acName"]);
                        checkOut.acName2 = ConvertFromDBVal<string>(reader["acName2"]);
                        checkOut.acCareTaker = ConvertFromDBVal<string>(reader["acCareTaker"]);
                        checkOut.adDateCheck = ConvertFromDBVal<DateTime>(reader["adDateCheck"]).ToString();
                        checkOut.anUserCheck = ConvertFromDBVal<int>(reader["anUserCheck"]);
                        checkOut.adStringConfirm = "Test";
                        checkOut.anUserConfirm = ConvertFromDBVal<int>(reader["anUserConfirm"]);
                        checkOut.adTimeIns = ConvertFromDBVal<DateTime>(reader["adTimeIns"]).ToString();
                        checkOut.anUserIns = ConvertFromDBVal<int>(reader["anUserIns"]);
                        checkOut.adTimeChg = ConvertFromDBVal<DateTime>(reader["adTimeChg"]).ToString();
                        checkOut.anUserChg = ConvertFromDBVal<int>(reader["anUserChg"]);
                        checkOut.acNote = ConvertFromDBVal<string>(reader["acNote"]);
                        items.Add(checkOut);
                    }
                }
            }

            CheckOutAPI api = new CheckOutAPI();
            api.data = items;
            api.setCount();



            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                foreach (var i in items)
                {
                    conn.Open();
                    SqlCommand getEmail = new SqlCommand($"SELECT [UserName] FROM Accounts WHERE ID = {i.anUserCheck};", conn);

                    String email = (string)getEmail.ExecuteScalar();

                    i.user = email;
                    conn.Close();
                }

            }

            return items;
        }

        internal int CheckDiscrepancies(int qId)
        {
            int result = -1;
            using(SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand($"SELECT count(*) FROM tCheckOut WHERE anInventory = {qId} AND anAssetID in (SELECT anAssetID FROM tCheckOut WHERE anInventory = {qId} GROUP BY anAssetID HAVING count(anAssetID) > 1)\n AND anAssetID not in (SELECT anAssetID FROM tCheckOut WHERE anInventory = {qId} AND adDateConfirm is not null)", connection);
                result = (int) cmd.ExecuteScalar();
            }


            return result;
        }

        internal bool findType(string sql)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand($"{sql}", connection);
                string result = (string)cmd.ExecuteScalar();
                switch (result)
                {
                    case "char":
                        return false;
                    case "datetime":
                        return true;
                    case "decimal":
                        return false;
                    case "int":
                        return false;
                    case "money":
                        return false;
                    case "smalldatetime":
                        return true;
                    case "varbinary":
                        return true;
                    case "varchar":
                        return true;

                }

            }
            return false;
        }



       
        internal List<Column> getExportColumnNames()
        {
           List<Column> data = new List<Column>();
           int counter = 0;
           using(SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'tAsset';", connection);
                using(SqlDataReader reader = command.ExecuteReader())
                {
                    while(reader.Read()) {
                        try
                        {
                            data.Add(new Column { ID = counter, Text = reader.GetString(0) });
                        } catch
                        {
                            continue;
                        } finally
                        {
                            counter += 1;
                        }
                    }
                }
            }
            data.Add(new Column { ID = counter, Text = "CheckedOut" });
            return data;
        }



        internal bool CheckIfCompanyExists(string company, string email)
        {
            using(SqlConnection connection = new SqlConnection(config.connectionString))
            {
                connection.Open();
                SqlCommand sql = new SqlCommand($"select count(Company) from Accounts where Company = '{company}' and UserType != 'SADM';", connection);
                int count = (int) sql.ExecuteScalar();
                if(count > 0)
                {
                    return true;
                }
            }
            return false;
        }

        internal void DeleteInventoryAsset(string id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand sql = new SqlCommand($"delete from tAsset where anQId = {id}", connection);
                sql.ExecuteNonQuery();
            }
        }

        internal int GetCurrentActiveInventory()
        {
            int result = -1;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand sql = new SqlCommand($"EXEC GetCurrentInventory", connection);
                var scalarResult = sql.ExecuteScalar();

                if (scalarResult != DBNull.Value && scalarResult != null)
                {
                    result = Convert.ToInt32(scalarResult);
                }
            }

            return result;
        }
    }
}