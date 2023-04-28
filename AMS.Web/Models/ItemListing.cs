namespace AMS.Web.Models
{
    public class ItemListing
    {
        public int anQId { get; set; }
        public string acType { get; set; }
        public string acItem { get; set; }
        public string acName { get; set; }
        public decimal anQty { get; set; }
        public string acOrderKey { get; set; }
        public int anOrderNo { get; set; }
        public string adOrderDate { get; set; }
        public decimal anAcqVal { get; set; }
        public decimal anWrtOffVal { get; set; }
        public string acStatus { get; set; }
        public string adTimeIns { get; set; }
        public int anUserIns { get; set; }
        public string adTimeChg { get; set; }
        public int anUserChg { get; set; }
        public string acNote { get; set; }
        public byte[] abIcon { get; set; }

        public string userName { get; set; }

        public ItemListing(int anQId_, string acType_, string acItem_, string acName_, decimal anQty_, string acOrderKey_, int anOrderNo_, string adOrderDate_, decimal anAcqVal_, decimal anWrtOffVal_, string acStatus_, string adTimeIns_, int anUserIns_, string adTimeChg_, int anUserChg_, string acNote_, byte[] abIcon_, string userName)
        {
            this.anQId = anQId_;
            this.acType = acType_;
            this.acItem = acItem_;
            this.acName = acName_;
            this.anQty = anQty_;
            this.acOrderKey = acOrderKey_;
            this.anOrderNo = anOrderNo_;
            this.adOrderDate = adOrderDate_;
            this.anAcqVal = anAcqVal_;
            this.anWrtOffVal = anWrtOffVal_;
            this.acStatus = acStatus_;
            this.adTimeIns = adTimeIns_;
            this.anUserIns = anUserIns_;
            this.adTimeChg = adTimeChg_;
            this.anUserChg = anUserChg_;
            this.acNote = acNote_;
            this.abIcon = abIcon_;
            this.userName = userName;
        }
    }
}
