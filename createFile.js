const fs = require('fs');
const path = require('path')
const dirPath = 'C:/Users/myName/Desktop/demo'
const stream = fs.createReadStream(`${dirPath}/app.json`);
let pages = [];
stream.on('data', function(chrunk) {
    pages = JSON.parse(chrunk.toString()).pages;
})

stream.on('end', function() {
    createFn(pages);
})


// create file folder
function mkdir(file, callback) {
    if(fs.existsSync(`${dirPath}/${file.dirname}`)) {
        // console.log('exists')
        callback(`${dirPath}/${file.filename}`, file.content);
    } else {
        // console.log(`not exist：${dirPath}/${file.dirname}`)
        mkdir(file, function() {
            fs.mkdir(`${dirPath}/${file.dirname}`, callback(`${dirPath}/${file.filename}`, file.content));
        })
    }
}

// create file
function mkfile(filename, content) {
    fs.writeFile(filename, content, function(err) {
        if(err) {
            console.log('err:', err);
            return;
        }
        console.log('success !');
    })
}


function createFn(pages) {
    pages.forEach((item) => {
        let dir = path.parse(item).dir;
        let filename = path.parse(item).name.replace(/^\_([A-Z])/g,function(str){
            return str.toLowerCase().replace(/\_/g,'')
        })
        let jsTemplate = `const app = getApp()
            Page({
                data: {

                },
                onLoad: function() {

                },
                onShow: function() {

                }
            })
        `;
        let wxmlTemplate = `<view class='container'></view>`;
        let newFileList = [{
            dirname: dir,
            filename: `${dir}/${filename}.js`,
            content: jsTemplate
        }, {
            dirname: dir,
            filename: `${dir}/${filename}.json`,
            content: '{}'
        }, {
            dirname: dir,
            filename: `${dir}/${filename}.wxml`,
            content: wxmlTemplate
        }, {
            dirname: dir,
            filename: `${dir}/${filename}.wxss`,
            content: ''
        }]
        newFileList.forEach((item) => {
            mkdir(item, (file, content) => {
                if(fs.existsSync(file)){
                    console.log('file already exists')
                } else {  // create file
                    mkfile(file, content);
                }
            });
        })
    })
}
