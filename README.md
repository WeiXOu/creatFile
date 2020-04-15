## creatFile
create file for miniprogram

## 目的
由于vscode不能批量创建小程序一个页面需要的四个文件，闲来无事就写了一个只需两句话，就可以创建一整个小程序页面的方法。

## 环境要求
node 环境

## 操作步骤
1. 首先在小程序app.json中写下需要创建的page路径
2. 根据自己的项目目录修改createFile.js 中的 目录设置并保存。
3. 在node环境下运行 createFile.js 即可。

## 运行
node createFile.js
