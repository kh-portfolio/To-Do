const todoForm = document.getElementById("newTodoForm");
const todoList = document.getElementById("list");

// retrieve from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
  let newTodo = document.createElement("li");
  newTodo.innerText = savedTodos[i].task;
  newTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newTodo.isCompleted) {
    newTodo.style.textDecoration = "line-through";
  }
  let removeButton = document.createElement("button");
  removeButton.innerText = "X";
  
  todoList.appendChild(newTodo);
  newTodo.appendChild(removeButton);
}

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let removeButton = document.createElement("button");
  removeButton.innerText = "X";

  let newTodo = document.createElement("li");
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert("Please enter a todo");
    return;
  }
  newTodo.innerText = taskText;
  newTodo.isCompleted = false;

  todoList.appendChild(newTodo);
  newTodo.appendChild(removeButton);

  todoForm.reset();

  savedTodos.push({ task: taskText, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
});

todoList.addEventListener("click", function(event) {
  let clickedListItem = event.target;

  if (clickedListItem.isCompleted) {
    clickedListItem.style.textDecoration = "none";
    clickedListItem.isCompleted = false;
  } else {
    clickedListItem.style.textDecoration = "line-through";
    clickedListItem.isCompleted = true;
  }

  const targetTagToLowerCase = event.target.tagName.toLowerCase();
  if (targetTagToLowerCase === "button") {
    event.target.parentNode.remove();
    const todoText = event.target.parentNode.firstChild.textContent;
    savedTodos.forEach(function(todo, index) {
      if (todo.task === todoText) {
        savedTodos.splice(index, 1);
      }
    });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  }

  // update savedTodos and localStorage
  savedTodos.forEach(function(todo) {
    if (todo.task === clickedListItem.innerText) {
      todo.isCompleted = clickedListItem.isCompleted;
    }
  });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
});
