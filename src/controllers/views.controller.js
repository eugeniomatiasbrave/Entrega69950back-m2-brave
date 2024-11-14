import {productsService, cartsService, ticketsService} from "../services/repositories.js";

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

const renderRealTimeProducts = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const sort = req.query.sort || "asc";
    const productsPaginate = await productsService.getProducts(page, limit, sort);
    const products = productsPaginate.docs;
    const { hasPrevPage, hasNextPage, prevPage, nextPage, page: currentPage } = productsPaginate;
    console.log(productsPaginate);

    res.render("RealTimeProducts", {
        products,
        page: currentPage,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    });
};

const renderProductDetail = async (req, res) => {
  try {
    const product = await productsService.getProductById(req.params.pid);
    const cart = await cartsService.getCartById(req.params.cid);
    

    if (!product) {
      return res.status(404).send({ status: "error", error: 'Producto no encontrado' });
    }

    if (!cart) {
        return res.status(404).send({ status: "error", error: 'Carrito no encontrado' });
      }

    const cartId = cart._id;
    console.log('cart',cart._id)

    res.render('ProductDetail', { product, cartId });
  } catch (error) {
    console.error('Error al obtener el detalle del producto:', error);
    res.status(500).send({ status: "error", error: 'Error al obtener el detalle del producto' });
  }
};

const renderCartById = async (req, res) => { // muestro el carrito del usuario
    try {
        const cart = await cartsService.getCartById(req.params.cid);
        const cartId = cart._id;
        res.render('Cart', { cart , cartId });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send({ status: "error", error: 'Error al obtener el carrito' });
    }
};

const error = (req, res) => {
    res.render('404');
};

const renderTicket = async (req, res) => {

    
    const ticket = await ticketsService.getTicketBy(req.user._id);
    res.render('Ticket', { ticket});
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
    error,
    renderTicket
};