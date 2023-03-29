const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.use(morgan("tiny"));

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/about", (req, res) => {
	res.send(`<p style="color:red">HELLO</p>`);
});

app.post("/post", (req, res) => {
	const { message } = req.body;
	res.send(`here is your message: ${message}`);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
