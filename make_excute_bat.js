var fs = require( "fs" );

var data = JSON.parse( fs.readFileSync( "brand.json" ).toString() );

var _fileNm_00 = "00_<!=BRAND_NM=!>_make_data"
var _fileNm_01 = "01_<!=BRAND_NM=!>_make_html"
var fileNm_00;
var fileNm_01;

var _bat = `::@Echo off
node .\\<!=EXEC_COMMAND=!>

cmd/k
`;
var bat00,bat01;
var fsWriteOption = { falg : "w" };
var i = 0,iLen = data.brand.length,io;
for(;i<iLen;++i){
    io = data.brand[ i ];
    fileNm_00 = _fileNm_00.replace( "<!=BRAND_NM=!>", io );
    bat00 =  _bat.replace( "<!=EXEC_COMMAND=!>", fileNm_00 + ".js" );
    fs.writeFileSync( "./" + fileNm_00 + ".bat", bat00, fsWriteOption )

    fileNm_01 = _fileNm_01.replace( "<!=BRAND_NM=!>", io );
    bat01 =  _bat.replace( "<!=EXEC_COMMAND=!>", fileNm_01 + ".js" );
    fs.writeFileSync( "./" + fileNm_01 + ".bat", bat01, fsWriteOption )
}