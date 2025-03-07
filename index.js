const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = 5000
const  cors = require('cors')
app.use(cors())
app.use(express.json())

// app.get('/users',(req,res)=> {
//     res.send('this is user page ')
// })

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
    app.get('/users',async(req,res)=> {
        const cursor = db.find()
        const result =await cursor.toArray()
        res.send(result)
    })
    // find a document
    app.get('/user/:id',async(req,res)=> {
        const id = req.params.id
        const filter = {_id:new ObjectId(id)}
        const result = await db.findOne(filter)
        res.send(result)

        console.log("🚀 ~ app.get ~ id:", id)
    })



    // update doc 
  app.get('/update/:id',async(req,res)=> {
    const id = req.params.id
    const filter = {_id: new ObjectId(id)}
    const result = await db.findOne(filter)
    res.send(result)
  })
    app.put('/update/:id',async(req,res)=> {
        const id = req.params.id
        const data = req.body
        const filter = {_id: new ObjectId(id)}

        const options = { upsert: true };
        const updatedDoc = {
            $set:{
                name:data.name,
                email:data.email,
                detail:data.detail
            }
        }
        const result = db.updateOne(filter,updatedDoc,options)
        res.send(result)

    })

    app.delete('/delete/:id',async(req,res)=> {
        const id = req.params.id
        console.log("🚀 ~ app.delete ~ id:", id)
        const filter = {_id: new ObjectId(id)}
        const result =await db.deleteOne(filter)
        res.send(result)
    })

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