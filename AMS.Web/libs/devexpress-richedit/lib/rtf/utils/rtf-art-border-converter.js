import { BorderLineStyle } from '../../core/model/borders/enums';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
export class RtfArtBorderConverter {
    static getBorderArtIndex(borderLineStyle) {
        const result = RtfArtBorderConverter.mapBorderLineStyleToIndex[borderLineStyle];
        return result !== undefined ? result : 0;
    }
    static getBorderLineStyle(borderArtIndex) {
        const result = RtfArtBorderConverter.mapIndexToBorderLineStyle[borderArtIndex];
        return result !== undefined ? result : BorderLineStyle.None;
    }
    static initStatics() {
        const lineStyles = [
            BorderLineStyle.Apples,
            BorderLineStyle.ArchedScallops,
            BorderLineStyle.BabyPacifier,
            BorderLineStyle.BabyRattle,
            BorderLineStyle.Balloons3Colors,
            BorderLineStyle.BalloonsHotAir,
            BorderLineStyle.BasicBlackDashes,
            BorderLineStyle.BasicBlackDots,
            BorderLineStyle.BasicBlackSquares,
            BorderLineStyle.BasicThinLines,
            BorderLineStyle.BasicWhiteDashes,
            BorderLineStyle.BasicWhiteDots,
            BorderLineStyle.BasicWhiteSquares,
            BorderLineStyle.BasicWideInline,
            BorderLineStyle.BasicWideMidline,
            BorderLineStyle.BasicWideOutline,
            BorderLineStyle.Bats,
            BorderLineStyle.Birds,
            BorderLineStyle.BirdsFlight,
            BorderLineStyle.Cabins,
            BorderLineStyle.CakeSlice,
            BorderLineStyle.CandyCorn,
            BorderLineStyle.CelticKnotwork,
            BorderLineStyle.CertificateBanner,
            BorderLineStyle.ChainLink,
            BorderLineStyle.ChampagneBottle,
            BorderLineStyle.CheckedBarBlack,
            BorderLineStyle.CheckedBarColor,
            BorderLineStyle.Checkered,
            BorderLineStyle.ChristmasTree,
            BorderLineStyle.CirclesLines,
            BorderLineStyle.CirclesRectangles,
            BorderLineStyle.ClassicalWave,
            BorderLineStyle.Clocks,
            BorderLineStyle.Compass,
            BorderLineStyle.Confetti,
            BorderLineStyle.ConfettiGrays,
            BorderLineStyle.ConfettiOutline,
            BorderLineStyle.ConfettiStreamers,
            BorderLineStyle.ConfettiWhite,
            BorderLineStyle.CornerTriangles,
            BorderLineStyle.CouponCutoutDashes,
            BorderLineStyle.CouponCutoutDots,
            BorderLineStyle.CrazyMaze,
            BorderLineStyle.CreaturesButterfly,
            BorderLineStyle.CreaturesFish,
            BorderLineStyle.CreaturesInsects,
            BorderLineStyle.CreaturesLadyBug,
            BorderLineStyle.CrossStitch,
            BorderLineStyle.Cup,
            BorderLineStyle.DecoArch,
            BorderLineStyle.DecoArchColor,
            BorderLineStyle.DecoBlocks,
            BorderLineStyle.DiamondsGray,
            BorderLineStyle.DoubleD,
            BorderLineStyle.DoubleDiamonds,
            BorderLineStyle.Earth1,
            BorderLineStyle.Earth2,
            BorderLineStyle.EclipsingSquares1,
            BorderLineStyle.EclipsingSquares2,
            BorderLineStyle.EggsBlack,
            BorderLineStyle.Fans,
            BorderLineStyle.Film,
            BorderLineStyle.Firecrackers,
            BorderLineStyle.FlowersBlockPrint,
            BorderLineStyle.FlowersDaisies,
            BorderLineStyle.FlowersModern1,
            BorderLineStyle.FlowersModern2,
            BorderLineStyle.FlowersPansy,
            BorderLineStyle.FlowersRedRose,
            BorderLineStyle.FlowersRoses,
            BorderLineStyle.FlowersTeacup,
            BorderLineStyle.FlowersTiny,
            BorderLineStyle.Gems,
            BorderLineStyle.GingerbreadMan,
            BorderLineStyle.Gradient,
            BorderLineStyle.Handmade1,
            BorderLineStyle.Handmade2,
            BorderLineStyle.HeartBalloon,
            BorderLineStyle.HeartGray,
            BorderLineStyle.Hearts,
            BorderLineStyle.HeebieJeebies,
            BorderLineStyle.Holly,
            BorderLineStyle.HouseFunky,
            BorderLineStyle.Hypnotic,
            BorderLineStyle.IceCreamCones,
            BorderLineStyle.LightBulb,
            BorderLineStyle.Lightning1,
            BorderLineStyle.Lightning2,
            BorderLineStyle.MapPins,
            BorderLineStyle.MapleLeaf,
            BorderLineStyle.MapleMuffins,
            BorderLineStyle.Marquee,
            BorderLineStyle.MarqueeToothed,
            BorderLineStyle.Moons,
            BorderLineStyle.Mosaic,
            BorderLineStyle.MusicNotes,
            BorderLineStyle.Northwest,
            BorderLineStyle.Ovals,
            BorderLineStyle.Packages,
            BorderLineStyle.PalmsBlack,
            BorderLineStyle.PalmsColor,
            BorderLineStyle.PaperClips,
            BorderLineStyle.Papyrus,
            BorderLineStyle.PartyFavor,
            BorderLineStyle.PartyGlass,
            BorderLineStyle.Pencils,
            BorderLineStyle.People,
            BorderLineStyle.PeopleWaving,
            BorderLineStyle.PeopleHats,
            BorderLineStyle.Poinsettias,
            BorderLineStyle.PostageStamp,
            BorderLineStyle.Pumpkin1,
            BorderLineStyle.PushPinNote2,
            BorderLineStyle.PushPinNote1,
            BorderLineStyle.Pyramids,
            BorderLineStyle.PyramidsAbove,
            BorderLineStyle.Quadrants,
            BorderLineStyle.Rings,
            BorderLineStyle.Safari,
            BorderLineStyle.Sawtooth,
            BorderLineStyle.SawtoothGray,
            BorderLineStyle.ScaredCat,
            BorderLineStyle.Seattle,
            BorderLineStyle.ShadowedSquares,
            BorderLineStyle.SharksTeeth,
            BorderLineStyle.ShorebirdTracks,
            BorderLineStyle.Skyrocket,
            BorderLineStyle.SnowflakeFancy,
            BorderLineStyle.Snowflakes,
            BorderLineStyle.Sombrero,
            BorderLineStyle.Southwest,
            BorderLineStyle.Stars,
            BorderLineStyle.StarsTop,
            BorderLineStyle.Stars3d,
            BorderLineStyle.StarsBlack,
            BorderLineStyle.StarsShadowed,
            BorderLineStyle.Sun,
            BorderLineStyle.Swirligig,
            BorderLineStyle.TornPaper,
            BorderLineStyle.TornPaperBlack,
            BorderLineStyle.Trees,
            BorderLineStyle.TriangleParty,
            BorderLineStyle.Triangles,
            BorderLineStyle.Tribal1,
            BorderLineStyle.Tribal2,
            BorderLineStyle.Tribal3,
            BorderLineStyle.Tribal4,
            BorderLineStyle.Tribal5,
            BorderLineStyle.Tribal6,
            BorderLineStyle.TwistedLines1,
            BorderLineStyle.TwistedLines2,
            BorderLineStyle.Vine,
            BorderLineStyle.Waveline,
            BorderLineStyle.WeavingAngles,
            BorderLineStyle.WeavingBraid,
            BorderLineStyle.WeavingRibbon,
            BorderLineStyle.WeavingStrips,
            BorderLineStyle.WhiteFlowers,
            BorderLineStyle.Woodwork,
            BorderLineStyle.XIllusions,
            BorderLineStyle.ZanyTriangles,
            BorderLineStyle.ZigZag,
            BorderLineStyle.ZigZagStitch
        ];
        RtfArtBorderConverter.mapBorderLineStyleToIndex = {};
        RtfArtBorderConverter.mapIndexToBorderLineStyle = {};
        ListUtils.forEach(lineStyles, (ls, i) => {
            RtfArtBorderConverter.mapBorderLineStyleToIndex[ls] = i + 1;
            RtfArtBorderConverter.mapIndexToBorderLineStyle[i + 1] = ls;
        });
        return RtfArtBorderConverter.mapIndexToBorderLineStyle;
    }
}
RtfArtBorderConverter.mapIndexToBorderLineStyle = RtfArtBorderConverter.initStatics();
