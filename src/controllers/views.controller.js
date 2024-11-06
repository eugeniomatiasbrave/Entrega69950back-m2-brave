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
  try {
    const product = await productsService.getProductById(req.params.pid);
    const cart = await cartsService.getCartById(req.params.cid);
    const cartId = cart._id;
    console.log('cart',cart._id)

    if (!product) {
      return res.status(404).send({ status: "error", error: 'Producto no encontrado' });
    }

    res.render('ProductDetail', { product, cartId });
  } catch (error) {
    console.error('Error al obtener el detalle del producto:', error);
    res.status(500).send({ status: "error", error: 'Error al obtener el detalle del producto' });
  }
};

const renderCartById = async (req, res) => { // muestro el carrito del usuario
    const cart = await cartsService.getCartById(req.params.cid);
    res.render('Cart', { cart });
};

const error = (req, res) => {
    res.render('404');
}


export default {
    renderHome,
    renderRegister,
    renderLogin,
    renderProfile,
    renderProducts,
    renderRealTimeProducts,
    renderProductDetail,
    renderCartById,
    error
};