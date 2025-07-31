const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const path = require('path');


dotenv.config()
app.use(express.json())
// app.use(cors())
// for local development only
const corsOptions = {
    origin: ["https://yourfrontend.com","https://localhost:3000"],
    credentials: true,
};
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname,"public")))

mongoose
    .connect(process.env.MONGO_URL, {
      })
    .then(()=> console.log('✅ DB Connected'))
    .catch(err=> console.log(err))

// Mounting routes
console.log("✅ Mounting auth route...");
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

app.get('/', (req, res) => {
  console.log("✅ GET / route hit");
  res.status(200).send("Hello from backend.Life is Great on this side. T for Tough");
});
const PORT = process.env.PORT|| 8080;
// const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

