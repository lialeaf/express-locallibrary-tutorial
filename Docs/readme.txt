1、运行应用：在本应用的根目录下(locallibrary)，执行下面的命令：
npm run devstart   或   npm start

2、在浏览器访问：
localhost:3000

3、数据库配置
local_library
Azure  / HongKong

connection:

A:compass
mongodb+srv://<username>:<password>@cluster0-dgqgd.azure.mongodb.net/test

B: NODE.JS
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@cluster0-dgqgd.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
