//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;
var fs = require( "fs" );

//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;
var result_path = "./00_varihpoe/"
var FILE_PATH = result_path + "data.json";
var THTML_PATHS = {
	cards : "./THTML/card.thtml"
	, ads_total : "./THTML/ads_total.thtml"
    , insight : "./THTML/insight.thtml"
    , report : "./THTML/report.thtml"
	, statistic : "./THTML/statistic.thtml"
	, location : "./THTML/location.thtml"
	, kols : "./THTML/kols.thtml"
};
var brand_nm = "VARIL:HOPE";
var target_year_month = "202006";
var target_month = Number( target_year_month.substr( 4,2 ) ).toString();
var thumnail_icon = {
	"뷰티유튜버" : "red youtube"
	,"페이스북그룹" : "blue facebook square"
	,"페이스북" : "blue facebook square"
	,"인스타그램" : "red instagram"
	,"언론사노출" : "red newspaper outline"	
	,"언론사 노출" : "red newspaper outline"	
};
//-------------------------------------------------------;
// FILEPATH;
//-------------------------------------------------------;
var data = JSON.parse( fs.readFileSync( FILE_PATH ).toString() );
var cards_thtml = fs.readFileSync( THTML_PATHS[ "cards" ] ).toString();
var insight_thtml = fs.readFileSync( THTML_PATHS[ "insight" ] ).toString();
var statistic_thtml = fs.readFileSync( THTML_PATHS[ "statistic" ] ).toString();
var report_thtml = fs.readFileSync( THTML_PATHS[ "report" ] ).toString();
var location_thtml = fs.readFileSync( THTML_PATHS[ "location" ] ).toString();
var ads_total_thtml = fs.readFileSync( THTML_PATHS[ "ads_total" ] ).toString();
var kols_thtml = fs.readFileSync( THTML_PATHS[ "kols" ] ).toString();

//-------------------------------------------------------;
// FUNCTION;
//-------------------------------------------------------;

var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//-------------------------------------------------------;
//마케팅리스트카드생성;
//-------------------------------------------------------;
var make_card_html = function( arr, html ){
	var i = 0,iLen = arr.length,io;
	var r = "";
	var _html;

	var view_col = `<tr>
	<td><span class="font12px"><i class="eye icon"></i>View</span></td>
	<td><span class="font12px"><!=CNT_VIEW=!></span></td>
	</tr>`;
	var click_col = `<tr>
	<td><span class="font12px"><i class="hand point down outline icon"></i>Click</span></td>
	<td><span class="font12px"><!=CNT_CLICK=!></span><br></td>
	</tr>`;
	var comment_col = `<tr>
	<td><span class="font12px"><i class="comment icon"></i>Comment</span></td>
	<td><span class="font12px"><!=CNT_COMMENT=!></span></td>
	</tr>`;
	var like_col = `<tr>
	<td><span class="font12px"><i class="heart icon"></i>Like</span></td>
	<td><span class="font12px"><!=CNT_LIKE=!></span></td>
	</tr>`;
	var share_col = `<tr>
	<td><span class="font12px"><i class="share alternate icon"></i>Share</span></td>
	<td><span class="font12px"><!=CNT_SHARE=!></span></td>
	</tr>`;
	var update_col = `<tr>
	<td><span class="font12px"><i class="calendar alternate alternate icon"></i>Update Date</span></td>
	<td><span class="font12px"><!=DATE=!></span></td>
	</tr>`;

	var thumb = `<img class="ads_list_thumb" src="<!=THUMBNAIL=!>" style='max-height : 400px;'></img>`;
	var iframe = `<iframe src="https://www.facebook.com/plugins/video.php?height=266&href=<!=FB_URL=!>&show_text=0"  height="266" style="border:none;overflow:hidden;min-height:266px;" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>`;
	
	for(;i<iLen;i++){
		io = arr[ i ];
		_html = "";
		var bigo = "";
		if( io[ "비고" ] ) bigo = io[ "비고" ];

		var _update_col = "";
		var _share_col = "";
		var _like_col = "";
		var _comment_col = "";
		var _click_col = "";
		var _view_col = "";

		if( io[ "업데이트날짜" ] ) _update_col = update_col.replace( "<!=DATE=!>", io[ "업데이트날짜" ] )
		if( io[ "조회건수" ] ) _view_col = view_col.replace( "<!=CNT_VIEW=!>", numberWithCommas( io[ "조회건수" ] ) )
		if( io[ "클릭률" ] ) _click_col = click_col.replace( "<!=CNT_CLICK=!>", numberWithCommas( io[ "클릭률" ] ) )
		if( io[ "댓글수" ] ) _comment_col = comment_col.replace( "<!=CNT_COMMENT=!>", numberWithCommas( io[ "댓글수" ] ) )
		if( io[ "좋아요" ] ) _like_col = like_col.replace( "<!=CNT_LIKE=!>", numberWithCommas( io[ "좋아요" ] ) )
		if( io[ "공유" ] ) _share_col = share_col.replace( "<!=CNT_SHARE=!>", numberWithCommas( io[ "공유" ] ) )
		
		var thumb_url = thumb.replace( "<!=THUMBNAIL=!>", io[ "이미지" ] );
		var iframe_url = "";

		if( io[ "구분" ] == "인스타그램" )
		{
			thumb_url = thumb.replace( "<!=THUMBNAIL=!>", io[ "해당링크" ] +  "media/?size=l" );
		}
		
		
		if( io[ "이미지" ].indexOf( "<iframe" ) != -1 )
		{
			//iframe_url = iframe.replace( "<!=FB_URL=!>", io[ "해당링크" ] )
			iframe_url = io[ "이미지" ];
			thumb_url = "";
		}

		_html = html.replace( "<!=THUMNAIL_CONTENTS=!>", thumb_url )
			.replace( "<!=IFRAME_CONTENTS=!>", iframe_url )
			.replace( "<!=CATEGORY=!>", io[ "구분" ] )
			.replace( "<!=COMMENT=!>", bigo )
			.replace( "<!=LINK=!>", io[ "해당링크" ] )
			.replace( "<!=TITLE=!>", io[ "제목" ] )
			.replace( "<!=CATE_ICON=!>", thumnail_icon[ io[ "구분" ] ] )
			.replace( "<!=DATE=!>", _update_col )
			.replace( "<!=CNT_VIEW=!>", _view_col )
			.replace( "<!=CNT_CLICK=!>", _click_col )
			.replace( "<!=CNT_COMMENT=!>", _comment_col )
			.replace( "<!=CNT_LIKE=!>", _like_col )
			.replace( "<!=CNT_SHARE=!>", _share_col );

		r += _html + "\n"
	}

	return r;
};

