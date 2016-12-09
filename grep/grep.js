var fs = require('fs');
var readline = require('readline');

var argument = process.argv.splice(2);
var keyWord = argument[0]
var target= argument[1];

if( keyWord == null || target == null ){
    console.error("please input key and file");
    process.exit();
}

var rl = readline.createInterface({
    input: fs.createReadStream(target),
    output: process.stdout,
    terminal: false  //这个参数很重要
});

rl.on('line', function(line) {
    //正则表达式匹配
    if (keyWord[0] == '/' && keyWord[keyWord.length - 1] == '/') {
        // console.log(keyWord);
        // var reg = new RegExp(keyWord);
        var reg = eval(keyWord);
        if (reg.test(line) === true) {
            console.log(line);
        }
    } else {
        //字符串匹配
        if (line.indexOf(keyWord) >= 0) {
            console.log(line);
        }
    }
});




// fs.readFile(target,'utf-8',function(err,data){
//      if(err){
//          console.log(err);
//      }else{
//          var dataSplit=data.split('\n');
//          //正则表达式匹配
//          if(keyWord[0] == '/' && keyWord[keyWord.length-1] == '/'){
//              var reg = eval(keyWord);
//              for(var i=0;i<dataSplit.length;i++){
//                  if(reg.test(dataSplit[i]) === true){
//                      console.log(dataSplit[i]);
//                  }
//              }
//          }else{
//              //字符串匹配
//              for(var i=0;i<dataSplit.length;i++){
//                  if(dataSplit[i].indexOf(keyWord) >= 0){
//                      console.log(dataSplit[i]);
//                  }
//              }
//          }
//      }
// });