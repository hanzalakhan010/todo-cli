const prompt = require("prompt-sync")();

var flag = true;

helpMessage = `
$add todo             # adds todo with title todo,
$add todo priority    # adds todo with deadline, this will prioritize todo
$show                 # prints all todos
$show todo            # details about todo 
$done todo            # flag todo as todo as done
$quit                 # to quit application

`;
var todos = [];
function showAllTodos() {
  console.log(todos);
}

function showTodo(todo) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].todo == todo) {
      console.log(todos[i]);
      return;
    }
  }
  console.log(`No todo found with this title`);
}
function addTodo(todo, priority) {
  if (priority) {
    todos.push({ todo, priority: Number(priority), status: "Pending" });
  } else {
    todos.push({ todo, priority: 0, status: "Pending" });
  }
}
function setDone(todo) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].todo == todo) {
      todos[i].status = "Done";
      return;
    }
  }
  console.log("No todo found with this title");
}

do {
  // console.log(helpMessage)
  input = prompt("$");
  if (input) {
    tokens = input.split(" ");
    switch (tokens[0]) {
      case "add": {
        let todo = tokens[1];
        let priority = tokens[2];
        addTodo(todo, priority);
        break;
      }

      case "show": {
        if (tokens[1]) {
          let todo = tokens[1];
          showTodo(todo);
        } else {
          showAllTodos();
        }
        break;
      }
      case "quit": {
        flag = false;
        break;
      }
      case "done": {
        let todo = tokens[1];
        if (todo) {
          setDone(todo.trim());
        } else {
          console.log("Please specify todo name");
        }
        break;
      }
      case "help": {
        console.log(helpMessage);
        break;
      }
      default: {
        console.log("Invalid Syntax");
        console.log("type help for help message");
        // console.log(helpMessage);
      }
    }
  }
} while (flag);
