const http = require('http')
const fs = require('fs')
const inline=require('./audio_list.js')
// const global=require('./global.js')

fs.readFile('../index.html',function (err,html){

        if(err){
            throw err;
        }
        http.createServer( function(request,response){

            // response.writeHeader();\
            response.writeHead(200, {'Content-Type': 'text/html'});
            console.log("REQUEST: ",request)
            // response.write(html);
            response.end(html);
            // response.end('<h1>Hello, World Order!</h1>');

        }).listen(8000,()=>{
            console.log('server running at port 8000')
        });
});


// function create_server(request,response){
//     response.writeHeader(200,{"Content-Type":"text/html"});
//     response.write()
// }

