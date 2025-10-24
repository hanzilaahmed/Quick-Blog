import express from 'express'
import 'dotenv/config.js'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';



const app = express();


await connectDB()

//  MIDDLEWARE

app.use(express.json());
// app.use(cors());

app.use(cors({
  origin: [
    'https://quick-blog-frontend.vercel.app',  // your frontend Vercel URL
    'http://localhost:5173'                    // local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


//  ROUTES

app.get("/" , (req , res) => {
    res.send("API is working")
});

app.use("/api/admin" , adminRouter);
app.use("/api/blog" , blogRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log("SERVER IS RUNNING http://localhost:"+PORT)
});

export default  app;