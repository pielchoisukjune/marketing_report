var fs = require( "fs" );



var a = "aaaaaaaaa" + "\n";
	a += "aaaaaaaaa" + "\n";
	a += "aaaaaaaaa" + "\n";
	a += "aaaaaaaaa" + "\n";
	a += "aaaaaaaaa" + "\n";
	a += "aaaaaaaaa" + "\n";

fs.writeFileSync( "a.html", a , { flag : "w"})