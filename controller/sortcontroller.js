const request = require('request');
let csvToJson = require('convert-csv-to-json');
const path = require('path');
const async=require('async');
const fs=require('fs');
const ObjectsToCsv = require('objects-to-csv');
const { convertToObject } = require('typescript');
const { resolve } = require('path');
exports.sortPage=(req,res,next)=>{
        const array2=[];
        let tt="";
        new Promise(function (resolve,reject){
            const magazines= fs.readFile('./model/magazines.json', (err, data) =>{
                if(err) throw err;
                    let arraymag = JSON.parse(data);
                    // console.log(arraymag)
                    Object.keys(arraymag).map(
                        function(object){
                          arraymag[object]["Attribute"]='Magazine'
                      });   
                    //  console.log(arraymag);
                   for(let i in arraymag){
                    // console.log("Found Magazine",arraymag[i]);
                   array2.push(arraymag[i]);  
                   }
                   }
             );
             resolve(array2) ;
            }).then(function(array2){
                return new Promise(function(resolve,reject){
                    const books= fs.readFile('./model/books.json', (err, data) =>{
                        if(err) throw err;
                        // console.log(data);
                            let arraybook = JSON.parse(data);
                            Object.keys(arraybook).map(
                                function(object){
                                  arraybook[object]["Attribute"]='Book'
                              });   
                            //  console.log(arraybook);
                           for(let i in arraybook){
                            // console.log("Found Book",arraybook[i]);
                           array2.push(arraybook[i]);  
                           resolve(array2);  
                    }})
                })
            })
           
                 .then(function(array2){

                return new Promise(function(resolve,reject){
                    array2.sort((a, b) => {
                        let fa = a.title.toLowerCase(),
                            fb = b.title.toLowerCase();
                    
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                    
                    resolve(array2);
                })
            })
                .then(function(array2){
                    console.log(array2,"Sorted")
                    res.render('sort',{
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

    // Add Book/Magazine

    exports.addBM=(req,res,next)=>{
res.render('add',{
    pageTitle:'Add Books/Magazine',
                    path:'/',
                    detail:"All",
})
    }

    exports.added=(req,res,next)=>{
        // console.log(req.body,"Hi");
        // console.log(typeof(req.body));
        let datadded;
        let magazine={};
        let book={};
       let merged=[];
        book.title=req.body.titlebook;
        book.isbn=req.body.isbnbook;
        book.author=req.body.authorbook;
        book.desctiption=req.body.descriptionbook;

        magazine.title=req.body.titlemagazine;
        magazine.isbn=req.body.isbnmagazine;
        magazine.author=req.body.authormagazine;
        magazine.desctiption=req.body.descriptionmagazine;
        magazine.publishedAt=req.body.publishednmagazine;

        const obj1 = JSON.parse(JSON.stringify(magazine));
        const obj2 = JSON.parse(JSON.stringify(book));
       merged="["+JSON.stringify(obj1)+","+JSON.stringify(obj2)+"]";
        // console.log(JSON.parse(merged));
        datadded=JSON.parse(merged);
        console.log(typeof(datadded))
Add(datadded);
      function Add (datadded){
    return new Promise(function(resolve,reject){
    // console.log(array2,"Sorted")
        const csv = new ObjectsToCsv(datadded);
       
        // Save to file to model by name of addedData:
        resolve( csv.toDisk('./model/addedData.csv'));
       
        // Return the CSV file as string:
        console.log( csv.toString());
;
}).then( res.render('thanks_success',{
    pageTitle:'Thanks',
                    path:'/',
                    detail:"All",
}))   }
       
    }

