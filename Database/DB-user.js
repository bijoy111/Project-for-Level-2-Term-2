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
async function getCustomers()
{
console.log("in getUsers");
const sql=`SELECT * FROM "User"`;
console.log(sql);
const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
console.log("hi");
console.log(sql);
console.log(binds);
console.log("hello");
}
async function getCarts(userID)
{
console.log("in getCarts");
const sql=`SELECT * FROM "Cart" WHERE "user_id" = :userID`;
console.log(sql);
const binds = 
    {
        userID:userID
    }
    return (await database.execute(sql, binds, database.options)).rows;
console.log("hi");
console.log(sql);
console.log(binds);
console.log("hello");
}
async function getOrders(userID)
{
const sql=`SELECT * FROM "order" WHERE "user_id" = :userID`;
const binds = {userID:userID}
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getTotalOrders()
{
const sql=`SELECT * FROM "order"`;
const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
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
async function createNewRegester(user){
    const sql = `
    INSERT INTO "User"
	("user_id", "user_name", "user_password", "user_email","user_phone_no") 
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
    return (await database.execute(sql, binds, {}));
}
async function createNewCart(cart){
    console.log("in createNew cart");

    

    const sql = `
    INSERT INTO "Cart"
	("user_id","medicine_id","medicine_name", "medicine_quantity","medicine_price","cart_id","medicine_image","medicine_sale_price") 
	VALUES 
	(:id1, :id2, :name, :quantity, :price,:id3, :image,:sale_price)
    `;
    const binds = {
        id1: cart.user_id,
        id2:cart.medicine_id,
        name: cart.name,
        quantity: cart.quan,
        price: cart.price,
        id3:cart.cart_id,
        image: cart.img,
        sale_price:cart.sale_price,
    }
    return (await database.execute(sql, binds, {}));
}


async function createNewOrder(order){
    console.log("in createNew order");
    const sql = `
    INSERT INTO "order"
	("user_id","medicine_id","medicine_quantity", "date","order_id","medicine_name","medicine_price","medicine_image","medicine_sale_price","address","phone") 
	VALUES 
	(:id1, :id2, :quantity, :dat, :id3, :name, :price,:image,:sale_price,:addr,:phn)
    `;
    const binds = {
        id1: order.user_id,
        id2:order.medicine_id,
        quantity: order.quan,
        dat: order.dat,
        id3:order.order_id,
        name: order.name,
        price: order.price,
        image: order.img,
        sale_price:order.sale_price,
        addr:order.addr,
        phn:order.phn,
    }
    return (await database.execute(sql, binds, {}));
}





async function updateQuantity(name,amount){
    const sql = `
        UPDATE  "Cart" SET "medicine_quantity" = :amount WHERE "medicine_name" = :name
    `;
    const binds = {
        amount:amount,
        name:name
    }
    const updateResult = await database.execute(sql, binds, database.options);
    return;
}
async function deleteProduct(name){
    const sql = `
        DELETE FROM  "Medicine" WHERE "medicine_name"  = :name
    `;
    const binds = {
        name:name
    }
    return await database.execute(sql, binds, database.options);
}
async function createNewProduct(product){
    const sql = `
    INSERT INTO "Medicine"
	("medicine_id", "medicine_name", "medicine_price", "medicine_quantity","medicine_image","medicine_category","shop_id") 
	VALUES 
	(:id, :name, :price, :quantity,:image,:category,:shop_id)
    `;
    const binds = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        category: product.category,
        shop_id: product.shop,
    }

    

    return (await database.execute(sql, binds, {}));
}






async function createNewWorker(product){
    const sql = `
    INSERT INTO "worker"
	("worker_id", "worker_name", "shop_id", "worker_joining_date","worker_salary","worker_phone_no","worker_address") 
	VALUES 
	(:id, :name, :id2, :join,:sal,:phone,:address)
    `;
    const binds = {
        id: product.id,
        name: product.name,
        id2: product.shop,
        join: product.join,
        sal: product.salary,
        phone: product.phone,
        address: product.address,
    }

    

    return (await database.execute(sql, binds, {}));
}


async function createNewExpert(product){
    const sql = `
    INSERT INTO "expert"
	("expert_id", "expert_name", "expert_email_id", "shop_id","expertise") 
	VALUES 
	(:id, :name, :email, :shop,:expertise)
    `;
    const binds = {
        id: product.id,
        name: product.name,
        email: product.email,
        shop: product.shop,
        expertise: product.expertise,
    }

    

    return (await database.execute(sql, binds, {}));
}

async function createNewb2b(product){
    const sql = `
    INSERT INTO "B2B"
	("Product", "Company", "Quantity", "Cost","Date","product_id","shop_id") 
	VALUES 
	(:name, :company, :quantity, :cost,:dat,:id2,:shop)
    `;
    const binds = {
        name: product.name,
        company: product.company,
        quantity: product.quantity,
        cost: product.cost,
        dat: product.dat,
        id2: product.id,
        shop: product.expertise,
    }

    

    return (await database.execute(sql, binds, {}));
}













async function getExperts()
{
    console.log("in getexperts");
const sql=`SELECT * FROM "expert"`;
const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getWorkers()
{
    console.log("in getworkers");
const sql=`SELECT * FROM "worker"`;
const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}
async function b2btransaction()
{
const sql=`SELECT * FROM "B2B"`;
const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}


async function getdeleveredOrder()
{
const sql=`SELECT * FROM "order" WHERE "date"='delevered'`;
const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getPendingOrder()
{
    console.log("start_getpendingorder");
const sql=`SELECT * FROM "order" WHERE "date"='not delevered yet'`;
console.log("end_getpendingorder");
const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}

async function updateOrder(id,del){
    const sql = `
        UPDATE  "order" SET "date" = :del WHERE "order_id" = :id
    `;
    const binds = {
        del:del,
        id:id

    }
    const updateResult = await database.execute(sql, binds, database.options);
    return;
}

module.exports={getUsers,createNewUser,createNewRegester,getCarts,createNewCart,updateQuantity,createNewOrder,getOrders,getCustomers,deleteProduct,createNewProduct,getExperts,getWorkers,b2btransaction,createNewWorker,createNewExpert,createNewb2b,getdeleveredOrder,getPendingOrder,updateOrder,getTotalOrders};
