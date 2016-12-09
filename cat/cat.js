var fs = require('fs');

var argument = process.argv.splice(2);
var source = argument[0];
var target = argument[1];

fs.readFile(source,'utf-8',function(err,data){
     if(err){
         console.log(err);
     }else{
         console.log(data);
     }
});
