import config from '../../../config.js';

let productosDao;

switch (config.env) {
    case 'firebase':
        const { default: FirestoreProductsDAO } = await import('./FirestoreProductsDAO.js');
        productosDao = new FirestoreProductsDAO('productos', config.firestore);
        
        break;

    case 'json':
        const { default: FileSystemProductsDAO } = await import('./FileSystemProductsDAO.js');
        productosDao = new FileSystemProductsDAO(config.dbPath);
        break;

    case 'mongodb':
        const { default: MongodbProductsDAO } = await import('./MongodbProductsDAO.js');
        productosDao = new MongodbProductsDAO('productos', {
            id: Number,
            nombre: String,
            descripcion: String,
            foto: String,
            precio: Number,
            codigo: Number,
            stock: Number,
            timestamp: String,
        });
    break;

    default:
        const {default: MemoryCartsDAO} = await import('./MemoryProductosDAO.js')
        productosDao = new MemoryCartsDAO()
        break;
}

export { productosDao }