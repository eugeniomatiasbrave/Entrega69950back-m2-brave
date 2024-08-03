import BaseRouter from "./BaseRouter.js";
import {productsService} from "../managers/index.js";

class ViewsRouter extends BaseRouter {
    init(){
        this.get('/',['PUBLIC'],(req,res)=>{
            res.render("Home");
        })
        this.get('/register',['PUBLIC'],(req,res)=>{
            res.render('Register');
        })
        this.get('/login',['PUBLIC'],(req,res)=>{
            res.render('Login');
        })
        this.get('/profile',['USER'],(req,res)=>{
            console.log(req.user);
            if(!req.user){
                return res.redirect('/login')
            }
            res.render('Profile',{
                user: req.user
            })
        });

        this.get('/products', ['PUBLIC'], async (req, res) => {
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
        
        this.get("/realtimeproducts", ['PUBLIC'] ,async (req, res) => {
            res.render("RealTimeProducts");
        });
    }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();