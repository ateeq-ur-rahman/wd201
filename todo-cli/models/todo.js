'use strict';
const {
  Model,Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params){
      return await Todo.create(params)
    }

    displayableString(){
    var today =new Date().toISOString().slice(0,10);
    return  `${this.id}. ${this.completed ? "[x]" : "[ ]"} ${this.title} ${this.dueDate === today ? "" : this.dueDate}`.trim();
    }

    static async showList(){
      console.log("My Todo list \n");

      console.log("Overdue");
      console.log(
        (await Todo.overdue())
          .map((todo) => {
            return todo.displayableString();
          })
          .join("\n")
      );
      console.log("\n");

      console.log("Due Today");
      console.log(
        (await Todo.dueToday())
          .map((todo) => {
            return todo.displayableString();
          })
          .join("\n")
      );
      console.log("\n");

      console.log("Due Later");
      console.log(
        (await Todo.dueLater())
          .map((todo) => {
            return todo.displayableString();
          })
          .join("\n")
      );
    }

    static async overdue() {
      
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: new Date().toLocaleDateString("en-CA") },
        }
  })}

  static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: new Date().toLocaleDateString("en-CA") },
        },
      });
  }

  static async dueLater() {
    
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date().toLocaleDateString("en-CA") },
        },
      });
  }

  static async markAsComplete(id) {
    await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      }
    );
  }
    
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: "Todo",
  });
  return Todo;
};
