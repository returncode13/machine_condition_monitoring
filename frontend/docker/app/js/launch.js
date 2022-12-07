const htmlfile="../index.html"
const http = require('http')
const fs = require('fs')

// https://stackoverflow.com/questions/32126003/node-js-document-is-not-defined
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
global.window= new JSDOM(htmlfile).window
global.document = window.document;




fs.readFile(htmlfile,function (err,html){

        if(err){
            throw err;
        }
        http.createServer( function(request,response){

            // response.writeHeader();\
            // response.writeHead(200, {'Content-Type': 'text/html'});
            // console.log("REQUEST: ",request)
            // response.write(html);
            // response.end(html);
            // response.end('<h1>Hello, World Order!</h1>');

        }).listen(8001,()=>{
            console.log('server running at port 8001');
            console.log("Document: ",document)
            

            // var all = document.getElementById("*");
            // console.log("LENGTH: ",all.length)
            //     for (var i=0, max=all.length; i < max; i++) {
            //         // Do something with the element here
            //         console.log(all[i])
            //     }
            // const audio=require('./audio_list.js')
            
        });
});




