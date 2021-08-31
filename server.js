import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dbConfig from "./app/config/db.config";

const app = express();

let corsOptions = {
  //เซ็ต origin ของ client
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

//แยกและวิเคราะ การร้องขอ ของ content-type - application/json
app.use(bodyParser.json());

//แยกและวิเคราะ การร้องขอ ของ content-type - application/json/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// สร้าง Route อย่างง่ายขึ้นมา
app.get("/", (req, res) => {
  res.json({ message: "Welcoome to Kittipong Application." });
});

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    userNewUrlParser: true,
    userUnfiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.log("Connection error", err);
    process.exit();
  });

// ตั้ค่า port, สำหรับ listen for reqests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serser is running on http://localhost:${PORT}`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
