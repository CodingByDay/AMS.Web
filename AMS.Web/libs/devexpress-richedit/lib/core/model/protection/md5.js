export class MD5 {
    constructor() {
        this._t = [-680876936, -389564586, 606105819, -1044525330, -176418897, 1200080426, -1473231341, -45705983, 1770035416, -1958414417,
            -42063, -1990404162, 1804603682, -40341101, -1502002290, 1236535329, -165796510, -1069501632, 643717713, -373897302, -701558691,
            38016083, -660478335, -405537848, 568446438, -1019803690, -187363961, 1163531501, -1444681467, -51403784, 1735328473, -1926607734,
            -378558, -2022574463, 1839030562, -35309556, -1530992060, 1272893353, -155497632, -1094730640, 681279174, -358537222, -722521979,
            76029189, -640364487, -421815835, 530742520, -995338651, -198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606,
            -1051523, -2054922799, 1873313359, -30611744, -1560198380, 1309151649, -145523070, -1120210379, 718787259, -343485551];
    }
    computeHashCore(words) {
        const T = this._t;
        const offset = 0;
        for (let i = 0; i < 16; i++) {
            const offset_i = offset + i;
            const M_offset_i = words[offset_i];
            words[offset_i] = ((((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) |
                (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00));
        }
        const H = this._hash;
        const M_offset_0 = words[offset + 0];
        const M_offset_1 = words[offset + 1];
        const M_offset_2 = words[offset + 2];
        const M_offset_3 = words[offset + 3];
        const M_offset_4 = words[offset + 4];
        const M_offset_5 = words[offset + 5];
        const M_offset_6 = words[offset + 6];
        const M_offset_7 = words[offset + 7];
        const M_offset_8 = words[offset + 8];
        const M_offset_9 = words[offset + 9];
        const M_offset_10 = words[offset + 10];
        const M_offset_11 = words[offset + 11];
        const M_offset_12 = words[offset + 12];
        const M_offset_13 = words[offset + 13];
        const M_offset_14 = words[offset + 14];
        const M_offset_15 = words[offset + 15];
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        a = this.FF(a, b, c, d, M_offset_0, 7, T[0]);
        d = this.FF(d, a, b, c, M_offset_1, 12, T[1]);
        c = this.FF(c, d, a, b, M_offset_2, 17, T[2]);
        b = this.FF(b, c, d, a, M_offset_3, 22, T[3]);
        a = this.FF(a, b, c, d, M_offset_4, 7, T[4]);
        d = this.FF(d, a, b, c, M_offset_5, 12, T[5]);
        c = this.FF(c, d, a, b, M_offset_6, 17, T[6]);
        b = this.FF(b, c, d, a, M_offset_7, 22, T[7]);
        a = this.FF(a, b, c, d, M_offset_8, 7, T[8]);
        d = this.FF(d, a, b, c, M_offset_9, 12, T[9]);
        c = this.FF(c, d, a, b, M_offset_10, 17, T[10]);
        b = this.FF(b, c, d, a, M_offset_11, 22, T[11]);
        a = this.FF(a, b, c, d, M_offset_12, 7, T[12]);
        d = this.FF(d, a, b, c, M_offset_13, 12, T[13]);
        c = this.FF(c, d, a, b, M_offset_14, 17, T[14]);
        b = this.FF(b, c, d, a, M_offset_15, 22, T[15]);
        a = this.GG(a, b, c, d, M_offset_1, 5, T[16]);
        d = this.GG(d, a, b, c, M_offset_6, 9, T[17]);
        c = this.GG(c, d, a, b, M_offset_11, 14, T[18]);
        b = this.GG(b, c, d, a, M_offset_0, 20, T[19]);
        a = this.GG(a, b, c, d, M_offset_5, 5, T[20]);
        d = this.GG(d, a, b, c, M_offset_10, 9, T[21]);
        c = this.GG(c, d, a, b, M_offset_15, 14, T[22]);
        b = this.GG(b, c, d, a, M_offset_4, 20, T[23]);
        a = this.GG(a, b, c, d, M_offset_9, 5, T[24]);
        d = this.GG(d, a, b, c, M_offset_14, 9, T[25]);
        c = this.GG(c, d, a, b, M_offset_3, 14, T[26]);
        b = this.GG(b, c, d, a, M_offset_8, 20, T[27]);
        a = this.GG(a, b, c, d, M_offset_13, 5, T[28]);
        d = this.GG(d, a, b, c, M_offset_2, 9, T[29]);
        c = this.GG(c, d, a, b, M_offset_7, 14, T[30]);
        b = this.GG(b, c, d, a, M_offset_12, 20, T[31]);
        a = this.HH(a, b, c, d, M_offset_5, 4, T[32]);
        d = this.HH(d, a, b, c, M_offset_8, 11, T[33]);
        c = this.HH(c, d, a, b, M_offset_11, 16, T[34]);
        b = this.HH(b, c, d, a, M_offset_14, 23, T[35]);
        a = this.HH(a, b, c, d, M_offset_1, 4, T[36]);
        d = this.HH(d, a, b, c, M_offset_4, 11, T[37]);
        c = this.HH(c, d, a, b, M_offset_7, 16, T[38]);
        b = this.HH(b, c, d, a, M_offset_10, 23, T[39]);
        a = this.HH(a, b, c, d, M_offset_13, 4, T[40]);
        d = this.HH(d, a, b, c, M_offset_0, 11, T[41]);
        c = this.HH(c, d, a, b, M_offset_3, 16, T[42]);
        b = this.HH(b, c, d, a, M_offset_6, 23, T[43]);
        a = this.HH(a, b, c, d, M_offset_9, 4, T[44]);
        d = this.HH(d, a, b, c, M_offset_12, 11, T[45]);
        c = this.HH(c, d, a, b, M_offset_15, 16, T[46]);
        b = this.HH(b, c, d, a, M_offset_2, 23, T[47]);
        a = this.II(a, b, c, d, M_offset_0, 6, T[48]);
        d = this.II(d, a, b, c, M_offset_7, 10, T[49]);
        c = this.II(c, d, a, b, M_offset_14, 15, T[50]);
        b = this.II(b, c, d, a, M_offset_5, 21, T[51]);
        a = this.II(a, b, c, d, M_offset_12, 6, T[52]);
        d = this.II(d, a, b, c, M_offset_3, 10, T[53]);
        c = this.II(c, d, a, b, M_offset_10, 15, T[54]);
        b = this.II(b, c, d, a, M_offset_1, 21, T[55]);
        a = this.II(a, b, c, d, M_offset_8, 6, T[56]);
        d = this.II(d, a, b, c, M_offset_15, 10, T[57]);
        c = this.II(c, d, a, b, M_offset_6, 15, T[58]);
        b = this.II(b, c, d, a, M_offset_13, 21, T[59]);
        a = this.II(a, b, c, d, M_offset_4, 6, T[60]);
        d = this.II(d, a, b, c, M_offset_11, 10, T[61]);
        c = this.II(c, d, a, b, M_offset_2, 15, T[62]);
        b = this.II(b, c, d, a, M_offset_9, 21, T[63]);
        H[0] = (H[0] + a) | 0;
        H[1] = (H[1] + b) | 0;
        H[2] = (H[2] + c) | 0;
        H[3] = (H[3] + d) | 0;
    }
    FF(a, b, c, d, x, s, t) {
        const n = a + ((b & c) | (~b & d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }
    GG(a, b, c, d, x, s, t) {
        const n = a + ((b & d) | (c & ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }
    HH(a, b, c, d, x, s, t) {
        const n = a + (b ^ c ^ d) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }
    II(a, b, c, d, x, s, t) {
        const n = a + (c ^ (b | ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }
    resetCache() {
        this._hash = [
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476
        ];
    }
    computeHash(source) {
        this.resetCache();
        const dataWords = source;
        const nBitsTotal = source.length * 4 * 8;
        const nBitsLeft = source.length * 4 * 8;
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        const nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
        const nBitsTotalL = nBitsTotal;
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = ((((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00));
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = ((((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00));
        this.computeHashCore(dataWords);
        const hash = this._hash;
        for (let i = 0; i < 4; i++) {
            const H_i = hash[i];
            hash[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) |
                (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
        }
        return hash;
    }
}
