var fs = require('fs');

var argument = process.argv.splice(2);
var source = argument[0];
var target = argument[1];
console.log(source,target);
if(source == null || target == null){
    console.error("param not input");
    process.exit();
}

if(fs.statSync(source).isDirectory()){
    copR(source,target);
}else{
    copy(source,target);
}

//逐个文件复制
function copy(src,tfile){
    console.log("copy--->",src,tfile);
    var checkDir=tfile.split('/');
    for(var i=0;i<checkDir.length;i++){
        var subDir=checkDir[i];
        console.log(">>>",subDir);
        if(i==checkDir.length-1 ){
            if(subDir == ''){
                var srcDirList=src.split('/');
                var srcFileName=srcDirList[srcDirList.length-1];
                tfile+=srcFileName;
            }

        }
        else{
            if(subDir!='.' && subDir!='..' && subDir!=''){
                if(!fs.existsSync(subDir)){
                    console.log("mk>>>",subDir);
                    fs.mkdirSync(subDir);
                }
            }
        }

    }
    var readStream = fs.createReadStream(src);
    var writeStream = fs.createWriteStream(tfile);
    readStream.on("data",function(chunk){
        if(writeStream.write(chunk) === false){   //如果没有写完，暂停读取流
            readStream.pause();
        }
    });

    readStream.on("drain",function(){
        readStream.resume();
    });

    readStream.on("end",function(){
        writeStream.end();
    });

    deletePath(src);
}

function deletePath(path) {
    console.log("------->>>>>");
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

//文件夹复制
function copR(srcDir,targetDir){
    if(!fs.existsSync(targetDir)){
        console.log("mkdir--->",targetDir);
        fs.mkdirSync(targetDir);
    }

    var list = fs.readdirSync(srcDir);
    list.forEach(function(srcFile){
        var nowFilePath=srcDir+"/"+srcFile;
        var targetFilePath=targetDir+"/"+srcFile;

        if(fs.statSync(nowFilePath).isDirectory()){
            console.log("r=====",nowFilePath ,targetFilePath);
            copR(nowFilePath ,targetFilePath);
        }else{
            console.log("f:",nowFilePath);
            copy(nowFilePath,targetFilePath);
        }
    });
}