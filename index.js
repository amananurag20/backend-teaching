const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const { userModel } = require("./model/userModel");
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}
main()
  .then(() => console.log("MongoDb successfull connected"))
  .catch((error) => console.log(error));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get("/user", async (req, res) => {
  try {
    const data = await userModel.find({});
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
});
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findById(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
});
app.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    const { name, regId, mob, email } = req.body;
    if (!regId) {
      return res.status(401).json({ message: "regId  is not valid" });
    }
    if (!email) {
      return res.status(401).json({ message: "email  is not valid" });
    }
    const data = await userModel.create({
      name, //name:name
      regId, //regId:regId
      mob,
      email,
    });
    return res.status(201).json({ message: "Data successfull created", data });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ message: error.message });
  }
});
app.patch("/user/:id", async (req, res) => {
  try {
    const data = await userModel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const data = await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ "deleted DAta": data });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port:No ${process.env.PORT}`);
});
