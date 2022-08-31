const express = require('express');
const bodyParser = require('body-parser');
const session=require('express-session');
const router = express.Router({mergeParams : true});
const DB_stats = require('../Database/DB-product');
const DB_user = require('../Database/DB-user');
const database = require('../Database/database');
router.use(session({secret:"secret"}));
router.use(bodyParser.urlencoded({ extended: true }));

function isProductInCart(cart,id)
{
    for(let i=0;i<cart.length;i++)
    {
        if(cart[i].medicine_id==id)
        {
            return true;
        }
    }
    return false;
}

function calculateTotal(cart,req)
{
    total=0;
    for(let i=0;i<cart.length;i++)
    {
        if(cart[i].medicine_sale_price)
        {
            total=total+(cart[i].medicine_sale_price*cart[i].medicine_quantity);
        }
        else
        {
            total=total+(cart[i].medicine_price*cart[i].medicine_quantity);
        }
    }
    req.session.total=total;
    return total;
}

router.get('/', async (req, res) =>
{
    console.log("before getproducts");
    const result = await DB_stats.getProducts();
    //res.render('pages/index',{result:result});
    res.redirect('/account');
});

router.get('/index', async (req, res) =>
{
    //console.log("before getproducts");
    const result = await DB_stats.getProducts();
    res.render('pages/index',{result:result});
});

router.get('/about', async (req, res) =>
{
    //console.log("before getproducts");
    const result = await DB_stats.getProducts();
    res.render('pages/about',{result:result});
    //res.render('pages/about');
});

router.get('/brand', async (req, res) =>
{
    //console.log("before getproducts");
    const result = await DB_stats.getProducts();
    console.log(result[0].medicine_quantity);
    res.render('pages/brand',{result:result});
    //res.render('pages/about');
});

router.get('/order', async (req, res) =>
{
    //console.log("before getproducts");




    var user=req.session.user;
    user=parseInt(user);
    console.log(user);

    const cart = await DB_user.getOrders(user);
    res.render('pages/order',{cart:cart});
    //res.render('pages/about');
});

router.get('/account', async (req, res) =>
{
    const result = await DB_stats.getProducts();
    res.render('pages/account',{result:result});
});
router.get('/product_details', async (req, res) =>
{
    const result = await DB_stats.getProducts();
    
    res.render('pages/product_details',{result:result});
});

router.post('/add_to_cart',async(req,res)=>
{
    var user=req.session.user;
    user=parseInt(user);
    console.log(user);
    const cart_reg = await DB_user.getCarts(user);
    console.log(req.body.name);
    var id=req.body.id;
    console.log(id);
    console.log("atai");
    var name=req.body.name;
    var price=req.body.price;
    var sale_price=req.body.sale_price;
    var quantity=req.body.quantity;
    var image=req.body.image;
    var product={medicine_id:id,medicine_name:name,medicine_price:price,medicine_sale_price:sale_price,medicine_quantity:quantity,medicine_image:image};
    //var product={id:id,name:name,price:price,sale_price:sale_price,quantity:quantity,image:image};
    let med={
        user_id:user,
        medicine_id:req.body.id,
        name:req.body.name,
        quan:req.body.quantity,
        price:req.body.price,
        cart_id:cart_reg.length+1,
        img:req.body.image,
        sale_price:req.body.sale_price,
    }
    let tmp3=0;
    for(let i=0;i<cart_reg.length;i++)
    {
        if(cart_reg[i].medicine_name==req.body.name)
        {
            tmp3=1;
        }
    }
    if(tmp3==0)
    {
    let re=await DB_user.createNewCart(med);
    }
    console.log(req.session.cart);
    if(req.session.cart)
    {
        console.log("in if");
        var cart=req.session.cart;
        if(!isProductInCart(cart,id))
        {
            cart.push(product);
        }
        
    }else
    {
        console.log("in else");
        req.session.cart=[product];
        console.log(req.session.cart);
        var cart=req.session.cart;
    }
    calculateTotal(cart,req);
    console.log("it is in post");
    console.log(cart[0]);
    var cart=req.session.cart;
    var total=req.session.total;
    res.render('pages/cart',{cart:cart});
});

