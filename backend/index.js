const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

const url =
  "mongodb+srv://harshsrivastava:manya1234harsh@cluster0.wjd38lz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const postCollection = client.db("Twitter").collection("posts");
    const userCollection = client.db("Twitter").collection("users");

    app.get("/post", async (req, res) => {
      const post = (await postCollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get("/userPost", async (req, res) => {
      const email = req.query.email;
      const post = (
        await postCollection.find({ email: email }).toArray()
      ).reverse();
      res.send(post);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    app.get("/logedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.findOne({ email });
      res.send(user);
    });

    app.post("/signup", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch("/userUpdates/:email", async (req, res) => {
      const filter = { email: req.params.email };
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };

      try {
        const result = await userCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  } catch (error) {
    console.error("Error saving user:", error);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
