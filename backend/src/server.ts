import express from 'express';

const app = express();

app.get('/users',(request,response)=>{
    response.json(['Hello World', 'name'])
})

app.listen(3333);