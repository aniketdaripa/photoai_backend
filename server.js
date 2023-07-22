const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const ImageM = require("./imageModel");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://aniket1:hianiket123@cluster0.z69mafx.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("database connected");
  });

app.use("/uploads", express.static("uploads"));
//image upload
app.post("/uploadImage", upload.single("image"), async (req, res) => {
  // console.log(req.file, req.body)
  if(req.file.path){
    const imageUrl = req.file.path;
    if (!imageUrl) {
      return res.send({ code: 400, message: "bad request" });
    }
    const newImage = new ImageM({
      imageUrl: imageUrl,
    });
    let result = await newImage.save();
    if (result) {
      console.log("photo uploaded");
      res.send(imageUrl);
    }
  }
});


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
