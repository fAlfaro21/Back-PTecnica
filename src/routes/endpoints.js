// --------------------------PAQUETES E IMPORTACIONES

const express = require('express');
const cors = require('cors')

// const { createToken, hash, randomString, decodeToken, emailIsValid,
//     passIsValid, nameIsValid, mailPassword } = require("../middlewares/middlewares");

const { searchAllArticles, articlesSuppliers } = require("../queries/SQLqueries")

// -------------------------------SERVIDOR Y PUERTOS

const server = express()
const listenPort = process.env.PORT || 8080;
server.use(cors())

// -----------------------------PARSEADOR DE EXPRESS

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// --------------------------------LEVANTAR SERVIDOR

server.listen(listenPort,
    () => console.log(`Server started listening on ${listenPort}`))

// ------------------------------------------------------------------SEARCH

server.get('/searchAllArticles', async (req, res) => {
    try {
        const SQLresponse = await searchAllArticles()
        if (SQLresponse[0]) {
            res.status(200).json({
                status: 200,
                ok: true,
                msg: "Aquí todos los artículos",
                data: SQLresponse
            })
        } else {
            res.status(400).json({
                status: 400,
                ok: false,
                data: "Error"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            ok: false,
            data: err
        })
    }
})

server.get('/articlesSuppliers/:articulo', async (req, res) => {
    try {
        const SQLresponse = await articlesSuppliers(req.params.articulo)
        if (SQLresponse[0]) {
            res.status(200).json({
                status: 200,
                ok: true,
                msg: "Aquí el artículo con su fabricante",
                // etiquetas: SQLresponse.map(el => Object.values(el)[0])
                data: SQLresponse

            })
        } else {
            res.status(400).json({
                status: 400,
                ok: false,
                data: "Error"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            ok: false,
            data: err
        })
    }
})

