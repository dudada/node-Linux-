var fs = require('fs');

var argument = process.argv.splice(2);
var source = argument[1];
var line = argument[2];
var target= argument[0];


//默认显示文件最后十行
if(source == null || line == null){
    fs.readFile(target,'utf-8',function(err,data){
         if(err){
             console.log(err);
         }else{
             var length = data.split('\n').length;
             for(var i=10;i>0;i--){
                 console.log(data.split('\n')[length-i]);
             }
         }
    });
}

//显示指定的文件行数(从尾部开始)
if(source === '-n'){
    fs.readFile(target,'utf-8',function(err,data){
         if(err){
             console.log(err);
         }else{
             if(line > data.split('\n').length){
                     console.log(data);
             }else{
                 var length = data.split('\n').length;
                 for(var i=line;i>0;i--){
                     console.log(data.split('\n')[length-i]);
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
                console.log(data.substr(data.length-line,line-1));
            }
        }
    });
}