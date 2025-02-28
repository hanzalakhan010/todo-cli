helpMessage = `
$add todo             # adds todo with title todo,
$add todo priority    # adds todo with deadline, this will prioritize todo
$show                 # prints all todos
$show -done           # prints all todos flagged as done
$show todo            # details about todo 
$done todo            # flag todo as todo as done
$clear                # to clear the terminal
$save                 # to save the current state
## working on save please be patient
`;
var todos = [];
var doneTodos = [];
function appendOutputLine(content) {
  document.getElementById("output").innerHTML += `
    <p class = 'output'>
    ${content}
    </p>
    `;
}

function appendOutputTable(arr, titles) {
  let table = `
    <table><thead><tr>
    `;
  for (let title of titles) {
    table += `<th>${title}</th>`;
  }
  table += "</tr></thead>";
  for (let ele of arr) {
    table += "<tr>";
    for (let item of Object.values(ele)) {
      table += `<td>${item}</td>`;
    }
    table += "</tr>";
  }
  table += `</table>`;
  document.getElementById("output").innerHTML += table;
}
function clearOutput() {
  document.getElementById("output").innerHTML = "";
}

function showAllTodos() {
  //   console.log(todos);
  appendOutputTable(todos, ["TODO", "Priority", "Status"]);
  //   appendOutputLine(todos)
}

function sortTodos() {
  for (let i = 0; i < todos.length; i++) {
    for (let j = 0; j < i; j++) {
      if (todos[j].priority > todos[j + 1].priority) {
        temp = todos[j];
        todos[j] = todos[j + 1];
        todos[j + 1] = temp;
      }
    }
  }
}
function showTodo(todo) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].todo == todo) {
      //   console.log(todos[i]);
      appendOutputLine(todos[i]);
      return;
    }
  }
  appendOutputLine(`No todo found with this title`);
  //   console.log(`No todo found with this title`);
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
      doneTodos.push(todos[i]);
      todos.splice(i, 1);
      return;
    }
  }
  appendOutputLine("No todo found with this title");
  //   console.log("No todo found with this title");
}
function showDones() {
  appendOutputTable(doneTodos, ["DONE", "Priorirty", "Status"]);
  // console.log(doneTodos)
}
// function editTodo(todo){
//     for(let i=0;i<todos.length;i++){
//         if (todos[i].todo == todo){
//             let title = prompt('Enter new title or leave blank: ')
//             let priority = prompt('Enter updated priority: ')
//             if (title){
//               todos[i].todo = title.trim()
//             }
//             if (priority){
//               todos[i].priority = Number(priority)
//             }
//         }
//         else{
//           console.log('No todo found with this title')
//         }
//     }
// }
function runCommand(command) {
  if (command) {
    tokens = command.split(" ");
    switch (tokens[0]) {
      case "add": {
        let todo = tokens[1];
        let priority = tokens[2];
        addTodo(todo, priority);
        break;
      }

      case "show": {
        if (tokens[1]) {
          if (tokens[1] == "-done") {
            showDones();
            break;
          }
          let todo = tokens[1];
          showTodo(todo);
        } else {
          showAllTodos();
        }
        break;
      }
      case "done": {
        let todo = tokens[1];
        if (todo) {
          setDone(todo.trim());
        } else {
          appendOutputLine("Please specify todo name");
          //   console.log("Please specify todo name");
        }
        break;
      }
      case "help": {
        appendOutputLine(helpMessage);
        // console.log(helpMessage);
        break;
      }
      case "edit": {
        let todo = tokens[1];
        editTodo(todo);
        break;
      }
      default: {
        appendOutputLine("Invalid Syntax");
        // console.log("Invalid Syntax");
        appendOutputLine("type help for help message");
        // console.log("type help for help message");
        // console.log(helpMessage);
      }
    }
  }
}
// function saveState() {
//     localStorage.setItem('todos',JSON.stringify(todos))
//     localStorage.setItem('done',JSON.stringify(doneTodos))
// }
// function loadState(){
//     var todos = JSON.parse(localStorage.getItem('todos'))
//     var doneTodos = JSON.parse(localStorage.getItem('done'))
// }
document.addEventListener('onload',()=>{
    loadState()
})
document.addEventListener("click", () => {
  document.getElementById("input").focus();
});
document.getElementById("input").addEventListener("keydown", ({ key }) => {
  if (key === "Enter") {
    // saveState()
    inputContent = document.getElementById("input").value;
    if (inputContent !== "clear" && inputContent !=='save') {
      appendOutputLine(`$${inputContent}`);
      let command = inputContent;
      runCommand(command);
    } else if (inputContent === "clear") {
      clearOutput();
    }
    // else if (inputContent === 'save'){
    //     saveState()
    //     appendOutputLine('Saved the state')

    // }
    document.getElementById("input").value = "";
  }
});