router.get('/cart',async function(req,res)
{
    console.log("it is in indexrouter's get cart");
    var user=req.session.user;
    user=parseInt(user);
    console.log(user);
    var cart=req.session.cart;
    var total=req.session.total;
    console.log(total);
    console.log(cart);
    if(total==undefined)
    {
        const result = await DB_user.getCarts(user);
        for(let i=0;i<result.length;i++)
        {
            var product={medicine_id:result[i].medicine_id,medicine_name:result[i].medicine_name,medicine_price:result[i].medicine_price,medicine_sale_price:result[i].medicine_sale_price,medicine_quantity:result[i].medicine_quantity,medicine_image:result[i].medicine_image};
            if(req.session.cart)
            {
                var cart=req.session.cart;
                if(!isProductInCart(cart,result[i].medicine_id))
                {
                    cart.push(product);
                }
            }
            else
            {
                req.session.cart=[product];
                var cart=req.session.cart;
            }
            calculateTotal(cart,req);
            var cart=req.session.cart;
            var total=req.session.total;
        }
        if(total==undefined)
        {
            const cart_reg = await DB_user.getCarts(user);
            cart={};
            total=0;
        }
        console.log(cart);
        console.log(total);
        if(cart==undefined)
        {
            res.redirect('/cart');
        }
        res.render('pages/cart',{cart:cart});
        res.redirect('brand');
    }
    else{
        console.log("else");

        calculateTotal(cart,req);
        var cart=req.session.cart;
        var total=req.session.total;

        console.log(cart);
        console.log(total);
        if(total==undefined)
        {
            cart={};
            total=0;
        }
        console.log(cart);
        console.log(total);
        res.render('pages/cart',{cart:cart});
    }
    
    /*const result = await DB_user.getCarts();
    res.render('pages/brand',{result:result});*/
});

router.post('/remove_product',function(req,res)
{
    var id=req.body.id;
    var cart=req.session.cart;
    //console.log(id);
    for(let i=0;i<cart.length;i++)
    {
        //console.log(cart[i].id);
        if(cart[i].medicine_id==id)
        {
            console.log(cart[i].medicine_id);
            console.log(id);
            cart.splice(i,1);
            for(let i=0;i<cart.length;i++)
            {
                console.log(cart[i].medicine_id);
            }
            req.session.cart=cart;
        }
    }
    calculateTotal(cart,req);
    var total=req.session.total;
    res.render('pages/cart',{cart:cart});
});

router.post('/edit_product_quantity',async function(req,res)
{
    var id=req.body.id;
    var quantity=req.body.quantity;
    var increase_btn=req.body.increase_product_quantity;
    var decrease_btn=req.body.decrease_product_quantity;
    var cart=req.session.cart;
    if(increase_btn)
    {
        for(let i=0;i<cart.length;i++)
        {
            if(cart[i].medicine_id==id && cart[i].medicine_quantity>0)
            {
                cart[i].medicine_quantity=parseInt(cart[i].medicine_quantity)+1;
                console.log(cart[i].medicine_name);
                await DB_user.updateQuantity(cart[i].medicine_name,cart[i].medicine_quantity);
            }
        }
    }
    if(decrease_btn)
    {
        for(let i=0;i<cart.length;i++)
        {
            if(cart[i].medicine_id==id && cart[i].medicine_quantity>1)
            {
                cart[i].medicine_quantity=parseInt(cart[i].medicine_quantity)-1;
                await DB_user.updateQuantity(cart[i].medicine_name,cart[i].medicine_quantity);
            }
        }
    }
    calculateTotal(cart,req);
    res.render('pages/cart',{cart:cart});
});