//-------------------------------------------------------;
//마케팅리스트카드생성;
//-------------------------------------------------------;
/*
"월": "6",
"이름": "Hà Linh Offical",
"이미지": "https://yt3.ggpht.com/a/AATXAJx5n80WYaNJwBdvuFiRhHPgIqU0MdTbGYhfcPDrbQ",
"유튜브": "https://www.youtube.com/channel/UCtk8xBUlNL_kleByMYNjsMg",
"페이스북": "",
"성별": "여",
"구분": "Beauty blogger",
"팔로워": "290000",
"비고": "단독 사용후기 동영상 제작 유튜버 업로드, 개인 페이스북 게시물 공유",
"계약내용": "",
"금액": "25,000,000",
"데모받는날짜": "6월15일",
"업로드날짜": "6월17일"
*/
var gender_icon = {
	"남" : "blue mars stroke vertical"
	, "여" : "red venus"
}
var make_kols_html = function( arr, html ){
	var i = 0,iLen = arr.length,io;
	var r = "";
	var _html;

	var facebook_icon_html = `<span><a href="<!=LINK=!>" target="_blank"><i class="blue facebook square icon"></i></a></span>`;
	var youtube_icon_html = `<span><a href="<!=LINK=!>" target="_blank"><i class="red youtube icon"></i></a></span>`;
	var instagram_icon_html = `<span><a href="<!=LINK=!>" target="_blank"><i class="red instagram icon"></i></a></span>`;

	var thumb = `<img src="<!=THUMBNAIL=!>"></img>`;
	
	for(;i<iLen;i++){
		io = arr[ i ];
		_html = "";
	
		var _facebook_icon_html = "";
		var _youtube_icon_html = "";
		var _instagram_icon_html = "";

		if( io[ "페이스북" ] != "" ) _facebook_icon_html = facebook_icon_html.replace( "<!=LINK=!>", io[ "페이스북" ] );
		if( io[ "유튜브" ] != "" ) _youtube_icon_html = youtube_icon_html.replace( "<!=LINK=!>", io[ "유튜브" ] );
		if( io[ "인스타그램" ] != "" ) _instagram_icon_html = instagram_icon_html.replace( "<!=LINK=!>", io[ "인스타그램" ] );

		var thumb_url = thumb.replace( "<!=THUMBNAIL=!>", io[ "이미지" ] );
	
		_html = html.replace( "<!=THUMNAIL_CONTENTS=!>", thumb_url )
			.replace( "<!=CATEGORY=!>", io[ "구분" ] )
			.replace( "<!=LINK=!>", io[ "유튜브" ] )
			.replace( "<!=TITLE=!>", io[ "이름" ] )
			.replace( "<!=FACEBOOK_ICON=!>", _facebook_icon_html )
			.replace( "<!=YOUTUBE_ICON=!>", _youtube_icon_html )
			.replace( "<!=INSTAGRAM_ICON=!>",_instagram_icon_html )
			.replace( "<!=GENDER_ICON=!>", gender_icon[ io[ "성별" ] ] )
			.replace( "<!=FOLLOWER=!>", numberWithCommas( io[ "팔로워" ] ) );

		r += _html + "\n"
	}
	return r;
};

