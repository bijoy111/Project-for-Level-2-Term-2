const database = require('./database');
async function getUsers()
{
console.log("in getUsers");
const sql=`SELECT * FROM "regester"`;
console.log(sql);
const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
console.log("hi");
console.log(sql);
console.log(binds);
console.log("hello");
}
async function createNewUser(user){
    const sql = `
    INSERT INTO "regester"
	("user_id", "user_name", "user_password", "user_email","user_mobile_no") 
	VALUES 
	(:id, :name, :password, :email,:phone_no)
    `;
    const binds = {
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        phone_no: user.phone_no,
    }

    console.log(`
    INSERT INTO "PROJECT"."regester"
	("user_id", "user_name", "user_password", "user_email", "user_mobile_no") 
	VALUES 
	(:id, :name, :password, :email, :phone_no)
    `)

    return (await database.execute(sql, binds, {}));
}
module.exports={getUsers,createNewUser};