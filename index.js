const express = require('express');
const fileUpload = require('express-fileupload')
const routerApi = require('./routes');
const tareasProgramadasService = require("./services/tareasProgramadas.service");
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');
const cors = require('cors');

const app = express();
const port = process.env.port || 4000;
const tareasProgramadas = new tareasProgramadasService();
tareasProgramadas.programarTareas();

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(fileUpload());
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.listen(port,()=>{
  console.log('Mi port: '+ port);
});

