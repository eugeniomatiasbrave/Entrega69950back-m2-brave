import {productsService, cartsService} from "../services/repositories.js";

const renderHome = (req, res) => {
    res.render('Home');
};

const renderRegister = (req, res) => {
    res.render('Register');
};

const renderLogin = (req, res) => {
    res.render('Login');
};

const renderProfile = (req, res) => {
    console.log(req.user);

    if (!req.user) {
        return res.redirect('/login');
    }
    res.render('Profile', {
        user: req.user
    });
};

const renderProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const sort = req.query.sort || "asc";

    const productsPaginate = await productsService.getProducts(page, limit, sort);
    const products = productsPaginate.docs;
    const { hasPrevPage, hasNextPage, prevPage, nextPage, page: currentPage } = productsPaginate;
    console.log(productsPaginate);

    if (!products) {
        return res.render('404');
    }

    res.render("Products", {
        products,
        page: currentPage,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    });
};

const renderRealTimeProducts = (req, res) => {
    res.render("RealTimeProducts");
};

const renderProductDetail = async (req, res) => {
    const productId = req.params.pid;
    const product = await productsService.getProductById(productId);

    if (!product) {
        return res.render('404');
    }

    res.render('ProductDetail', { product });
};

const renderCarts = async (req, res) => {
    const carts = await cartsService.getCarts();
    res.render('Carts', { carts });
};

export default {
    renderHome,
    renderRegister,
    renderLogin,
    renderProfile,
    renderProducts,
    renderRealTimeProducts,
    renderProductDetail,
    renderCarts
};