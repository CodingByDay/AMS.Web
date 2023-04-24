namespace AMS.Web.Models
{
    public class LocationListing
    {
        public int anQId { get; set; }
        public string acLocation { get; set; }
        public string acName { get; set; }
        public string acDept { get; set; }
        public int anUserIns { get; set; }
        public int anUserChg { get; set; }
        public string adTimeChg { get; set; }
        public string adTimeIns { get; set; }
        public string acCostDrv { get; set; }
        public string acCompany { get; set; }
        public string acNote { get; set; }
        public string acActive { get; set; }
        public string acCode { get; set; }

        public LocationListing(int anQId_, string acLocation_, string acName_, string acDept_, int anUserIns_, int anUserChg_, string adTimeChg_, string adTimeIns_, string acCostDrv_, string acCompany_, string acNote_, string acActive_, string acCode_)
        {
            this.anQId = anQId_;
            this.acLocation = acLocation_;
            this.acName = acName_;
            this.acDept = acDept_;
            this.anUserIns = anUserIns_;
            this.anUserChg = anUserChg_;
            this.adTimeChg = adTimeChg_;
            this.adTimeIns = adTimeIns_;
            this.acCostDrv = acCostDrv_;
            this.acCompany = acCompany_;
            this.acNote = acNote_;
            this.acActive = acActive_;
            this.acCode = acCode_;
        }
    }
}
