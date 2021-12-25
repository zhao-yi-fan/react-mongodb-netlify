const mongoose = require('mongoose');
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://s1155123456:1qaz2wsx@cluster0.pz2zf.mongodb.net/my_asg3_db";


let connection = null;

var conn = async function () {
  connection = await mongoose.createConnection(uri);

  const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    contents: String,
    // The schema is incomplete...
  });

  connection.model('posts', postSchema); // 设置固定的名字， 否则会首字母小写，后尾加s
  connection.on('error', function callback () { //监听是否有异常
    console.log("Connection error");
  });
  connection.once('open', function callback () { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
  });
  connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
  });

}


// Reference: https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format
exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event, 11111111111111111111111)
  console.log(connection, 222222);
  await conn();
  try {
    if (event.httpMethod === "GET") {
      let r = await connection.model('posts').find({})
      return {
        statusCode: 200,
        body: JSON.stringify({ data: r }),
      };
    }
    else {
      return {
        statue: 405,
        body: "Method not supported"
      }
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }



};
