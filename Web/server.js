const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname+'/dist/Web'));
app.listen(process.env.PORT || 8080);

//path location
app.get('/*',function (req,res) {
  res.sendFile(path.join(__dirname +'/dist/Web/index.html'));

})
console.log('escuchando puerto');
