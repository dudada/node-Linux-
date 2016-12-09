var fs = require('fs');

var argument = process.argv.splice(2);
var source = argument[0];
var target = argument[1];

if(source == null || target == null){
    console.error("param not input");
    process.exit();
}

if(!fs.statSync(source).isDirectory()){
    fs.rename(source,target+'/'+source,function(error){
        console.log(error);
    });
}else{
    console.error("sourcepath must be a file");
}



