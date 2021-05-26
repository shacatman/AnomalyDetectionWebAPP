const fs = require('fs');
const express=require('express')
const fileUpload=require('express-fileupload')
var {execFile} =require('child_process')
var prefix =0

const app=express()
app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload())
app.use(express.static('../view'))

console.log('starting...')
app.get('/',(req,res)=>{
    res.sendFile('./index.html')
})

app.post('/detect',(req,res)=>{
    //save files from the request
    var trainfile=req.files.train_file
    var trainname=prefix.toString() + trainfile.name
    var trainpath= '../model/'+trainname
    trainfile.mv(trainpath, (err) => {
        if (err) {
            throw err
        }
    })//callback error check
    var testfile=req.files.test_file
    var testname=prefix.toString() + testfile.name
    var testpath= '../model/'+testname
    testfile.mv(testpath, (err) => {
        if (err) {
            throw err
        }
    })//callback error check
    
    prefix= (prefix+1)%100//avoid duplicate file names on (temporary) local memory
    var prg=null
    if(req.body.algorithm == 'reg_algo'){
        //run the regression based algorythm
        prg=execFile('../model/Reg_algo.exe',[trainpath,testpath],(err,stdout,stderr)=>{
            if(err){//model failed
                throw err
            }
                res.write(stdout)

            // delete the files
            fs.unlink(trainpath, (err) => {
                if (err) {
                    throw err
                }
            })
            fs.unlink(testpath, (err) => {
                if (err) {
                    throw err
                }
            })
            res.end()
        })
    }
    else{//hybrid_algo...
        //run the hyprid algorythm
        prg=execFile('../model/Hybrid_algo.exe',[trainpath,testpath],(err,stdout,stderr)=>{
            if(err){//model failed
                throw err
            }
            res.write(stdout)
            // delete the files
            fs.unlink(trainpath, (err) => {
                if (err) {
                    throw err
                }
            })
            fs.unlink(testpath, (err) => {
                if (err) {
                    throw err
                }
            })
            res.end()
        })
    }
})

app.listen(8080)//listen for clients on port 8080