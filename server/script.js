import { MongoClient } from "mongodb";
import assert from "assert";

const mongoDb_URI =
  "mongodb+srv://tomijaga:Windows8@cluster.ftv5l.gcp.mongodb.net/cluster?retryWrites=true&w=majority";

const client = new MongoClient(mongoDb_URI);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: "Back to the Future" };
    const movie = await collection.findOne(query);

    console.log("movie!!", movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
