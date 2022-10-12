import express from 'express';

import {v1RouterProductos, v1RouterCarritos} from './src/v1/index.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1/productos', v1RouterProductos)
app.use('/api/v1/carritos', v1RouterCarritos)

app.all('*', (req, res) => {
    res.json({ error: `404 Not Found`, desc: `No encontamos la página que buscas.` });
  });

export {app}