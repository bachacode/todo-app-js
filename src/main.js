let todos = JSON.parse(localStorage.getItem('todos') || '[]');
const input_content = document.querySelector("#content");
const input_category = document.querySelectorAll("#category");
const add_todo = document.querySelector("#addTodo");
const todoList = document.querySelector('.todo-list');

add_todo.addEventListener("click", (e) => {
    e.preventDefault(true)
    let category = "";

    if (input_content.value.trim() === '') return;
    if (input_category[0].checked === false && input_category[1].checked === false) return;

    for (var i = 0, length = input_category.length; i < length; i++) {
        if (input_category[i].checked) {
            category = input_category[i].value;
            input_category[i].checked = false;
        }
    }

    let content = input_content.value.trim();
    let id = content.slice(0, 3) + todos.length + category.slice(0, 3);
    let newTodo = {
        id: id,
        checked: false,
        content: content,
        category: category
    }
    newTodos = [...todos, newTodo]
    updateTodos(newTodos);

    input_content.value = ''
})

function deleteTodo(todo) {
    todo.preventDefault();
    if (!this.parentNode && !this.parentNode.dataset && !this.parentNode.dataset.id) return;

    const id = this.parentNode.dataset.id;
    const newTodos = todos.filter(todo => todo.id !== id);
    updateTodos(newTodos)
}

function checkTodo(todo) {

    const id = this.parentNode.parentNode.dataset.id;

    var index = todos.findIndex(todo => todo.id == id);
    if (~index) {
        todos[index].checked = !todos[index].checked;
        localStorage.setItem('todos', JSON.stringify(todos));
        updateList()
    }
}

function updateTodos(newTodos) {
    todos = newTodos;
    localStorage.setItem('todos', JSON.stringify(todos));
    updateList()
}

function updateList() {
    let content = ''
    if (todos.length === 0) {
        content = `<div class="bg-white p-3 rounded-md">
        <p>You don't have pending tasks!</p>
        </div>`
    } else
        content = todos.map(todo => {
            return `
            <li class="todo-list-item flex space-x-3 items-center bg-white p-3 rounded-md"  data-id="${ todo.id }">
            <label class="text-center">
                <input type="checkbox" class="form-radio category w-6 h-6 border-2 border-category-${todo.category} text-category-${todo.category} focus:ring-category-${todo.category} transition-all ease-out cursor-pointer" ${todo.checked ? 'checked' : ''}/>
            </label>
                <p class="w-full ${ todo.checked ? 'line-through text-gray-500' : ''}">${ todo.content }</p>
            <button>
            <div class="flex p-2 border rounded-md cursor-pointer text-white bg-red-500 font-semibold text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>                          
                <div class="hidden md:inline text-white">delete</div>
            </div>
        </button>
        </li>
      `;
        }).join('');
    todoList.innerHTML = content;

    const deleteButtons = todoList.querySelectorAll('.todo-list-item button');
    deleteButtons.forEach(button => button.addEventListener('click', deleteTodo));

    const completedCheckboxes = todoList.querySelectorAll('.todo-list-item input[type="checkbox"]');
    completedCheckboxes.forEach(checkbox => checkbox.addEventListener('click', checkTodo));
}

function init() {
    updateList()
}
init()