//-------------------------------------------------------;
//인사이트생성;
//-------------------------------------------------------;
var make_insight_html = function( contents, html ){
	var r = html.replace(/<!=TARGET_MONTH=!>/g,target_month )
				.replace( "<!=CONTENTS__00=!>", contents[ 0 ].replace(/\r/g, "<br>").replace(/\n/g, "<br>")  )
				.replace( "<!=CONTENTS__01=!>", contents[ 1 ].replace(/\r/g, "<br>").replace(/\n/g, "<br>")  )+ "\n"
	return r;
};

//-------------------------------------------------------;
//마케팅집행 통계 생성;
//-------------------------------------------------------;
var make_ads_total_statistic_html = function( o, html ){
	var r = "";
	var _html;
   
    var s,so;
	for( s in o ){
		so = o[ s ];
		_html = html.replace( "<!=LABEL=!>", s  )
			.replace( "<!=VALUE=!>", numberWithCommas( so )  );
		r += _html + "\n"
	}
	return r;
};

//-------------------------------------------------------;
//페이스북전체통계 생성;
//-------------------------------------------------------;
var make_statistic_html = function( arr, html ){
	var i = 0,iLen = arr.length,io;
	var r = "";
	var _html;
    var use_label = [
        "도달 (명)"
        , "노출 수 (회)"
        //, "회수 (번)"
        //, "지출 금액(동)"
        //, "페이지 참여(번)"
        , "게시물 참여(번)"
        , "게시물 댓글 (개)"
        , "게시물 반응"
        , "페이지 좋아요"
        //, "동영상 50% 보기"
        //, "동영상 100% 보기"
        //, "새로운 메시지 연결"
        //, "새로운 메시지 한번 연결에 금액"
    ]
    for(;i<iLen;i++){
		io = arr[ i ];
        _html = "";
        
        var s,so;
        for( s in io ){
            so = io[ s ];
            if( use_label.indexOf( s ) != -1 )
            {
                _html = html.replace( "<!=LABEL=!>", s  )
                    .replace( "<!=VALUE=!>", numberWithCommas( so ) );
                r += _html + "\n"
            }
        }
	}
	return r;
};

//-------------------------------------------------------;
//페이스북연령통계 생성;
//-------------------------------------------------------;
var make_ages_data = function( arr ){
	var i = 0,iLen = arr.length,io;
	var r = {
        d00 : []
        , d01 : []
        , d02 : []
        , d03 : []
    };

	/*
	"연령": "18-24",
	"도달": "1030656",
	"노출 수": "1,797,895",
	"회수": "2",
	"지출 금액\n (VND)": "29,617,651",
	"페이지 참여": "236,171",
	"게시물 참여": "234,937",
	"게시물 댓글": "96",
	"게시물 반응": "8145",
	"페이지 좋아요": "1235",
	"동영상 50% 시간 보기": "142150",
	"동영상 100% 보기": "102598",
	"새로운 메시지 연결": "134"
	*/
    for(;i<iLen;i++){
		io = arr[ i ];
        var o00 = {"ages" : io[ "연령" ], value : Number( io[ "도달" ] )};
        var o01 = {"ages" : io[ "연령" ], value : Number(io[ "노출 수" ] )};
        var o02 = {"ages" : io[ "연령" ], value : Number(io[ "게시물 참여" ] )};
        var o03 = {"ages" : io[ "연령" ] , value : Number(io[ "페이지 좋아요" ] )};
        r.d00.push( o00 );
        r.d01.push( o01 );
        r.d02.push( o02 );
        r.d03.push( o03 );
	}
	return r;
};

