const express = require ('express');

const app = express();

const port = 4000;

app.get('/', (req, res) =>{
    res.send('good')
})

app.get('/', (req, res) =>{
    res.send('good2')
})




app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})