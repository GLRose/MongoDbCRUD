const { MongoClient } = require("mongodb");
require("dotenv").config();

async function main() {
  const uri = `mongodb+srv://glrose:${process.env.DB_PASS}@cluster1.9e5y5.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("connected to mongodb database");
    await createItem(client, {
      name: "Sword",
      summary: "A sharp sword",
    });
    // await deleteItem(client, "Hammer")
  } finally {
    await client.close();
  }
}
main().catch(console.error);

async function createItem(client, item) {
  const result = await client.db("osrs").collection("items").insertOne(item);
  console.log(`New item created with the folowing id: ${result.insertedId}`);
}

async function deleteItem(client, nameOfItem) {
  const result = await client
    .db("osrs")
    .collection("items")
    .deleteOne({ name: nameOfItem });
  console.log(`${result.deletedCount} document/s was deleted succesfully`);
}
