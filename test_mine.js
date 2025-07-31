const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');

const path = require("path");


dotenv.config()
app.use(express.json())
app.use(cors())
// const corsOptions = {
//     origin: ["https://yourfrontend.com","https://localhost:3000"],
//     credentials: true,
// };
// app.use(cors(corsOptions))
// app.use(express.static(path.join(__dirname,"public")))

app.use("/",(req,res)=>{
    res.status(200).send('Blog API is working')
})

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:true
      })
    .then(()=> console.log('DB Connected'))
    .catch(err=> console.log(err))

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const PORT = process.env.PORT|| 5000;
app.listen(PORT,()=>{
    console.log(`Backend server is running on port ${PORT}`)
})