const todoList = () => {
  all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    // Write the date check condition here and return the array of overdue items accordingly.
    // FILL YOUR CODE HERE
    return all.filter((todolist) =>
      todolist.dueDate == yesterday
    )
  }

  const dueToday = () => {
    // Write the date check condition here and return the array of todo items that are due today accordingly.
    // FILL YOUR CODE HERE
    return all.filter((todolist) =>
      todolist.dueDate == today
    )
  }

  const dueLater = () => {
    // Write the date check condition here and return the array of todo items that are due later accordingly.
    // FILL YOUR CODE HERE
    return all.filter((todolist) =>
      todolist.dueDate == tomorrow
    )
  }

  function toDisplayableList(list) {
    // Format the To-Do list here, and return the output string as per the format given above.
    // FILL YOUR CODE HERE
    return list.map(todolist => `${todolist.completed ? `[x]` : `[ ]`} ${todolist.title} ${todolist.dueDate == today ?" ": todolist.dueDate}`).join('\n')
  }
  return { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList };
}

module.exports= todoList;