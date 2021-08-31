import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();

let corsOptions = {
    //เซ็ต origin ของ client
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

//แยกและวิเคราะ การร้องขอ ของ content-type - application/json
app.use(bodyParser.json());

//แยกและวิเคราะ การร้องขอ ของ content-type - application/json/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// สร้าง Route อย่างง่ายขึ้นมา
app.get("/", (req, res)=>{
    res.json({message: "Welcoome to Kittipong Application."})
})

// ตั้ค่า port, สำหรับ listen for reqests
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Serser is running on http://localhost:${PORT}`)
});


