import mongo from "mongodb";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
const MongoClient = mongo.MongoClient,
  objectID = mongo.ObjectId,
  url = process.env.MONGOURL,
  dbName = "editor",
  templateColl = "template",
  templateDataJson = fs.readFileSync("./public/data.json", "utf8"),
  templateData = JSON.parse(templateDataJson);
console.log(templateData.data);

function addDocToDB(req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo
      .collection(templateColl)
      .insertMany(templateData.data, function (err, doc) {
        if (err) throw err;
        console.log("1 document inserted");
        res.send(doc);
        db.close();
      });
  });
}

function getMainTemplateData(req, res) {
  MongoClient.connect(url, function (err, db) {
    console.log(req.params.id, "id");
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo
      .collection(templateColl)
      .findOne({ _id: objectID(req.params.id) }, function (err, template) {
        if (err) throw err;
        res.send(template);
        console.log(template);
      });
  });
}

function getTemplateData(req, res) {
  MongoClient.connect(url, function (err, db) {
    let email = req.params.email;
    console.log(req.params.email, "email");
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection(templateColl).findOne({ email }, function (err, template) {
      if (err) throw err;
      res.send(template);
    });
  });
}


async function findTemplateDocAndUpdate(req, res) {
  let client,
    body = req.body,
    email = req.body.email;
  console.log(email);

  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    let fundResult = await db.collection(templateColl).findOne({ email });

    console.log(fundResult);

    if (fundResult) {
      console.log("fund");
      let updateResult = await db
        .collection(templateColl)
        .updateOne({ email }, { $set: body });
      console.log(updateResult);
    } else {
      console.log("no fund");
      let insertResult = await db.collection(templateColl).insertOne(body);
      console.log(insertResult);
    }

    console.log(fundResult);
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
}

export {
  getTemplateData,
  findTemplateDocAndUpdate,
  addDocToDB,
  getMainTemplateData,
};
