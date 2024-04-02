const express = require("express");
const cors = require("cors");
const urls = require("./url");


const app = express();
app.use(cors());
app.use(express.json());
app.use('/', urls);


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});







