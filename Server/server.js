const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const port = 3000;

// MongoDB URI
const uri = "mongodb+srv://webass11:JCkeglwoLEXINbFA@cluster0.hexoza1.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

let db;

// Function to establish MongoDB connection
async function connectToMongo() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log('Connected to Database');
        db = client.db('Testdb'); // replace 'testdb' with your database name if it's different
        
        // Start the server only after the database connection is established
        app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
}

// Call the connectToMongo function to establish the connection
connectToMongo();

// Endpoint to fetch reward data
app.get('/getRewardData', async (req, res) => {
    if (!db) {
        return res.status(500).send('Database not connected');
    }

    try {
        const data = await db.collection('webass').findOne({}); // Use the correct collection name
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Data not found');
        }
    } catch (err) {
        console.error('Error fetching data from database:', err);
        res.status(500).send('Error fetching data');
    }
});
