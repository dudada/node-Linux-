var fs = require('fs');

var argument = process.argv.splice(2);
var source = argument[1];
var line = argument[2];
var target= argument[0];


//默认显示文件前十行
if(source == null || line == null){
    fs.readFile(target,'utf-8',function(err,data){
         if(err){
             console.log(err);
         }else{
             for(var i=0;i<10;i++){
                 console.log(data.split('\n')[i]);
             }
         }
    });
}

//显示指定的文件行数
if(source === '-n'){
    fs.readFile(target,'utf-8',function(err,data){
         if(err){
             console.log(err);
         }else{
             if(line > data.split('\n').length){
                 console.log(data);
             }else{
                 for(var i=0;i<line;i++){
                     console.log(data.split('\n')[i]);
                 }
             }
         }
    });
}else if(source === '-c'){
    //显示指定的文件字符数
    fs.readFile(target,'utf-8',function(err,data){
        if(err){
            console.log(err);
        }else{
            if(line > data.length){
                console.log(data);
            }else{
                console.log(data.substr(0,line-1));
            }
        }
    });
}
