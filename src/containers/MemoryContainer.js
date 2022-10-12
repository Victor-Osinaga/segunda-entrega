export default class MemoryContainer {
    constructor() {
        this.elements = [
            {
                "id": 1,
                "nombre": "Mesa ratonera moderna",
                "descripcion": "Modera mesa ratonera especial para lugares con poco espacio",
                "codigo": 999,
                "foto": "https://http2.mlstatic.com/D_NQ_NP_783826-MLA25823502482_072017-W.webp",
                "precio": 15000,
                "stock": 50,
                "timestamp": "9/10/2022, 9:52:50 PM"
            },
            {
                "id": 2,
                "nombre": "Lavarropas",
                "descripcion": "Lavarropas automatico 10kg",
                "codigo": 145,
                "foto": "https://http2.mlstatic.com/D_NQ_NP_994326-MLA51601099575_092022-V.webp",
                "precio": 50000,
                "stock": 99,
                "timestamp": "10/10/2022, 11:10:12 PM"
            }
        ]
        this.carritos = [
            {
                id: 1,
                productos: [
                    {
                        "id": 1,
                        "nombre": "Lavarropas",
                        "descripcion": "Lavarropas automatico 10kg",
                        "codigo": 145,
                        "foto": "https://http2.mlstatic.com/D_NQ_NP_994326-MLA51601099575_092022-V.webp",
                        "precio": 50000,
                        "stock": 99,
                        "timestamp": "10/10/2022, 11:10:12 PM"
                    },
                ],
            },
            {
                id: 2,
                productos: [
                    {
                        "id": 2,
                        "nombre": "Heladera",
                        "descripcion": "Lavarropas automatico 10kg",
                        "codigo": 145,
                        "foto": "https://http2.mlstatic.com/D_NQ_NP_994326-MLA51601099575_092022-V.webp",
                        "precio": 50000,
                        "stock": 99,
                        "timestamp": "10/10/2022, 11:10:12 PM"
                    },
                    {
                        "id": 3,
                        "nombre": "ASD",
                        "descripcion": "Lavarropas automatico 10kg",
                        "codigo": 145,
                        "foto": "https://http2.mlstatic.com/D_NQ_NP_994326-MLA51601099575_092022-V.webp",
                        "precio": 50000,
                        "stock": 99,
                        "timestamp": "10/10/2022, 11:10:12 PM"
                    },
                ],
            }
        ]
    }

    getAll() {
        return this.elements;
    }

    createNewProducto(newProducto) {
        this.elements.push(newProducto)
        return newProducto
    }

    getProductoById(id) {
        return this.elements.find(e => e.id === id)
    }

    deleteById(id) {
        try {
            const index = this.elements.findIndex((obj) => obj.id == id);
            if (index > -1) {
              const newData = this.elements.slice(0, index).concat(this.elements.slice(index + 1));
              this.elements = newData;
              return true;
            }
            return false;
          } catch (error) {
            console.error(error);
          }
    }

    updateById(body, id) {
        try {
            const index = this.elements.findIndex((obj) => obj.id == id);
            if (index > -1) {
                this.elements[index] = {
                  id: id,
                  nombre: body.nombre || this.elements[index].nombre,
                  descripcion: body.description || this.elements[index].descripcion,
                  foto: body.foto || this.elements[index].foto,
                  precio: body.precio || this.elements[index].precio,
                  stock: body.stock || this.elements[index].stock,
                }
                return this.elements[index] 
            }else{
                return 'No existe'
            };

        } catch (error) {
            console.log(error);
        }
    }

    createNewCarrito(){
        const id = !this.carritos.length ? 1 : parseInt(this.carritos[this.carritos.length - 1].id) + 1;
        this.carritos.push({
        id: id,
        productos: [],
        });

        return id;
    }

    getProductosFromCart(id){
        const carrito = this.carritos.find(e=>e.id == id)
        return carrito
    }

    postProductToCart(idCart, idProduct){
        const productToAdd = this.elements.find(e=>e.id==idProduct)
        const cart = this.carritos.find(e=>e.id==idCart)
        if(productToAdd){
            cart.productos.push(productToAdd)
            return productToAdd
        }else{
            return 'No existe'
        }
    }

    deleteProductFromCart(productoId, carritoId){
        const cart = this.carritos.find(e=>e.id==carritoId)
        if(!cart){
            return false
        }else{
            const productIndex = cart.productos.findIndex((prod) => prod.id == productoId);
            if(productIndex > -1){
                cart.productos = cart.productos.slice(0, productIndex).concat(cart.productos.slice(productIndex + 1));
                return cart.productos
            }else{
                return false
            }
        }
    }

    deleteAllProductsFromCart(carritoId){
        const cart = this.carritos.find(e=>e.id == carritoId)
        if(!cart){
            return false
        }else{
            cart.productos=[]
            return true
        }
    }
}