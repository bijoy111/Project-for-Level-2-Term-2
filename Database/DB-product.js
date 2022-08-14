const database = require('./database');
async function getProducts()
{
    console.log("in getproducts");
const sql=`SELECT * FROM "Medicine"`;
const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}
module.exports={getProducts};