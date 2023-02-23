const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const fs=require('fs');
const firstpage=require('./routes/readroute');
const controller404=require('./controller/404');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyparser.urlencoded({extended:false}));
app.use(firstpage);
app.use(controller404.get404);


app.listen('3000',(err)=>{
if(err)
console.log(err);

    console.log("Server Running");
})
