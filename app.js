const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
// Use the port from Render's environment variable, or fallback to 3000 for local testing
const port = process.env.PORT || 3000;

// MongoDB Atlas connection string
const uri = "mongodb+srv://tarunyadav3050:24xl9YS4VlThE6Ca@cluster0.pso705z.mongodb.net/myDB?retryWrites=true&w=majority";

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Connect to MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongo() {
  await client.connect();
  console.log('Connected to MongoDB Atlas');
}

// POST API to accept dynamic form data (Name, Age, Phone)
app.post('/submit', async (req, res) => {
  try {
    const { name, age, phone } = req.body;

    if (!name || !age || !phone) {
      return res.status(400).send('Missing required fields');
    }

    const database = client.db('myDB'); // Database name
    const collection = database.collection('userDetails'); // Collection name

    // Insert the data into MongoDB
    const result = await collection.insertOne({ name, age, phone });

    res.status(200).json({ message: 'Data inserted successfully', result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Connect to MongoDB when the server starts
connectToMongo().catch(console.error);
