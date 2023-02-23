const request = require('request');
let csvToJson = require('convert-csv-to-json');
const path = require('path');
const async=require('async');
const fs=require('fs');
const { convertToObject } = require('typescript');
const { resolve } = require('path');
exports.getPage=(req,res,next)=>{
    res.render("datadisplay",{
        pageTitle :"Data",
        path :'/'
    })
}

exports.postBook=(req,res,next)=>{
    console.log(req.body.value);
    if(req.body.value==="Display Books"){
    let url = "https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv";
    let options = {json: true};
    request(url, options, (error, res, body) => {
        if (error) {
            return  console.log(error)
        };
    
        if (!error && res.statusCode == 200) {
            let data=body;
            function writeBooks(){
                fs.writeFile(path.join(__dirname,"../model",'books.csv'), data.toString(), function (err) {
                    if (err) throw err;
                    readBooks();
                });
            }
            function readBooks(){
                let jsonBook=csvToJson.parseSubArray().getJsonFromCsv('./model/books.csv');
            console.log(jsonBook);
            fs.writeFile(path.join(__dirname,"../model",'books.json'), JSON.stringify(jsonBook), function (err) {
                if (err) throw err;
            });
            }
            writeBooks();
           };
    });
    }

    if(req.body.value==="Display Magazines"){
        let url = "https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv";
        let options = {json: true};
        request(url, options, (error, res, body) => {
            if (error) {
                return  console.log(error)
            };
        
            if (!error && res.statusCode == 200) {
                let data=body;
                function writeMaga(){
                    fs.writeFile(path.join(__dirname,"../model",'magazines.csv'), data.toString(), function (err) {
                        if (err) throw err;
                        console.log('Successed!');
                        readMaga();
                    });
                }
                function readMaga(){
                    console.log("hey")
                    let jsonMaga=csvToJson.parseSubArray().getJsonFromCsv('./model/magazines.csv');
                console.log(jsonMaga);
                fs.writeFile(path.join(__dirname,"../model",'magazines.json'), JSON.stringify(jsonMaga), function (err) {
                    if (err) throw err;
                });
                }
                writeMaga();
                
            };
        });
        }

        if(req.body.value==="Display Authors"){
            let url = "https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv";
            let options = {json: true};
            request(url, options, (error, res, body) => {
                if (error) {
                    return  console.log(error)
                };
            
                if (!error && res.statusCode == 200) {
                    let data=body;
                    
                    function writeAuth(){
                        fs.writeFile(path.join(__dirname,"../model",'authors.csv'), data.toString(), function (err) {
                            if (err) throw err;
                            readAuth();
                        });
                    }
                    function readAuth(){
                        console.log("hey")
                        let jsonAuth=csvToJson.parseSubArray().getJsonFromCsv('./model/authors.csv');
                    console.log(jsonAuth);
                    fs.writeFile(path.join(__dirname,"../model",'authors.json'), JSON.stringify(jsonAuth), function (err) {
                        if (err) throw err;
                    });
                    }
                    writeAuth();
                    
                };
            });
            }
            res.render("find",{
                pageTitle :"Find",
                path :'/find'
            })

}

exports.postFind=(req,res,next)=>{
    if(req.body.Find_Book!=""){
       const books= fs.readFile('./model/books.json', (err, data) =>{
            if(err) throw err;
               let array = JSON.parse(data);
               for(let i in array){
               if(req.body.Find_Book===array[i].isbn){
                console.log("Found Book",array[i]);
                res.render('displaybook',{
                    pageTitle:'Book/Magazine',
                    path:'/',
                    data:array[i],
                    detail:"Book"
                });
               }
               }
         });       
    }
    if(req.body.Find_Magazine!=""){
        const magazines= fs.readFile('./model/magazines.json', (err, data) =>{
             if(err) throw err;
                let array = JSON.parse(data);
                for(let i in array){
                if(req.body.Find_Magazine===array[i].isbn){
                 console.log("Found Magazine",array[i]);
                    res.render('displaymagazine',{
                        pageTitle:'Book/Magazine',
                        path:'/',
                        data:array[i],
                        detail:"Magazine"
                    });
                }
                }
          });       
     }


     if(req.body.email!=""){
        const array2=[];
        let tt="";
        new Promise(function (resolve,reject){
            const magazines= fs.readFile('./model/magazines.json', (err, data) =>{
                if(err) throw err;
                    let arraymag = JSON.parse(data);
                    Object.keys(arraymag).map(
                        function(object){
                          arraymag[object]["Attribute"]='Magazine'
                      });   
                    //  console.log(arraymag);
                   for(let i in arraymag){
                   if(req.body.email==arraymag[i].authors.split('-')[1]){
                    // console.log("Found Magazine",arraymag[i]);
                   array2.push(arraymag[i]);  
                   }
                   }
             });
             resolve(array2) ;
            }).then(function(array2){
                return new Promise(function(resolve,reject){
                    const books= fs.readFile('./model/books.json', (err, data) =>{
                        if(err) throw err;
                            let arraybook = JSON.parse(data);
                            Object.keys(arraybook).map(
                                function(object){
                                  arraybook[object]["Attribute"]='Book'
                              });   
                            //  console.log(arraybook);
                           for(let i in arraybook){
                           if(req.body.email==arraybook[i].authors.split('-')[1]){
                            // console.log("Found Book",arraybook[i]);
                           array2.push(arraybook[i]);  
                           resolve(array2);  
                    }}})
                })
            })
           
                 .then(function(array2){
                    res.render('all',{
                    pageTitle:'All Books/Magazine',
                    path:'/',
                    datas:array2,
                    detail:"All",
                });   
                    })
                 .catch(err=>{
            console.log(err);
        })
         
    }


}