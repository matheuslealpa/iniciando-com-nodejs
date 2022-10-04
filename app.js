const express = require("express");
const {randomUUID} = require("crypto")

const app = express();

const PORTA = 4001;

const products = [];

app.listen(PORTA, () => console.log("o servidor está rodando na porta " + PORTA));

app.get("/products", (req, res) => {
    return res.json(products);
})

app.get("/products/:id", (req, res) => {
    const {id} = req.params;
    const product = products.find(product => product.id === id);
    return res.json(product);
})

app.post("/products", (req, res) => {
    const {name, price} = req.body;
    const product = {
        id: randomUUID(),
        name,
        price,
    };
    products.push(product);
    return res.json(product);
})

app.put("/products/:id", (req, res) => {
    const {id} = req.params;
    const {name, price} = req.body;
    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }
    return res.json({message: "atualizado com sucesso"})
})

app.delete("/products/:id", (req, res) => {
    const {id} = req.params;
    const productIndex = products.findIndex(product => product.id === id);
    products.splice(productIndex, 1);

    return res.json({message: "produto removido com sucesso"})
})