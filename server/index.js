const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
