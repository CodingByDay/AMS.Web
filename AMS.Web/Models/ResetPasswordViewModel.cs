namespace AMS.Web.Models
{
    public class ResetPasswordViewModel
    {
        public Guid? Guid { get; set; }
        public string? Email { get; set; }

        public string? error { get; set; }




        public ResetPasswordViewModel(string error)
        {
            this.error = error;
        }



        public ResetPasswordViewModel()
        {
            
        }
    }
}
