
import path from "path";
import { fileURLToPath } from "url";
import express from 'express'
const port=process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath=path.join(__dirname, "/../public")

const app=express()

app.use(express.static(publicPath))
app.listen(port,()=>{
    console.log(`Sever is running pn port ${port}`);
})
