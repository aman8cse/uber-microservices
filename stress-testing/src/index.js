import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));

app.get("/", (req, res) => {
    for(let i=0; i<100000000; i++) {

    }
    res.send("working");
})

app.get("/stress-test", (req, res) => {
    for(let i=0; i<100000000; i++) {
        
    }
    res.send("working stress testing");
})

app.listen(3000, () => {
    console.log("Server runing on PORT: 3000");
})