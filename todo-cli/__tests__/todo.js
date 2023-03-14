/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "todo1",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    add({
      title: "test overdue item",
      completed: false,
      dueDate: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString("en-CA"),
    });
    add({
      title: "test duelater item",
      completed: false,
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toLocaleDateString("en-CA"),
    });
  });

  test("add", () => {
    const count = all.length;
    add({
      title: "todo4",
      completed: true,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(count + 1);
  });
  test("markAsComplete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("overdue_items", () => {
    expect(overdue().length).toBe(1);
  });
  test("dueToday_items", () => {
    expect(dueToday().length).toBe(2);
  });
  test("dueLater_items", () => {
    expect(dueLater().length).toBe(1);
  });
});
