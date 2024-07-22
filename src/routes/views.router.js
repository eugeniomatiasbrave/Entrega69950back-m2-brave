import { Router } from "express";
import {productsService} from "../managers/index.js";

const router = Router();

router.get('/',(req,res)=>{
    res.render('Home');
});

router.get('/register',(req,res)=>{
    res.render('Register');
});

router.get('/login',(req,res)=>{
    res.render('Login');
});

router.get('/profile',(req,res)=>{
	if(!req.user){
        return res.redirect('/login')
    }
    res.render('Profile',{
        user:req.user 
    });
});

router.get("/products", async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 4;
	const sort = req.query.sort || "asc";

	const productsPaginate = await productsService.getProducts(page, limit, sort);
	const products = productsPaginate.docs;
	const {hasPrevPage, hasNextPage, prevPage,nextPage, page:currentPage} = productsPaginate;
	console.log(productsPaginate);

	if (!products) {
		return res.render('404')
	};

	res.render("Products", { 
		products, 
		page: currentPage,
		hasPrevPage, 
		hasNextPage,
		prevPage,
		nextPage	
	});
});

router.get("/realtimeproducts", async (req, res) => {
	res.render("RealTimeProducts");
});


export default router;