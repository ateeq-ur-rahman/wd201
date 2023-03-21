// models/todo.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
class Todo extends Model {
static async addTask(params) {
return await Todo.create(params);
}
static async showList() {
  console.log("My Todo-list\n");

  console.log("Overdue");
  const overdue = await Todo.overdue();
  overdue.forEach((todo) => console.log(todo.displayableString()));
  console.log("\n");

  console.log("Due Today");
  const dueToday = await Todo.dueToday();
  dueToday.forEach((todo) => console.log(todo.displayableString()));
  console.log("\n");

  console.log("Due Later");
  const dueLater = await Todo.dueLater();
  dueLater.forEach((todo) => console.log(todo.displayableString()));
}

static async overdue() {
  return await Todo.findAll({
    where: {
      dueDate: {
        [Op.lt]: new Date(),
      },
      completed: false,
    },
    order: [['dueDate', 'ASC']],
  });
}

static async dueToday() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return await Todo.findAll({
    where: {
      dueDate: {
        [Op.gte]: today,
        [Op.lt]: tomorrow,
      },
      completed: false,
    },
    order: [['dueDate', 'ASC']],
  });
}

static async dueLater() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return await Todo.findAll({
    where: {
      dueDate: {
        [Op.gte]: tomorrow,
      },
      completed: false,
    },
    order: [['dueDate', 'ASC']],
  });
}

static async markAsComplete(id) {
  const todo = await Todo.findByPk(id);
  todo.completed = true;
  await todo.save();
}

displayableString() {
  let checkbox = this.completed ? "[x]" : "[ ]";
  return `${this.id}. ${checkbox} ${this.title} ${this.dueDate.toDateString()}`;
}
}
Todo.init(
{
title: DataTypes.STRING,
dueDate: DataTypes.DATEONLY,
completed: DataTypes.BOOLEAN,
},
{
sequelize,
modelName: 'Todo',
}
);
return Todo;
};
