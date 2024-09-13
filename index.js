const express=require("express");
const fs=require("node:fs");
const path=require("path");


const app=express();

const folderPath=path.join(__dirname,'Files');

fs.mkdir(folderPath,{recursive:true},(err)=>{
    if(err){
        console.error(err)
    }else
    console.log(`The folder ${folderPath} created or already exists`)
    
})



app.post("/createfile",(req,res)=>{

    const now=new Date();

    const datetimeString = now.toISOString().replace(/:/g,'-');

    const timestamp=now.toLocaleString();

    const filePath=path.join(folderPath,`${datetimeString}.txt`);
    
    fs.writeFile(filePath,timestamp,(err)=>{
        if(err){
           return res.status(500).send('Error Creating File')
        }else

        res.status(200).send(`File Created Succesfully: ${filePath}`)
    })

})

app.get('/allfiles',(req,res)=>{
    fs.readdir(folderPath,(err,files)=>{
        if (err){
            console.error(err)
            return res.status(500).send('Error reading Directory')
        }
           const textFiles=files.filter(file=>
                file.endsWith('.txt')
            )

            res.status(200).json({
                message:`Found Textfiles ${textFiles.length} text file(s)`,
                files:textFiles
    });
        
    });
});

app.listen(4000,()=>{
    console.log("Server running successfully")
})