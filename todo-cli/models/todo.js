"use strict";
const { Op } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueLists = await Todo.overdue();
      console.log(
        overdueLists.map((data) => data.displayableString()).join("\n")
      );
      console.log("\n");

      console.log("Due Today");
      const dueTodayLists = await Todo.dueToday();
      console.log(
        dueTodayLists.map((data) => data.displayableString()).join("\n")
      );
      console.log("\n");

      console.log("Due Later");
      const dueLaterLists = await Todo.dueLater();
      console.log(
        dueLaterLists.map((data) => data.displayableString()).join("\n")
      );
    }

    static async overdue() {
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
      });
    }

    static async dueToday() {
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      return await Todo.update(
        { completed: true },
        {
          where: { id: id },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let date = "";
      if (this.dueDate) {
        if (this.completed && this.dueDate <= new Date()) {
          // Completed and past-due todos should display the due date
          date = ` ${this.dueDate}`;
        } else if (!this.completed && this.dueDate.getTime() === new Date().setHours(0, 0, 0, 0)) {
          // Incomplete todos due today should not display the due date
          date = "";
        } else {
          // All other todos should display the due date
          date = ` ${this.dueDate}`;
        }
      }
      return `${this.id}. ${checkbox} ${this.title}${date}`;
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
      modelName: "Todo",
    }
  );

  return Todo;
};
