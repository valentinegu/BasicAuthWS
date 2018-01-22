"use strict";

var soap = require('soap');
var http = require('http');
var fs = require('fs');

var service = {
	ws: {
		authWS: {
			auth : function(args) {
				console.log('name:',args.name,', pass:',args.pass);
				if (args.name === 'user' && args.pass === 'pass' ) {
					var res=1 ;
					var otp=Math.round(Math.random()*1000000);
					var token=Math.round(Math.random()*1000000)
					console.log('Token:',token,', otp:',otp );
					fs.writeFile('./token_'+token, otp, function(error) {
						if (error) { console.error("write error:  " + error.message); }
					});
				} else {
					var res=0 ;
				}
				console.log('Auth res:',res);
				return { authres : res, token : 1 };
			},
			otp : function(args) {
				if ( fs.existsSync('./token_'+args.token) && fs.readFileSync('./token_'+args.token, 'utf8') === args.otp ) {
					var res=1;
					fs.unlinkSync('./token_'+args.token);
				} else { var res=0; }
				console.log('token:',args.token,', otp:',args.otp,', res:',res);
				return { otpres : res  };
			}
		}
	}
};

var xml = fs.readFileSync('auth.wsdl', 'utf8');

var server = http.createServer(function(request,response) {
	response.end("404: Not Found: "+request.url);
});

server.listen(process.env.PORT || 8080, function(){ console.log('Node.js app is listening on port:', this.address().port) })
soap.listen(server, '/auth', service, xml);

