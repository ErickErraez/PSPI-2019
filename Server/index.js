;
const app = require('./app/app');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));


process.env.PORT = process.env.PORT || 3001;

app.listen(process.env.PORT, () => {
    console.log(`El servidor esta iniciado en el puerto: ${process.env.PORT}`)
});
