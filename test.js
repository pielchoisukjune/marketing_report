var fs = require( "fs" );



var a = fs.readFileSync( "./THTML/report.thtml" ).toString()
var b = a
	b += "\n"
fs.writeFileSync( "a.html", b , { flag : "w"})