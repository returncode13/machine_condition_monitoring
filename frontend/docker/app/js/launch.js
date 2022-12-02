const http = require('http')
const fs = require('fs')
const audio=require('./audio_list.js')


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

        }).listen(8001,()=>{
            console.log('server running at port 8001');
            
        });
});




