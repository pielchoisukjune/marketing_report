const fs = require('fs');
const readline = require('readline');
const google = require('googleapis').google;

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

try
{
	var credentail = JSON.parse( fs.readFileSync('credentials.json' ).toString() );
}
catch(e)
{
	console.log('Error loading client secret file:', e);
	return;
}


//구글계정인증;
var  authorize = function( credentials, callback ){
	console.log( "[s] - authorize();" )
	const client_secret = credentials.installed.client_secret;
	const client_id = credentials.installed.client_id;
	const redirect_uris = credentials.installed.redirect_uris;
	const oAuth2Client = new google.auth.OAuth2( client_id, client_secret, redirect_uris[0] );

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, function(err, token){
		if (err) return getNewToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token));
		console.log( "[e] - authorize();" )
		callback(oAuth2Client);
	});
}

//구글계정인증실패시 토큰재생성;
var getNewToken = function getNewToken( oAuth2Client, callback ){
	console.log( "[s] - getNewToken();" )
	var authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
	console.log('Authorize this app by visiting this url : ', authUrl);

	var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

	rl.question('Enter the code from that page here: ', function(code){
	  rl.close();
	  oAuth2Client.getToken(code, (err, token) => {
		if (err) return console.error('Error while trying to retrieve access token', err);
		oAuth2Client.setCredentials(token);

		// Store the token to disk for later program executions
		fs.writeFileSync(TOKEN_PATH, JSON.stringify(token),{ flag : "w"} );
		console.log( "[e] - getNewToken();" )
		callback( oAuth2Client );
	  });
	});
  }


var pad = function(n, width){
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}


var date_format_YYYYMMDD = function( date ){
	date  = date || new Date();

	var r;
	var YYYY = date.getFullYear();
	var MM = pad( date.getMonth(), 2 );
	var DD = pad( date.getDate(), 2 );
	r = YYYY + MM + DD;
	return r;

}

var result_path = "./brand/dewytree/";
var spreadsheetId = "1Vuf7pGTgOTpXVu6Lxq9g8HVLCkgCezL4HB62p_po7sA";
var OPTIONS = {
	FUNC00 : {
		spreadsheetId : spreadsheetId
		, range : '마케팅집행리스트!A:M'
	}
}

var target_month = "6";
var target_brand = "DEWYTREE"

var d = [];
var _html = '<!=IFRAME=!>'
	+ '<!=IMG_SRC=!>'
	+ '<p><strong><!=NM_BRAND=!></strong></p>'
	+ '<p><!=DATE=!></p>'
	+ '<p><!=TITLE=!></p>'
	+ '<p><!=TYPE=!></p>'
	+ '<p><a class="btn btn-primary" href="<!=LINK=!>" rel="noopener noreferrer" target="_blank">컨텐츠확인</a></p>';

//-------------------------------------------------------;
// FUNCTION;
//-------------------------------------------------------;

var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var FUNC00 = function( auth ){

	var key = "FUNC00"

	console.log( "[ S ] - FUNC00();" )

	google.sheets({version: 'v4', auth}).spreadsheets.values.get( OPTIONS[ key ], function(err, res){
		if (err) return console.log('The API returned an error: ' + err);
		const rows = res.data.values;
		if (rows.length == 0 ) return console.log( key + ' -- No data found.');

		var i = 0,iLen = rows.length,io;
		var _header = [];
		for(;i<iLen;++i){
			io = rows[ i ];
			if( i == 0 )
			{
				io.forEach(function( item ){ _header.push( item ) });
				//console.log( _header )
			}
			else
			{
				var z = 0,zLen = io.length,zo;
				var o = {};
				if( io[ 0 ] == target_month )
				{
					for(;z<zLen;++z){
						zo = io[ z ];
						o[ _header[ z ] ] = zo.trim();
					}
					d.push( o );
				}
			}
		}
		console.log( "[ E ] - FUNC00();" )

		FUNC01( d );
	});
}

