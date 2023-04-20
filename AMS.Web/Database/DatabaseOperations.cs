using AMS.Web.Classes;
using AMS.Web.Models;
using MimeKit;
using NuGet.Protocol.Plugins;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Security.AccessControl;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading.Channels;
using System.Xml.Linq;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace AMS.Web.Database
{
    public class DatabaseOperations
    {
        private String connectionString;
        private SqlTransaction objTrans;
        private Root config;

        public DatabaseOperations(string connection)
        {
            connectionString = connection;
            config = ConfigurationHelper.GetConfigurationObject();
            // call the api to ask
        }

        public string? getUserTypeFromString(string userType)
        {
            String userTypeInner = string.Empty;
            SqlCommand command = new SqlCommand();
            //var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection objConn = new SqlConnection(config.connectionString)) // This is the connection string for the login database.
            {
                try
                {
                    objConn.Open();
                    command = new SqlCommand($"SELECT UserType FROM Accounts WHERE UserName = '{userType}'", objConn);
                    string? type = (string) command.ExecuteScalar();
                    return type ?? string.Empty;
                }
                catch (Exception err)
                {
                    throw new KeyNotFoundException("Database error");

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
                        current = new SqlCommand("ALTER TABLE tAsset NOCHECK CONSTRAINT rtItem_tStatus", objConn);
                    }
                    else
                    {
                        current = new SqlCommand("ALTER TABLE tAsset CHECK CONSTRAINT rtItem_tStatus", objConn);
                    }
                    current.ExecuteNonQuery();
                }
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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
                        current = new SqlCommand("ALTER TABLE tAsset NOCHECK CONSTRAINT rtAsset_tItem, rtAsset_tLocation", objConn);
                    } else
                    {
                        current = new SqlCommand("ALTER TABLE tAsset CHECK CONSTRAINT rtAsset_tItem, rtAsset_tLocation", objConn);

                    }
                    current.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw new KeyNotFoundException("Database error");

                }
                finally { objConn.Close(); }
             
            }
        }




        public void insertBulk(List<string> statements)
        {
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                objConn.Open();
                //   objTrans = objConn.BeginTransaction();
                try
                {
                    foreach (string statement in statements)
                    {
                        SqlCommand current = new SqlCommand(statement, objConn);
                        current.ExecuteNonQuery();
                        //  objTrans.Commit();
                    }
                }
                catch (Exception ex)
                {
                    throw new KeyNotFoundException("Database error");


                }
                finally
                {
                    objConn.Close();
                }
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
                catch (Exception ex)
                {
                    throw new KeyNotFoundException("Database error");

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
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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
            string companyName = company ;
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

                } catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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
                    throw new KeyNotFoundException("Database error");

                }
            }
        }


        public List<SetTables> getTableDataAsset() {

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
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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
                    var sql = "  SELECT Password FROM Accounts WHERE UserName = @Username";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@Username", user);
                        var guid = (String)cmd.ExecuteScalar();       
                       
                        if(guid == uid)
                        {
                            return true;
                        }
                    }
                }
                catch (Exception)
                {
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
                        var guid =  (String) cmd.ExecuteScalar();
                        if(guid!=uid)
                        {
                            return false;
                        } else
                        {
                            return true;
                        }
                    }
                }
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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

                        string company = (string) cmd.ExecuteScalar();


                        result = company;

                    }


                    return result;

                }
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

                }
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
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

                }
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
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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
                catch (Exception)
                {
                    throw new KeyNotFoundException("Database error");

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
                catch (Exception)

                {
                    throw new KeyNotFoundException("Database error");

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
                catch (Exception)

                {
                    throw new KeyNotFoundException("Database error");

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
                    var sql = $"DELETE FROM Accounts WHERE email = '{email}';";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                    throw new KeyNotFoundException("Database error");

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
                catch (Exception ex)
                {
                    throw new KeyNotFoundException("Database error");

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
                catch (Exception ex)
                {
                    throw new KeyNotFoundException("Database error");

                }
            }
            InsertRowsLocations(items);

        }

        private void InsertRowsLocations(List<string> items)
        {
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                objConn.Open();
                try
                {
                    foreach (string item in items)
                    {
                        SqlCommand current = new SqlCommand($"INSERT INTO tLocation (acLocation, acName) VALUES ('{item}', '{item}'); ", objConn);
                        current.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                    throw new KeyNotFoundException("Database error");

                }
                finally
                {
                    objConn.Close();
                }
            }
        }

        private void InsertRows(List<Item> items)
        {
            using (SqlConnection objConn = new SqlConnection(connectionString))
            {
                objConn.Open();
                try
                {
                    foreach (Item item in items)
                    {
                        SqlCommand current = new SqlCommand($"INSERT INTO tItem (acItem, acName, anQty) VALUES ('{item.item}', '{item.name}', {item.qty})", objConn);
                        current.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                    throw new KeyNotFoundException("Database error");

                }
                finally
                {
                    objConn.Close();
                }
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
                                } catch
                                {
                                    item.anQId = -1;
                                }
                                item.acECD = reader["acECD"].ToString();
                                item.acItem = reader["acItem"].ToString();
                                item.acCode = reader["acCode"].ToString();
                                item.acLocation = reader["acLocation"].ToString();
                                item.acType = reader["acType"].ToString();
                                item.acName = reader["acName"].ToString();


                            if(item.anQId == -1) { continue;  } else
                            {
                                structure.items.Add(item);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {

                }
                finally
                {
                    objConn.Close();
                }
            }
            return structure;
        }

        internal List<string> GetRowsForConfiguration(CompleteConnectionConfiguration data)
        {
            List<string> structure = new List<string>();
            List<string> rows = new List<string>();
            foreach (var singular in data.baseData)
            {
                rows.Add(singular.Key.field);
            }
            string select = "";
            foreach (var row in rows)
            {
                select += row + ",";
            }
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                SqlCommand current = new SqlCommand($"SELECT {select.Remove(select.Length - 1)} FROM tAsset;", conn);
                using (SqlDataReader reader = current.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        String currentLine = "";
                        foreach (var singular in rows)
                        {
                            string currentValue = (string) reader[$"{singular}"];
                            if (currentValue != null)
                            {
                                if (currentValue != "")
                                {
                                    // Not empty
                                    currentLine += currentValue + ";";
                                } else
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
        public class Inventory
        {
            public string name { get; set; }
            public string date { get; set; }
            public string closed { get; set; }
            public bool active { get; set; }
            public int qId { get; set; }


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

        public List<Inventory> getInventories()
        {
           List<Inventory> inventories = new List<Inventory>();  
           using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM tInventory", connection);
                using (SqlDataReader rdr = command.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        String name;
                        System.DateTime datet;
                        String closed;
                        String confirm;
                        int qId;
                        bool active;
                        name = ConvertFromDBVal<string>(rdr["acNote"]);
                        datet = ConvertFromDBVal<DateTime>(rdr["adDateCheck"]); 
                        closed = ConvertFromDBVal<string>(rdr["adDateConfirm"]);
                        confirm = ConvertFromDBVal<DateTime>(rdr["adDateConfirm"]).ToString();
                        qId = ConvertFromDBVal<int>(rdr["anQId"]);
                        if (confirm.Length>3)
                        {
                            active = true;
                        } else
                        {
                            active = false;
                        }
                        inventories.Add(new Inventory { name = name, date = datet.ToString(), closed = closed, active = active, qId = qId });
                    }

                }
            }



           return inventories;
        }

        public void CreateInventory(string name, string date, string leader)
        {
            int id;
           // var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection conn = new SqlConnection(config.connectionString))
            {
                conn.Open();
                SqlCommand command = new SqlCommand($"SELECT ID FROM Accounts WHERE UserName = '{leader}'", conn);
                id = (int) command.ExecuteScalar();
                // Testiranje inserta za inventure //
            }

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                SqlCommand command = new SqlCommand($"INSERT INTO tInventory VALUES ('{date}', '{id}', NULL, NULL, NULL, NULL, NULL, NULL, 'Nova inventura')", conn);
                command.ExecuteNonQuery();
                // Testiranje inserta za inventure //

            }
        }

        public void DeleteInventory(string qid)
        {
            // var config = ConfigurationHelper.GetConfigurationObject();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand($"DELETE FROM tInventory WHERE anQId = {qid}", connection);
                command.ExecuteNonQuery();
                // Testiranje inserta za inventure //
            }
        }

        public List<CheckOut> GetAllCheckOutItems()
        {
            List<CheckOut> items = new List<CheckOut>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                CheckOut checkOut = new CheckOut();
                SqlCommand command = new SqlCommand("SELECT * FROM tCheckOut WHERE anInventory = 1", connection);

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
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
            }


            return items;
        }
    }
}
