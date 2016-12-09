var fs = require('fs');

var argument = process.argv.splice(2);
var source = argument[0];
if(source == null){
    console.error("param not input");
    process.exit();
}

fs.writeFile(source,'','utf-8',function(err){
    if(err){
        console.error(err);
    }else{
        console.log("empty file has created");
    }
});