/*
    {
        "월": "6",
        "구분": "페이스북",
        "업데이트날짜": "01/06/2020",
        "타입": "컨텐츠 (이미지) : 본사 미러링",
        "제목": "Chỉ cần sử dụng trước khi ngủ, những vấn đề về da của bạn sẽ được cải thiện ngay. 🤗",
        "게시물 타입": "Image",
        "이미지": "<iframe src=\"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fdewytree.vn%2Fvideos%2F663424527840925%2F&show_text=0&width=476\" width=\"476\" height=\"476\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allowFullScreen=\"true\"></iframe>",
        "해당링크": "https://facebook.com/dewytree.vn/videos/663424527840925/?__xts__%5B0%5D=68.ARCMgGPapSkn9UA6UwGE2HbTrButqr3gdSsRfWt7sNFbfA7Nxld2QXkiXqR93uhX7WiiMEOiaB6Ik9a0s2YGaf3twcewVA7B-OsSeDp283Xp8rcpT-5p8pOKh1ucNFzBFJnR1e4AET_1DtOurIa0BkFbBTY6pHVQ2xTpJKj3V5o2E093ZbWwQBQP1EdxN9iuU5nALlUCSql-5kVzWhghzVWx92N6P3ywAEvoDlg1RWuV0Olkxl5le6akdwrD9ApIXycC3p5zHysZj9Txt1q0Aq3MLqx5urxP1qRNwykS_FFMb_jbhDb-_iV5qx5oEXA4vTzXeGvc7_Erw-fNxjS3lOpjK599ZfrRLlM&__tn__=-R",
        "조회건수": "41",
        "클릭률": "",
        "댓글수": "",
        "좋아요": "1"
    },
*/
/*
var _html = '<!=IFRAME=!>'
	+ '<!=IMG_SRC=!>'
	+ '<p><strong><!=NM_BRAND=!></strong></p>'
	+ '<p><!=DATE=!></p>'
	+ '<p><!=TITLE=!></p>'
	+ '<p><!=TYPE=!></p>'
	+ '<p><a class="btn btn-primary" href="<!=LINK=!>" rel="noopener noreferrer" target="_blank">컨텐츠확인</a></p>';
*/
var category = {
	"컨텐츠 (이미지) : 본사 미러링" : "R8J30P2r27",
	"컨텐츠 (영상) : 본사 미러링 - 번역" : "221tb38785",
	"컨텐츠 (이미지) : 비나피엘 제작" : "CgP2512z7R",
	"컨텐츠 (영상) : 비나피엘 제작" : "785rDrp750",
	"SEO" : "3135b08C28",
	"리뷰" : "q1M4335573",
	"체험단 이벤트" : "1069v04058",
	"뷰티유투버" : "27326knPMq",
	"인플루언서" : "5854g1544b",
	"언론사" : "65P024TP56",
	"영상제작" : "IJrA781070"
}





var FUNC01 = function( data ){

	var key = "FUNC01"

	console.log( "[ S ] - FUNC01();" )
	
	var i = 0,iLen = data.length,io;
	var _t = "";;
	for(;i<iLen;++i){
		io = data[ i ];

		//카테고리ID;
		_t += category[ io["타입"] ] + "\t"
		//제목;
		_t += "" + io[ "구분" ] + "-" + io[ "업데이트날짜" ].split("/").reverse().join("-")+ "\t"
		//내용(HTML);
		var iframeSouece = "";
		var imgSouece = "";

		if( io[ "이미지" ].indexOf( "<iframe" ) != -1 )
		{
			iframeSouece = '<p><span class="fr-video fr-fvc fr-dvb fr-draggable fr-fvl" contenteditable="false" draggable="true">' + io[ "이미지" ] + '</span></p>'
		}
		else
		{
			if( io[ "구분" ] == "인스타그램" )
			{
				imgSouece = '<p><img src="' + io[ "이미지" ] +  'media/?size=m' + '" class="fr-fic fr-dii"></p>';
			}
			else
			{
				imgSouece = '<p><img src="' + io[ "이미지" ] + '" class="fr-fic fr-dii"></p>';
			}
		}
		
		var html = _html.replace( "<!=NM_BRAND=!>", target_brand )
			.replace( "<!=DATE=!>", io[ "업데이트날짜" ].split("/").reverse().join("-") + " 00:00:00" )
			.replace( "<!=TITLE=!>", io[ "제목" ].replace( /\r\n/gi, " " ).replace( /\n/gi, " " ).replace( /\r/gi, " " ) )
			.replace( "<!=TYPE=!>", io[ "타입" ] )
			.replace( "<!=LINK=!>", io[ "해당링크" ] )
			.replace( "<!=IMG_SRC=!>", imgSouece )
			.replace( "<!=IFRAME=!>", iframeSouece )
		
		_t += ""
		_t += html.replace( /\r\n/gi, " " ).replace( /\n/gi, " " ).replace( /\r/gi, " " )
		_t += "\t"
		
		//작성자;
		_t += "게시물관리자\t"
		//작성시각;
		_t += "" + io[ "업데이트날짜" ].split("/").reverse().join("-") + " 00:00:00" + "\t"
		//조회수;
		_t += "" +io[ "조회건수" ] + "\t"
		//좋아요수;
		_t += "\t"
		//공지여부;
		_t += "\t"
		//비밀글;
		_t += "\t"
		//비밀번호;
		_t += "\n"

	}

	console.log( "[ E ] - FUNC01();" )
	fs.writeFileSync( result_path + "upload_data_" + date_format_YYYYMMDD() + ".txt", _t, { flag : "w"});
}

authorize( credentail, FUNC00 );
