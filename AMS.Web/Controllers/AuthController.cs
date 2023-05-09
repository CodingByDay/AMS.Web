using AMS.Web.API;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using NuGet.Common;
using NuGet.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Text.Json;
using WebMatrix.WebData;
using AMS.Web.Models;
using System.Net.Mail;
using System.Text;
using AMS.Web.Database;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;

namespace AMS.Web.Controllers
{
    public class AuthController : Controller
    {

        private readonly Root _configuration;
        public IActionResult Index()
        {
            return View();
        }

        public AuthController(IOptions<Root> options)
        {
            _configuration = options.Value;
        }

        public IActionResult Login()
        {
            if (TempData["Login"] != null)
            {
                bool? login = (bool)TempData["Login"];

                ViewBag.Login = login;
            }
            return View();
        }


        [HttpGet]
        public IActionResult Authenticate([FromQuery(Name = "username")] string username, [FromQuery(Name = "password")] string password)
        {
            var config = ConfigurationHelper.GetConfigurationObject();
            DatabaseOperations db = new DatabaseOperations(config.connectionString);
            LoginRequest request = new LoginRequest();
            request.company = db.getCompanyForUserName(username);
            request.username = username;
            request.password = password;
            request.mode = "cs";
            var jsonString = System.Text.Json.JsonSerializer.Serialize(request);
            string response = HttpHelper.GetMethodCall(jsonString, "/login");
            LoginResponse? loginResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<LoginResponse>(response);
            if (loginResponse != null && loginResponse.result!="empty")
            {
                if (loginResponse.success)
                {
                    HttpContext.Session.SetString("connection", loginResponse.result);
                    HttpContext.Session.SetString("username", username);
                    HttpContext.Session.SetString("company", request.company);
                    return RedirectToAction("Index", "Home", new {company = request.company, version = config.version});
                }
            }
            TempData["Login"] = false;
            return RedirectToAction("Login", "Auth");
        }





        public IActionResult Homepage()
        {
            return View();
        }
        private void StoreTokenForUserName(string username)
        {
            throw new NotImplementedException();
        }

        private object GenerateRandonToken()
        {
            throw new NotImplementedException();
        }

        public IActionResult ResetPassword()
        {
            return View();
        }


        public class ResetResponse
        {
            public string username { get; set; }
            public string guid { get; set; }

        }


        [HttpPost]
        public JsonResult RequestReset(string username)
        {

            if (!string.IsNullOrEmpty(username))
            {
                ResetResponse resetResponse = new ResetResponse();
                Root config = ConfigurationHelper.GetConfigurationObject();
                string connectionString = config.connectionString;
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("AMS_LOGIN.dbo.spResetPassword", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlParameter paramUsername = new SqlParameter("@UserName", username);
                    cmd.Parameters.Add(paramUsername);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        if (Convert.ToBoolean(rdr["ReturnCode"]))
                        {
                            ResetPasswordViewModel resetModel = new ResetPasswordViewModel();
                            Guid UniqueId = (Guid)rdr["UniqueId"];
                            string Email = (string)rdr["Email"];
                            resetModel.Email = Email;
                            resetModel.Guid = UniqueId;
                            resetModel.error = string.Empty;


                            SendPasswordResetEmail(Email, "user", UniqueId.ToString());
                            return Json(resetModel);
                        }
                        else
                        {
                            return Json(new ResetPasswordViewModel("No data returned from the database!"));
                        }
                    }
                }
                return Json(resetResponse);
            } else
            {
                return Json(new ResetPasswordViewModel("No data returned from the database!"));
            }
        }








        private void SendPasswordResetEmail(string ToEmail, string UserName, string UniqueId)
        {
            var config = ConfigurationHelper.GetConfigurationObject();
            // MailMessage class is present is System.Net.Mail namespace
            MailMessage mailMessage = new MailMessage(config.email, ToEmail);


            // StringBuilder class is present in System.Text namespace
            StringBuilder sbEmailBody = new StringBuilder();
            sbEmailBody.Append("Dear " + UserName + ",<br/><br/>");
            sbEmailBody.Append("Please click on the following link to reset your password");
            sbEmailBody.Append("<br/>"); sbEmailBody.Append("https://localhost:7123/auth/resetpasswordaction?uid=" + UniqueId);
            sbEmailBody.Append("<br/><br/>");
            sbEmailBody.Append("<b>In.Sist d.o.o.</b>");

            mailMessage.IsBodyHtml = true;

            mailMessage.Body = sbEmailBody.ToString();
            mailMessage.Subject = "Reset Your Password";
            SmtpClient smtpClient = new SmtpClient("smtp.office365.com", 587);

            smtpClient.Credentials = new System.Net.NetworkCredential()
            {
                UserName = config.email,
                Password = config.password
            };

            smtpClient.EnableSsl = true;
            smtpClient.Send(mailMessage);
        }




