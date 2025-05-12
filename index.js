const { MongoClient } = require('mongodb');

// Updated connection string with a database name
const uri = "mongodb+srv://tarunyadav3050:24xl9YS4VlThE6Ca@cluster0.pso705z.mongodb.net/myDB?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    // Connect to MongoDB Atlas
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Access the 'myDB' database (change this to your desired database)
    const database = client.db('myDB'); // This is the name of your database

    // Access a collection (this will create the collection if it doesn't exist)
    const collection = database.collection('myCollection'); // This is the name of your collection

    // Insert a document (this will create the collection if it doesn't exist)
    const result = await collection.insertOne({ name: "John Doe", age: 30 });
    console.log('Inserted document:', result);

  } finally {
    // Close the connection when you're done
    await client.close();
  }
}

run().catch(console.error);