router.get('/expert',async function(req,res)
{
    const result = await DB_user.getExperts();
res.render('pages/expert',{result:result});
});

router.get('/checkout',function(req,res)
{
res.render('pages/checkout');
});

router.post('/place_order',function(req,res)
{
res.redirect('/checkout');
});
router.post('/confirm_order',async function(req,res)
{
    var user=req.session.user;
    user=parseInt(user);
    console.log(user);
    var order_reg=await DB_user.getTotalOrders();
    let len=order_reg.length;
    var cart=req.session.cart;
    for(let i=0;i<cart.length;i++)
    {
        len=len+1;
        let med={
        user_id:user,
        medicine_id:cart[i].medicine_id,
        quan:cart[i].medicine_quantity,
        
        dat:"not delevered yet",
        order_id:len,
        name:cart[i].medicine_name,
        price:cart[i].medicine_price,
        
        img:cart[i].medicine_image,
        sale_price:cart[i].medicine_sale_price,
        addr:req.body.address,
        phn:req.body.phn,
        }
        await DB_user.createNewOrder(med);
    }
    console.log("hello");
    cart.splice(0,cart.length);
    req.session.total=0;
    console.log(cart);
res.redirect('/brand');
});
router.post('/login',async(req,res)=>
{

    
console.log(req.session.user);

    const user_reg = await DB_user.getUsers();
    console.log(user_reg);
    var phone_no=req.body.phone_no;
    var password=req.body.password;
    var tmp=0;
    for(let i=0;i<user_reg.length;i++)
    {
        if(user_reg[i].user_mobile_no==phone_no && user_reg[i].user_password==password)
        {
            console.log(user_reg[i].user_mobile_no);
            console.log(user_reg[i].user_password);
            console.log("req.session.user");
            req.session.user=user_reg[i].user_id;
            console.log(req.session.user);
            console.log("req.session.user");
            tmp=1;
        }
        console.log(i);
    }
    console.log("hello i am here");
    if(tmp==1)
    {
        res.redirect('/brand');
    }
    else
    {
        //document.getElementById("popup1").style.display = '';
    res.redirect('/account');
    }
});

router.post('/sign_upp',function(req,res)
{
    res.render('pages/sign_up');
});
router.post('/regester',async(req,res)=>
{
    const user_reg = await DB_user.getUsers();
    var name=req.body.name;
    var phone_no=req.body.phone_no;
    var password=req.body.password;
    var address=req.body.address;
    
    let user = {
        id: user_reg.length+1,
        name : req.body.name,
        password: req.body.password,
        email: req.body.email,
        phone_no : req.body.phone_no
    }
    let result = await DB_user.createNewUser(user);
    let res2=await DB_user.createNewRegester(user);
    var tmp=0;
    console.log(phone_no);
    for(let i=0;i<user_reg.length;i++)
    {

            console.log(user_reg[i].user_mobile_no);
            //addUser("4",name,password,address,"0171757222");
            if(user_reg[i].user_mobile_no==phone_no)
            {
                tmp=1;
            }
    }
    if(tmp==0&&phone_no)
    {
        res.redirect('/brand');
    }
    else
    {
        res.render('pages/sign_up');
    }
});
router.get('/admin_index',async function(req,res)
{
    const t1 = await DB_user.getExperts();
    const t2 = await DB_user.getUsers();

    const t3 = await DB_user.getWorkers();

    const t4 = await DB_stats.getProducts();

    const var1=t2.length;
    const var2=t4.length;
    const var3=t1.length;
    const var4=t3.length;


res.render('pages/admin_index',{var1:var1,var2:var2,var3:var3,var4:var4});
});
router.get('/admin_productlist',async function(req,res)
{
    const result = await DB_stats.getProducts();
    //console.log(result[0].medicine_quantity);
    res.render('pages/admin_productlist',{result:result});
//res.render('pages/admin_productlist');
});
router.get('/admin_expertlist',async function(req,res)
{
    const result = await DB_user.getExperts();
res.render('pages/admin_expertlist',{result:result});
});
router.get('/admin_userlist',async function(req,res)
{
    const result = await DB_user.getCustomers();
    res.render('pages/admin_userlist',{result:result});
//res.render('pages/admin_userlist');
});
router.get('/admin_buylist',async function(req,res)
{
    const result = await DB_user.b2btransaction();
res.render('pages/admin_buylist',{result:result});
});


