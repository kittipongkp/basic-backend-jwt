const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//ตรวจสอบการสมัครสมาชิกซ้ำกัน
checkDuplicateUsernameOrEmail = (req, res, next) => {
  //ตรวจสอบ Username มีการสมัครซ้ำกันมั้ย
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in user!" });
      return;
    }

    //ตรวจสอบ Email มีการสมัครซ้ำกันมั้ย
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      }

      if (user) {
        res.status(400).send({ message: "Failed Email is already in user!" });
        return;
      }

      next();
    });
  });
};

//ตรวจสอบ Role ระดับของ User ที่ทำการ Req มาที่ Backend