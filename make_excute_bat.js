var fs = require( "fs" );

var data = JSON.parse( fs.readFileSync( "brand.json" ).toString() );

var _fileNm_00 = "make_data_<!=BRAND_NM=!>"
var _fileNm_01 = "make_html_<!=BRAND_NM=!>"
var _fileNm_03 = "All_<!=BRAND_NM=!>"
var fileNm_00;
var fileNm_01;
var fileNm_03;

var _bat = `::@Echo off
<!=EXEC_COMMAND=!>

cmd/k
`;
var bat00,bat01,bat03;
var fsWriteOption = { falg : "w" };
var i = 0,iLen = data.brand.length,io;
for(;i<iLen;++i){
    io = data.brand[ i ];
    fileNm_00 = _fileNm_00.replace( "<!=BRAND_NM=!>", io );
    bat00 =  _bat.replace( "node <!=EXEC_COMMAND=!>", fileNm_00 + ".js" );
    fs.writeFileSync( "./" + fileNm_00 + ".bat", bat00, fsWriteOption )

    fileNm_01 = _fileNm_01.replace( "<!=BRAND_NM=!>", io );
    bat01 =  _bat.replace( "node <!=EXEC_COMMAND=!>", fileNm_01 + ".js" );
    fs.writeFileSync( "./" + fileNm_01 + ".bat", bat01, fsWriteOption )

    fileNm_03 = _fileNm_03.replace( "<!=BRAND_NM=!>", io );
    
    var all_command = "call node " + fileNm_00 + ".js\n"
        + "call node " + fileNm_01 + ".js\n";
    
    bat03 =  _bat.replace( "<!=EXEC_COMMAND=!>",  all_command );
    fs.writeFileSync( "./" + fileNm_03 + ".bat", bat03, fsWriteOption )

}