router.get('/admin_workerlist',async function(req,res)
{
    const result = await DB_user.getWorkers();
res.render('pages/admin_workerlist',{result:result});
});
router.get('/admin_orderlist',async function(req,res)
{
    const result = await DB_user.getdeleveredOrder();
res.render('pages/admin_orderlist',{result:result});
});
router.get('/admin_pendingorder',async function(req,res)
{
    const result = await DB_user.getPendingOrder();
res.render('pages/admin_pendingorder',{result:result});
});










router.get('/product_details',function(req,res)
{
res.render('pages/product_details');
});
router.post('/delete_product',async function(req,res)
{
    var name=req.body.name;
    await DB_user.deleteProduct(name);
    const result = await DB_stats.getProducts();
    res.render('pages/admin_productlist',{result:result});
});
router.post('/add_product',async function(req,res)
{
    var name=req.body.name;
    const prod=await DB_stats.getProducts();
    let product=
    {
        id: prod.length+1,
        name : req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        image : req.body.image,
        category: req.body.category,
        shop: prod[0].shop_id
    }
    await DB_user.createNewProduct(product);
    const result = await DB_stats.getProducts();
    res.render('pages/admin_productlist',{result:result});
});


router.post('/edit_pending_order',async function(req,res)
{
    var order_id=req.body.order_id;
    var medicine_name=req.body.medicine_name;
    var del="delevered";
    await DB_user.updateOrder(order_id,del);
    const result = await DB_user.getPendingOrder();
    res.render('pages/admin_pendingorder',{result:result});
});




router.post('/add_worker',async function(req,res)
{
    var name=req.body.name;
    const prod=await DB_user.getWorkers();
    let product=
    {
        id: prod.length+1,
        name : req.body.name,
        shop: prod[0].shop_id,
        join: req.body.join,
        salary: req.body.salary,
        phone : req.body.phone,
        address: req.body.address
    }
    await DB_user.createNewWorker(product);
    const result = await DB_user.getWorkers();
    res.render('pages/admin_workerlist',{result:result});
});
router.post('/add_expert',async function(req,res)
{
    var name=req.body.name;
    const prod=await DB_user.getExperts();
    let product=
    {
        id: prod.length+1,
        name : req.body.name,
        email: req.body.email,
        shop: prod[0].shop_id,
        expertise: req.body.expertise
    }
    await DB_user.createNewExpert(product);
    const result = await DB_user.getExperts();
    res.render('pages/admin_expertlist',{result:result});
});
router.post('/add_history',async function(req,res)
{
    var name=req.body.name;
    const prod=await DB_user.b2btransaction();
    let product=
    {
        
        name : req.body.name,
        company: req.body.company,
        quantity: req.body.quantity,
        cost: req.body.cost,
        dat: req.body.date,
        id: prod.length+1,
        shop: prod[0].shop_id
    }
    await DB_user.createNewb2b(product);
    const result = await DB_user.b2btransaction();
    res.render('pages/admin_buylist',{result:result});
});



router.post('/details_product',async function(req,res)
{
    console.log("details product");
    let product=
    {
        id: req.body.id,
        name : req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image
    }
    console.log(product);
    res.render('pages/product_details',{product:product});
});



router.get('/admin_addproduct',function(req,res)
{
res.render('pages/admin_addproduct');
});


module.exports=router;
