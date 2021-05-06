const DB = require("../bbdd/db")

// -----------------------------------------------------------SEARCH ALL ARTICLES

function searchAllArticles() {
    return new Promise((resolve, reject) => {
        DB.query(`SELECT id, nombre, precio, relevancia FROM articulos;`, (err, result) => {
            if (err)
                return reject(err);
            resolve(result);
        });
    });
}

// -----------------------------------------------------------SEARCH ARTICLE AND SUPPLIER

function articlesSuppliers(articulo) {
    return new Promise((resolve, reject) => {
        DB.query(
            `SELECT aa.nombre, aa.precio, aa.relevancia, f.nombre, f.cif 
            FROM articulos aa
            JOIN fabricantes f
            ON f.id = aa.idFabricante
            WHERE aa.id = ${articulo};`,
            (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            });
    });
}

// ---------------------------EXPORTS

module.exports = {
    searchAllArticles,
    articlesSuppliers
};