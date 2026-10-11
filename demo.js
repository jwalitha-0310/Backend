const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
})

console.log("working");

app.get("/", (req, res) => {
    res.send("Hello world!!!");
});

app.get("/contact", (req, res) => {
    res.send("Contact page");
});

app.get("/privacy", (req, res) => {
    res.send("Privacy page");
});

app.get("/api/hello", (req, res) => {
    res.json({
        message: "hello",
        ok: "done"
    });
});

app.get("/api/missing", (req, res) => {
    res.status(200).json({
        message: "Not found"
    })
});

app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    res.status(200).json({
        id: productId
    });
});

app.get("/products", (req, res) => {
    const query = req.query;
    
    const Category = query.category;
    const MaxPrice = query.maxPrice;
    res.json({
        category: Category,
        maxPrice: MaxPrice
    });
});

app.post("/api/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    res.status(200).json({
        email: email,
        message: "Login successful"
    });
});

app.use((req, res) => {
    res.send("page not found");
});

app.listen(PORT, () => {
    console.log(`Server started on the port: ${PORT}`);
});