//-------------------------------------------------------;
//페이스북시간별통계 생성;
//-------------------------------------------------------;
var make_time_data = function( arr ){
	var i = 0,iLen = arr.length,io;
	var r = [];
	/*
	"시간": "09:00:00 - 09:59:59",
	"노출 수": "155615",
	"회수": "",
	"지출 금액\n (VND)": "",
	"페이지 참여": "",
	"게시물 참여": "4019739.71",
	"게시물 댓글": "18567",
	"게시물 반응": "18460",
	"페이지 좋아요": "10",
	"동영상 50% 시간 보기": "524",
	"동영상 100% 보기": "107",
	"새로운 메시지 연결": "18",
	"새로운 메시지 한번 연결에 금액": "223,318.87"
	*/
    for(;i<iLen;i++){
		io = arr[ i ];
        var o00 = {"time" : io[ "시간" ], view : Number( io[ "노출 수" ] ), like : Number( io[ "페이지 좋아요" ] )};
        r.push( o00 );
	}
	return r;
};

//-------------------------------------------------------;
// 페이스북지역통계 생성;
//-------------------------------------------------------;
var make_location_data = function( arr, o ){
	
	var r = [
		['State', '도달', '노출수']
	];

	var i = 0,iLen = arr.length,io; 
	/*
		"도시": "Bắc Ninh Province",
		"도달": "39,936",
		"노출 수": "",
		"회수": "",
		"지출 금액\n (VND)": "76,464",
		"페이지 참여": "1.91",
		"게시물 참여": "1,668,903.88",
		"게시물 댓글": "20,565",
		"게시물 반응": "20,455",
		"페이지 좋아요": "7",
		"동영상 50% 시간 보기": "664",
		"동영상 100% 보기": "110",
		"새로운 메시지 연결": "3"
	*/
    for(;i<iLen;i++){
		io = arr[ i ];
        var _ta = [
			{ f : io[ "도시" ], v : o[ io[ "도시" ] ] }
			, Number( io[ "도달" ] )
			, Number( io[ "노출 수" ] )
		]
		r.push( _ta );
	}
	return r;
};

//-------------------------------------------------------;
// 펭이스북지역통계카드생성;
//-------------------------------------------------------;
var make_location_html = function( data, html ){
	var i = 1,iLen = data.length,io;
	var _html = "";
	var r = ""; 
	for(;i<iLen;i++){
		io = data[ i ];
		
		_html =  html.replace( "<!=city=!>" , io[0].f )
		.replace( "<!=reach=!>" , numberWithCommas( io[1] ) )
		.replace( "<!=view=!>" , numberWithCommas ( io[2] ) );
		r += _html + "\n";
		
	}
	return r;
};

var logic = function(){
    var _cards_html = make_card_html( data.ads_list[ target_month ], cards_thtml );
    var _insight_html = make_insight_html( data.insight[ target_month ], insight_thtml, "5" );
    var _statistic_html = make_statistic_html( data.total[ target_month ], statistic_thtml );
	var _ads_total_statistic_html = make_ads_total_statistic_html( data.ads_total[ target_month ], ads_total_thtml );
	var _kols_html = make_kols_html( data.kols[ target_month ], kols_thtml );
	
    var ages_data = make_ages_data( data.ages[ target_month ] );
    var time_data = make_time_data( data.time[ target_month ] );
    var location_data = make_location_data( data.location[ target_month ],data.geocode );

	var _location_html = make_location_html( location_data, location_thtml );

    var report_html = report_thtml.replace(/<!=BRAND_NM=!>/g,brand_nm )
		.replace( /<!=TARGET_MONTH=!>/g,target_month )
		.replace( "<!=CARDS=!>",_cards_html)
		.replace( "<!=KOLS=!>",_kols_html)
		.replace( "<!=INSIGHT=!>",_insight_html)
		.replace( "<!=STATISTIC=!>",_statistic_html)
		.replace( "<!=AGES00_DATA=!>",JSON.stringify( ages_data.d00 ))
		.replace( "<!=AGES01_DATA=!>",JSON.stringify( ages_data.d01 ) )
		.replace( "<!=AGES02_DATA=!>",JSON.stringify( ages_data.d02 ) )
		.replace( "<!=AGES03_DATA=!>",JSON.stringify( ages_data.d03 ) )
		.replace( "<!=TIME_DATA=!>",JSON.stringify( time_data ) )
		.replace( "<!=MAP_DATA_00=!>",JSON.stringify( location_data ) )
		.replace( "<!=LOCATION_TABLE=!>", _location_html )
		.replace( "<!=STATISTIC_ADS_LIST=!>", _ads_total_statistic_html );
    
    fs.writeFileSync( result_path + target_year_month + "_marketing_report.html", report_html,{ flag : "w"})
}

logic();
