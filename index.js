const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000
const  cors = require('cors')
app.use(cors())
app.use(express.json())

app.get('/users',(req,res)=> {
    res.send('this is user page ')
})

// mongodb added 


const uri = "mongodb+srv://badolhossain093:efuIyu1ZM2h4hpWB@prectice.eqvb1.mongodb.net/?retryWrites=true&w=majority&appName=Prectice";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db('users').collection('user')
    // Send a ping to confirm a successful connection
    app.post('/users',async(req,res)=> {
        const data = req.body
        console.log("🚀 ~ app.post ~ data:", data)
        const sentData =await db.insertOne(data)
        res.send(sentData)
        

    })

    // read operation 
    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=> {
    console.log("🚀 ~ app.listen ~ port:", port)
    
})

// badolhossain093

// efuIyu1ZM2h4hpWB