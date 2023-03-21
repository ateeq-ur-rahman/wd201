// models/todo.js
'use strict';
const { Model, Op } = require('sequelize');

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
          completed: true,
        },
        order: [['dueDate', 'ASC']],
      });
    }

    static async dueToday() {
      const today = new Date();

      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gte]: today,
            [Op.lt]: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
          },
          completed: false,
        },
        order: [['dueDate', 'ASC']],
      });
    }

    static async dueLater() {
      const today = new Date();

      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gte]: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
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
      let dateString = "";
      if (!this.completed) {
        if (this.dueDate < new Date()) {
          dateString = this.dueDate.toDateString();
        } else if (this.dueDate > new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate())) {
          dateString = this.dueDate.toDateString();
        }
      }
      return `${this.id}. ${checkbox} ${this.title} ${dateString}`;
    }
  };

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
