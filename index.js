const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
	`postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.URL}:${process.env.PORT}/${process.env.DBNAME}`
);

const app = express();

const Task = sequelize.define("Task", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	completed: {
		type: DataTypes.BOOLEAN,
	},
});

const main = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
		// await sequelize.sync({ force: true });
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

app.use(morgan("tiny"));

const port = 3000;

app.use(bodyParser.json());

app.get("/tasks", async (req, res) => {
	const tasks = await Task.findAll();
	res.json(tasks.map((t) => t.toJSON()));

	console.log(tasks);
});

app.post("/task", async (req, res) => {
	const { title, completed } = req.body;
	const task = await Task.create({ title, completed });
	res.json(task.toJSON());
});

app.patch("/task/:id", async (req, res) => {
	const { completed } = req.body;
	const { id } = req.params;
	await Task.update({ completed }, { where: { id } });
	res.end();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

main();
