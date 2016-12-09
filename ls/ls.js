var fs = require('fs');

var argument = process.argv.splice(2);
var source = argument[0];
if(source == null){
    console.error("param not input");
    process.exit();
}

if(fs.statSync(source).isDirectory()){
    fs.readdir(source,'utf-8',function(err,files){
        if(err){
            console.error(err);
        }else{
            console.log(files);
        }
    });
}else{
    console.error("only path can be read");
    process.exit();
}

