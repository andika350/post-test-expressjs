const express = require("express");
const app = express();
let books = require("./books")

//middleware
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true }))


//Routes
//get all buku
app.get('/books', (req, res) => {
    res.status(200).json(books)
})
//get buku by id
app.get('/books/:id', (req, res)=>{
    const book = books.find(i => i.buku_id === +req.params.buku_id)
    res.status(200).json(book)
})
//create buku
app.post('/books', (req, res) =>{
    const {isbn,judul,sinopsis,penulis,genre} = req.body
    const buku_id = books[books.length -1].buku_id + 1
    const book = {
        buku_id,isbn,judul,sinopsis,penulis,genre
    }
    books.push(book)
    res.status(200).json(books)
})

//update buku
app.put('/books/:id', (req, res)=>{
    let book = books.find(i => i.buku_id === +req.params.buku_id)
    const params = {buku_id:req.body.buku_id,isbn: req.body.isbn, judul: req.body.judul, sinopsis: req.body.sinopsis,
    penulis: req.body.penulis, genre: req.body.genre}
    book = {...book,...params}
    books = books.map(i => i.buku_id === books.buku_id ? book :i)
    res.status(200).json(book)
})
//delete buku by id
app.delete('/books/:id', (req, res)=>{
    books = books.filter(i => i.buku_id != +req.params.buku_id)
    res.status(200).json({
        message: `Buku dengan id ${req.params.id} telah dihapus!` 
    })
})

app.listen(5000, () =>{
    console.log("server started on port 5000")
})
