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
        if(cart[i].id==id)
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
        if(cart[i].sale_price)
        {
            total=total+(cart[i].sale_price*cart[i].quantity);
        }
        else
        {
            total=total+(cart[i].price*cart[i].quantity);
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
    res.render('pages/brand',{result:result});
    //res.render('pages/about');
});

router.get('/order', async (req, res) =>
{
    //console.log("before getproducts");
    const result = await DB_stats.getProducts();
    res.render('pages/order',{result:result});
    //res.render('pages/about');
});

router.get('/account', async (req, res) =>
{
    const result = await DB_stats.getProducts();
    res.render('pages/account',{result:result});
});

router.post('/add_to_cart',(req,res)=>
{
    console.log(req.body.name);
    var id=req.body.id;
    var name=req.body.name;
    var price=req.body.price;
    var sale_price=req.body.sale_price;
    var quantity=req.body.quantity;
    var image=req.body.image;
    var product={id:id,name:name,price:price,sale_price:sale_price,quantity:quantity,image:image};
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

router.get('/cart',function(req,res)
{
    console.log("it is in indexrouter's get cart");
    var cart=req.session.cart;
    var total=req.session.total;
    res.render('pages/cart',{cart:cart});
});

router.post('/remove_product',function(req,res)
{
    var id=req.body.id;
    var cart=req.session.cart;
    //console.log(id);
    for(let i=0;i<cart.length;i++)
    {
        //console.log(cart[i].id);
        if(cart[i].id==id)
        {
            console.log(cart[i].id);
            console.log(id);
            cart.splice(i,1);
            for(let i=0;i<cart.length;i++)
            {
                console.log(cart[i].id);
            }
            req.session.cart=cart;
        }
    }
    calculateTotal(cart,req);
    var total=req.session.total;
    res.render('pages/cart',{cart:cart});
});

router.post('/edit_product_quantity',function(req,res)
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
            if(cart[i].id==id && cart[i].quantity>0)
            {
                cart[i].quantity=parseInt(cart[i].quantity)+1;
            }
        }
    }
    if(decrease_btn)
    {
        for(let i=0;i<cart.length;i++)
        {
            if(cart[i].id==id && cart[i].quantity>1)
            {
                cart[i].quantity=parseInt(cart[i].quantity)-1;
            }
        }
    }
    calculateTotal(cart,req);
    res.render('pages/cart',{cart:cart});
});

router.get('/checkout',function(req,res)
{
res.render('pages/checkout');
});

router.post('/place_order',function(req,res)
{
res.redirect('/checkout');
});
router.post('/confirm_order',function(req,res)
{
res.redirect('/brand');
});
router.post('/login',async(req,res)=>
{
    const user_reg = await DB_user.getUsers();
    console.log(user_reg);
    var phone_no=req.body.phone_no;
    var password=req.body.password;
    for(let i=0;i<user_reg.length;i++)
    {
        if(user_reg[i].user_mobile_no==phone_no && user_reg[i].user_password==password)
        {
            console.log(user_reg[i].user_mobile_no);
            console.log(user_reg[i].user_password);
            res.redirect('/index');
        }
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
        id: '4',
        name : req.body.name,
        password: req.body.password,
        email: req.body.email,
        phone_no : req.body.phone_no
    }
    let result = await DB_user.createNewUser(user);
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
        res.redirect('/account');
    }
    else
    {
        res.render('pages/sign_up');
    }
});

module.exports=router;
