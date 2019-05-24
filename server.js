const express = require('express');
const http = require('http') ;
const path = require('path') ;

const app = express() ;
const port = 9000 ;

app.use('/' , express.static(__dirname + '/assess'));

const server = http.createServer(app) ;

server.listen(port , () => {
   console.log('running')
})