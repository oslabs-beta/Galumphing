const express = require("express");
const path = require("path");
const app = express();

const PORT = 3333;

app.use("/build", express.static(path.resolve(__dirname, "../build")))

app.get("/", (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
})

app.use('*', (req, res) => {
    res.status(404)
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})