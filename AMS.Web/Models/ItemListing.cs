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
        public DateTime adOrderDate { get; set; }
        public decimal anAcqVal { get; set; }
        public decimal anWrtOffVal { get; set; }
        public string acStatus { get; set; }
        public DateTime adTimeIns { get; set; }
        public int anUserIns { get; set; }
        public DateTime adTimeChg { get; set; }
        public int anUserChg { get; set; }
        public string acNote { get; set; }
        public byte[] abIcon { get; set; }

        public ItemListing(int anQId_, string acType_, string acItem_, string acName_, decimal anQty_, string acOrderKey_, int anOrderNo_, DateTime adOrderDate_, decimal anAcqVal_, decimal anWrtOffVal_, string acStatus_, DateTime adTimeIns_, int anUserIns_, DateTime adTimeChg_, int anUserChg_, string acNote_, byte[] abIcon_)
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
        }
    }
}
