import express from 'express';
const app=express();
import bodyparser from 'body-parser';
import fs from 'fs';
import firstpage from './routes/readroute';
// import controller404 from  './controller/404';
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyparser.urlencoded({extended:false}));
app.use(firstpage);
// app.use(controller404.get404);


app.listen({port:'3000'});