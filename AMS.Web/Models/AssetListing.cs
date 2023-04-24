namespace AMS.Web.Models
{
    public class AssetListing
    {
        public int anQId { get; set; }
        public string acType { get; set; }
        public string acItem { get; set; }
        public string acLocation { get; set; }
        public string acCode { get; set; }
        public string acECD { get; set; }
        public string acName { get; set; }
        public string acName2 { get; set; }
        public string adDateOfACQ { get; set; }
        public string adDateOfACT { get; set; }
        public string adDateOfLIQ { get; set; }
        public string adDateOfELI { get; set; }
        public string acCareTaker { get; set; }
        public string adTimeIns { get; set; }
        public int anUserIns { get; set; }
        public string adTimeChg { get; set; }
        public int anUserChg { get; set; }
        public string acNote { get; set; }
        public string acFieldSA { get; set; }
        public string acFieldSB { get; set; }
        public string acFieldSC { get; set; }
        public string acFieldSD { get; set; }
        public string acFieldSE { get; set; }
        public string acFieldSF { get; set; }
        public string acFieldSG { get; set; }
        public string acFieldSH { get; set; }
        public string acFieldSI { get; set; }
        public string acFieldSJ { get; set; }
        public decimal anFieldNA { get; set; }
        public decimal anFieldNB { get; set; }
        public decimal anFieldNC { get; set; }
        public decimal anFieldND { get; set; }
        public decimal anFieldNE { get; set; }
        public decimal anFieldNF { get; set; }
        public decimal anFieldNG { get; set; }
        public decimal anFieldNH { get; set; }
        public decimal anFieldNI { get; set; }
        public decimal anFieldNJ { get; set; }
        public string adFieldDA { get; set; }
        public string adFieldDB { get; set; }
        public string adFieldDC { get; set; }
        public string adFieldDD { get; set; }
        public string acActive { get; set; }
        public int anSeqNo { get; set; }
        public string acInsertedFrom { get; set; }

        public AssetListing(int anQId_, string acType_, string acItem_, string acLocation_, string acCode_, string acECD_, string acName_, string acName2_, string adDateOfACQ_, string adDateOfACT_, string adDateOfLIQ_, string adDateOfELI_, string acCareTaker_, string adTimeIns_, int anUserIns_, string adTimeChg_, int anUserChg_, string acNote_, string acFieldSA_, string acFieldSB_, string acFieldSC_, string acFieldSD_, string acFieldSE_, string acFieldSF_, string acFieldSG_, string acFieldSH_, string acFieldSI_, string acFieldSJ_, decimal anFieldNA_, decimal anFieldNB_, decimal anFieldNC_, decimal anFieldND_, decimal anFieldNE_, decimal anFieldNF_, decimal anFieldNG_, decimal anFieldNH_, decimal anFieldNI_, decimal anFieldNJ_, string adFieldDA_, string adFieldDB_, string adFieldDC_, string adFieldDD_, string acActive_, int anSeqNo_, string acInsertedFrom_)
        {
            this.anQId = anQId_;
            this.acType = acType_;
            this.acItem = acItem_;
            this.acLocation = acLocation_;
            this.acCode = acCode_;
            this.acECD = acECD_;
            this.acName = acName_;
            this.acName2 = acName2_;
            this.adDateOfACQ = adDateOfACQ_;
            this.adDateOfACT = adDateOfACT_;
            this.adDateOfLIQ = adDateOfLIQ_;
            this.adDateOfELI = adDateOfELI_;
            this.acCareTaker = acCareTaker_;
            this.adTimeIns = adTimeIns_;
            this.anUserIns = anUserIns_;
            this.adTimeChg = adTimeChg_;
            this.anUserChg = anUserChg_;
            this.acNote = acNote_;
            this.acFieldSA = acFieldSA_;
            this.acFieldSB = acFieldSB_;
            this.acFieldSC = acFieldSC_;
            this.acFieldSD = acFieldSD_;
            this.acFieldSE = acFieldSE_;
            this.acFieldSF = acFieldSF_;
            this.acFieldSG = acFieldSG_;
            this.acFieldSH = acFieldSH_;
            this.acFieldSI = acFieldSI_;
            this.acFieldSJ = acFieldSJ_;
            this.anFieldNA = anFieldNA_;
            this.anFieldNB = anFieldNB_;
            this.anFieldNC = anFieldNC_;
            this.anFieldND = anFieldND_;
            this.anFieldNE = anFieldNE_;
            this.anFieldNF = anFieldNF_;
            this.anFieldNG = anFieldNG_;
            this.anFieldNH = anFieldNH_;
            this.anFieldNI = anFieldNI_;
            this.anFieldNJ = anFieldNJ_;
            this.adFieldDA = adFieldDA_;
            this.adFieldDB = adFieldDB_;
            this.adFieldDC = adFieldDC_;
            this.adFieldDD = adFieldDD_;
            this.acActive = acActive_;
            this.anSeqNo = anSeqNo_;
            this.acInsertedFrom = acInsertedFrom_;
        }
    }
}
