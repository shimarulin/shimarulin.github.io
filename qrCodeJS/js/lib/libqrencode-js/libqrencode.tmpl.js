/*
 * Libqrencode port to JavaScript
 * https://github.com/lymar/libqrencode-js
 *
 * Copyright (c) Kentaro Fukuchi <kentaro@fukuchi.org> (original Libqrencode)
 * Copyright (c) Sergey Lymar <sergey.lymar@gmail.com> (port to JavaScript)
 *
 * Licensed under GNU Lesser General Public License.
 */

/**
 * {{varName}} = (function() {
 */
var qrencode = (function() {
    var libqrException = (function() {
        function libqrException(type, msg) {
            this.type = type;
            this.msg = msg;
        }
        
        libqrException.prototype.toString = function() {
            return "libqrencode exception [" + this.type + "]: " + this.msg;
        };

        return libqrException;
    })();
    
    var print = function(m) {};

    return {
        // QRencodeMode
        QR_MODE_NUM:            0,  // Numeric mode
        QR_MODE_AN:             1,  // Alphabet-numeric mode
        QR_MODE_8:              2,  // 8-bit data mode
        QR_MODE_KANJI:          3,  // Kanji (shift-jis) mode
        QR_MODE_ECI:            5,  // ECI mode
        QR_MODE_FNC1FIRST:      6,  // FNC1, first position
        QR_MODE_FNC1SECOND:     7,  // FNC1, second position
        // QRecLevel
        QR_ECLEVEL_L:           0,  // lowest
        QR_ECLEVEL_M:           1,
        QR_ECLEVEL_Q:           2,
        QR_ECLEVEL_H:           3,  // highest
        
        "libqrException":       libqrException,
        
        encodeString:
    
function(str, version, level, mode, caseSensitive) {

var locQre = 
(function(Module, args) {
    Module = Module || {};
    Module.arguments = args || [];
    
{{genCode}}

    delete Module['run'];
    
    Module._curOut = '';
    FS.init(null, function(v) { 
        if ( v != null )
            Module._curOut += String.fromCharCode(v); 
        });

    Module._libmain = function(argList) {
        Module._curOut = '';
        run(argList);
        return Module._curOut.split('\n');        
    };
    
    Module._JSLibEncodeStr = function(s) {
        t = unescape(encodeURIComponent(s));
        rst = '';
        for ( var i = 0; i < t.length; i++ ) {
            c = t.charCodeAt(i).toString(16);
            if ( c.length == 1 )
                rst += '0' + c;
            else
                rst += c;
        }
        return rst;
    };
    
    Module.encodeString = function(str, version, level, mode, caseSensitive) {
        var r = Module._libmain(["encodeString", 
            Module._JSLibEncodeStr(str), version.toString(), level.toString(), 
            mode.toString(), caseSensitive ? "1" : "0"]);
        
        if ( r[0] == "OK" ) {
            var w = parseInt(r[1]);
            var res = [];
            for ( var i = 0; i < w; i++ ) {
                var str = [];
                for ( var j = 0; j < w; j++ )
                    str.push(r[2].charAt(j * w + i) == '1' ? true : false);
                res.push(str);
            }
            return res;
        }
        else {
            if ( r[0] == "error" )
                throw new libqrException(r[1], r[2]);
            throw new libqrException("unknown", r.toString());
        }
    };

    return Module;
}).call(this);
    
    return locQre.encodeString(str, version, level, mode, caseSensitive);
    }
}})();
