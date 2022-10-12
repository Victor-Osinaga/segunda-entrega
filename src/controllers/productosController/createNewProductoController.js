import * as productosService from '../../services/productosService/index.js'

const createNewProductoController = async (req, res)=> {
    try {
        const createdProducto = await productosService.createNewProductoService(req);
        if(createdProducto == null){
            res.status(422).json({ error: "422 Unprocessable Entity", data: 'El producto ya se encuentra registrado' })
        }else if(createdProducto == false){
            res.status(403).json({ error: `403 Forbidden`, data: `POST reservado para admins` });
        }else{
            res.status(201).json({ status: "OK", data: createdProducto })
        }
    } catch (error) {
        console.log(error);
    }
}

export {createNewProductoController}