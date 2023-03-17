// models/todo.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueList = await Todo.overdue();
      overdueList.forEach(task => console.log(task.displayableString()));

      console.log("\nDue Today");
      const dueTodayList = await Todo.dueToday();
      dueTodayList.forEach(task => console.log(task.displayableString()));

      console.log("\nDue Later");
      const dueLaterList = await Todo.dueLater();
      dueLaterList.forEach(task => console.log(task.displayableString()));
    }

    static async overdue() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo.findAll({ where: { dueDate: { [Op.lt]: today }, completed: false }, order: [['dueDate', 'ASC']] });
    }

    static async dueToday() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo.findAll({ where: { dueDate: today, completed: false }, order: [['dueDate', 'ASC']] });
    }

    static async dueLater() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo.findAll({ where: { dueDate: { [Op.gt]: today }, completed: false }, order: [['dueDate', 'ASC']] });
    }

    static async markAsComplete(id) {
      return await Todo.update({ completed: true }, { where: { id } });
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
