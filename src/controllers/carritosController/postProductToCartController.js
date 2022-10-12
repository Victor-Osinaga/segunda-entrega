import * as carritosService from '../../services/carritosService/index.js'

const postProductToCartController = async (req, res) => {
    const newCart = await carritosService.postProductToCartService(req);
    if (newCart === false){
        res.json({ error: '404 Not Found', data: `El carrito con el Id: ${req.params.carritoId} no existe` });
    }else if(newCart == 'No existe'){
        res.json({ error: '404 Not Found', data: `El producto con el Id: ${req.body.id} no existe`});
    }else {
      res.json({ status: `200 OK`, desc: newCart });
    }
  };

  export {postProductToCartController}