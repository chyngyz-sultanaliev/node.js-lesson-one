document.addEventListener("DOMContentLoaded", () => {
  const todoListEl = document.getElementById("todo-list");
  const addTodoBtn = document.getElementById("add-todo");

  if (!todoListEl || !addTodoBtn) return;

  async function fetchTodos() {
    try {
      const res = await fetch("/api/todo/get-all");
      const { data } = await res.json();

      todoListEl.innerHTML = "";
      data.forEach((todo) => {
        const li = document.createElement("div");
        li.textContent = `${todo.name} (Age: ${todo.age})`;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => deleteTodo(todo.id));

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit Age random";
        editBtn.addEventListener("click", () => updateTodo(todo.id));

        li.appendChild(editBtn);
        li.appendChild(delBtn);
        todoListEl.appendChild(li);
      });
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  }

  async function addRandomTodo() {
    const names = ["Alice", "Bob", "Charlie", "Yousef"];
    const age = Math.floor(Math.random() * 100) + 10;
    const name = names[Math.floor(Math.random() * names.length)];

    try {
      await fetch("/api/todo/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  }

  async function updateTodo(id) {
    try {
      await fetch(`/api/todo/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age: Math.floor(Math.random() * 50) + 10 }),
      });
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`/api/todo/delete/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  }

  addTodoBtn.addEventListener("click", addRandomTodo);

  fetchTodos();
});
