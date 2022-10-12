import fs from 'fs';

export default class FileSystemContainer {
  constructor(route) {
    this.route = route;
  }
  saveToDatabase(input) {
    fs.promises.writeFile(this.route, JSON.stringify(input));
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.route, 'utf-8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(error);
    }
  }

  async createNewProducto(newProducto) {
    try {
      const data = await this.getAll()
      const isAlreadyAdded = await data.findIndex((producto)=> producto.nombre === newProducto.nombre) > -1;
      if(isAlreadyAdded) {
        return null
      }else{
        data.push(newProducto)
        await this.saveToDatabase(data)
        return newProducto
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getProductoById(id) {
    try {
      const data = await this.getAll();
      const producto = await data.find((product) =>product.id === id)
      if (producto){
        return producto
      }else{
        return false
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await this.getAll()
      // const productos = await data.productos
      const productoDelete = await this.getProductoById(id)
      const newProducts = await data.filter(product => product.id != id)
      const index = await data.findIndex(product=>product.id == id)
      if(index != -1){
        await this.saveToDatabase(newProducts)
        return productoDelete
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(body, id) {
    try {
      const data = await this.getAll();
      const index = await data.findIndex((obj) => obj.id == id);
      if(index > -1){
        data[index] = {
          id,
          nombre: body.nombre || data[index].nombre,
          descripcion: body.descripcion || data[index].descripcion,
          codigo: body.descripcion | data[index].codigo,
          foto: body.foto || data[index].foto,
          precio: body.precio || data[index].precio,
          stock: body.stock || data[index].stock,
          timestamp: new Date().toLocaleString('en-US', {timeZone: 'UTC'}),
        }
        await this.saveToDatabase(data)
        return data[index]
      }else{
        return 'No existe'
      }
    } catch (error) {
      console.log(error);
    }
  }
}