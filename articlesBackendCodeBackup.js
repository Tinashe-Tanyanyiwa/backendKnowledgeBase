import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

// CONNECTION STRING
const db = mysql.createConnection({
    host : "localhost",
    user: "tinashe",
    password: "Lostboykal69",
    database: "knowledgebase"
})

app.use(express.json())
app.use(cors())
//REQUEST
app.get("/", (req,res)=>{
    res.json("Hello this is the backend")
})

//GET ALL ARTICLES FROM TABLE
app.get("/articles", (req,res)=>{
    const q = "SELECT * FROM articles"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/articles", (req,res)=>{
    const q = "INSERT INTO articles (`articlesTitle`,`articlesImageUrl`,`articlesBriefDescription`,`articlesBody`) VALUES (?)";
    const values = [ 
        req.body.articlesTitle,
        req.body.articlesImageUrl,
        req.body.articlesBriefDescription,
        req.body.articlesBody,
    ] 

    db.query(q, [values] ,(err,data)=>{
        if(err) return res.json(err)
        return res.json("Article has been created successfuly!")
    })
})

app.delete ("/articles/:articlesId", (req,res) => {
    const articlesId = req.params.articlesId;
    const q = "DELETE FROM articles WHERE articlesId = ?"

    db.query(q,[articlesId], (err,data)=> {
        if(err) return res.json(err)
        return res.json("Article has been deleted successfuly!")
    })
})

app.listen(8800, ()=>{
    console.log("connected to backend! Tanyay Idhara change my mind")
})