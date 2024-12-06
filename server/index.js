const path = require('path')
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+"/public"));
app.use('/api', productRoutes);
app.get('/', (req,res)=>res.sendFile(path.join(__dirname,"/public/index.html")));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
