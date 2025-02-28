helpMessage = `
$add todo             # adds todo with title todo,
<p>
$show                 # prints all todos
<p>
$show -done           # prints all todos flagged as done
<p>
$show todo            # details about todo 
<p>
$done todo            # flag todo as todo as done
<p>
$clear                # to clear the terminal
<p>
$save                 # to save the current state
<p>
## working on save command please be patient
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
  appendOutputTable(todos, ["ID", "TODO", "Status"]);
  //   appendOutputLine(todos)
}

// function sortTodos() {
//   for (let i = 0; i < todos.length; i++) {
//     for (let j = 0; j < i; j++) {
//       if (todos[j].priority > todos[j + 1].priority) {
//         temp = todos[j];
//         todos[j] = todos[j + 1];
//         todos[j + 1] = temp;
//       }
//     }
//   }
// }
function showTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      //   console.log(todos[i]);
      appendOutputTable([todos[i]], ["ID", "TODO", "Status"]);
      return;
    }
  }
  appendOutputLine(`No todo found with this title`);
  //   console.log(`No todo found with this title`);
}
function addTodo(todo) {
  if (todos.length) {
    let id = todos.slice(-1)[0]["id"] + 1;
    todos.push({ id, todo, status: "Pending" });
    appendOutputLine(`ADDED TODO WITH ID ${ID} `);
    return;
  }
  todos.push({ id: 1, todo, status: "Pending" });
  appendOutputLine(`ADDED TODO WITH ID ${1} `);
}
function setDone(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].status = "Done";
      appendOutputLine(`SET ${todos[i].todo} to done`);
      doneTodos.push(todos[i]);
      todos.splice(i, 1);
      return;
    }
  }
  appendOutputLine("No todo found with this title");
  //   console.log("No todo found with this title");
}
function showDones() {
  appendOutputTable(doneTodos, ["DONE", "TODO", "Status"]);
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
        addTodo(todo);
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
        let id = tokens[1];
        if (id) {
          setDone(id.trim());
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
document.addEventListener("onload", () => {
  loadState();
});
document.addEventListener("click", () => {
  document.getElementById("input").focus();
});
document.getElementById("input").addEventListener("keydown", ({ key }) => {
  if (key === "Enter") {
    // saveState()
    inputContent = document.getElementById("input").value;
    if (inputContent !== "clear" && inputContent !== "save") {
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