        private bool ExecuteSP(string SPName, List<SqlParameter> SPParameters)
        {
            Root config = ConfigurationHelper.GetConfigurationObject();
            string connectionString = config.connectionString;
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(SPName, con);
                cmd.CommandType = CommandType.StoredProcedure;

                foreach (SqlParameter parameter in SPParameters)
                {
                    cmd.Parameters.Add(parameter);
                }

                con.Open();
                return Convert.ToBoolean(cmd.ExecuteScalar());
            }
        }



        public IActionResult Logout ()
        {
            HttpContext.Session.SetString("username", string.Empty);
            return RedirectToAction("Login");
        }



        public IActionResult ForgotPasswordChange(string email, string code)
        {
            return View();
        }


        public IActionResult ResetPasswordAction([FromQuery(Name = "uid")] string uid)
        {
            // Check the reset field in the database 
            // 
            if (String.IsNullOrEmpty(uid) || !IsPasswordResetLinkValid(uid))
            {
                return RedirectToAction("Login");
            }


            return View();
        }

        private bool IsPasswordResetLinkValid(string guid)
        {
            List<SqlParameter> paramList = new List<SqlParameter>()
            {
                new SqlParameter()
                {
                    ParameterName = "@GUID",
                    Value = guid
                }
            };

            return ExecuteSP("AMS_LOGIN.dbo.spIsPasswordResetLinkValid", paramList);
        }


        [HttpPost]
        public JsonResult ChangeUserPassword(string uid, string password)
        {
            List<SqlParameter> paramList = new List<SqlParameter>()
            {
                new SqlParameter()
                {
                    ParameterName = "@GUID",
                    Value = uid
                },
                new SqlParameter()
                {
                    ParameterName = "@Password",
                    Value = password
                }
            };

            return Json(ExecuteSP("AMS_LOGIN.dbo.spChangePasswordEmail", paramList));
        }

        public IActionResult Query(string username, string password)
        {
            return RedirectToAction("Login");
        }

        

        public JsonResult RegisterUserWithData(string email, string password, string company)
        {
            var config = ConfigurationHelper.GetConfigurationObject();
            DatabaseOperations db = new DatabaseOperations(config.connectionString);


            db.RegisterUserWithData(email, password, company);


            //  db.DeleteInviteLink()
            return Json(true);
        }


        public IActionResult RegisterUser([FromQuery(Name = "uid")] string uid, [FromQuery(Name = "company")] string company, [FromQuery(Name = "user")] string user)
        {
            var config = ConfigurationHelper.GetConfigurationObject();
            DatabaseOperations db = new DatabaseOperations(config.connectionString);

            if (String.IsNullOrEmpty(uid) || !db.checkGuidInviteUser(uid, user))
            {
                return RedirectToAction("Login");
            }
            RegistrationViewModel viewModel = new RegistrationViewModel();
            viewModel.guid = uid;
            viewModel.company = company;
            viewModel.email = user;
            return View(viewModel);
        }








        // UpdatePassword


        [HttpPost]
        public JsonResult UpdatePassword(string email, string password)
        {
            var config = ConfigurationHelper.GetConfigurationObject();
            DatabaseOperations db = new DatabaseOperations(config.connectionString);



            db.UpdateUserPassword(email, password);

            return Json(true);
        }


        public IActionResult Register([FromQuery(Name = "uid")] string uid, [FromQuery(Name = "company")] string company, [FromQuery(Name = "email")] string email)
        {
            var config = ConfigurationHelper.GetConfigurationObject();
            DatabaseOperations db = new DatabaseOperations(config.connectionString);

            if (String.IsNullOrEmpty(uid) || !db.checkGuidInvite(uid, company))
            {
                return RedirectToAction("Login");
            }

            RegistrationViewModel viewModel = new RegistrationViewModel();
            viewModel.guid = uid;
            viewModel.company = company;
            viewModel.email = email;
            return View(viewModel);
        }
    }
}
