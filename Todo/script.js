//Create new storage userstorage for users
var TODOStorage = (function() {
    var todos = [];

    function init() {
        const lsTodos = localStorage.getItem('TODOS');
        todos = JSON.parse(lsTodos);

        if (todos === null) {
            todos = [];
        }
    }

    function saveTodo(description) {
        // Get max id in todos
        let maxId = 0;
        
        for (const i in todos) {
            const todo = todos[i];
            if (todo.id > maxId) {
                maxId = todo.id;
            }
        }


        // Create TODO object
        const todo = {
            id: maxId + 1,
            done: false,
            description: description
        }

        //save new todo to list
        todos.push(todo);

        //Save list to local storage
        saveChanges();
        DocumentEdit.todoList();

    }

    function listTodos() {
        return todos;
    }

    function getTodoById(id) {

        for (const i in todos) {
            const todo = todos[i];

            if (todo.id === id) {
                return todo;
            }
        }

        return null;
    }

    function updateTodo(id, done, description) {
        for (const i in todos) {

            //update if id is found
            if (todos[i].id === id) {
                todos[i].done = done;
                todos[i].description = description
            }
        }
        saveChanges();
    }

    function deleteTodoById(id) {
        console.log("test");
        console.log(todos);
        for (const i in todos) {
            console.log(i);
            //const todo = todos[i]
            console.log(todo.id);
            if (todo.id === id) {
                console.log(id);
                todos.splice(todo, 1);
                break;
            }
        }
        saveChanges();
        DocumentEdit.todoList();
    }

    function doneTodo(event){
        for(const i in todos){
            //update if id is found
                console.log("list id:" + todos[i].description[event.target.id]);
                todos[i].done[event.target.id] = true;
            
        }
        saveChanges();
    }


    function saveChanges() {
        const lsTodos = JSON.stringify(todos);
        localStorage.setItem('TODOS', lsTodos);
    }

    return {
        init,
        saveTodo,
        listTodos,
        getTodoById,
        updateTodo,
        deleteTodoById,
        doneTodo


    }
})();
//TODOStorage
//Create TODO
//Read TODO by id
//List TODOs
//Update TODO
// Delete TODO

var DocumentEdit = (function() {

    function todoList() {
        $("#myUL").empty();
        var todoList = TODOStorage.listTodos();
        for (var i = 0; i < todoList.length; i++) {
            $("#myUL").append("<button id='done" + i + "'" + ">done</button>");
            if (todoList[i].done === true) {

                $("#myUL").append("<li class='selected'>" + todoList[i].description + "</li>");
            } else {
                $("#myUL").append("<li>" + todoList[i].description + "</li>");
            }

            $("#myUL").append("<button class='button-remove' id='" + i + "'" + ">Remove</button></section>");
            $("#" + i).click(EventHandler.onClickRemove);
            $("#done" + i).click(TODOStorage.doneTodo);
        }
    }
    
    

    return {
        todoList
    }
})();

var EventHandler = (function() {

    function init() {
        $("#add-todo").click(onClickAddItem);

    }

    function onClickRemove(event) {

        TODOStorage.deleteTodoById(event.target.id);
    }

    function onClickAddItem() {
        var todoinput = $("#todo-input").val();
        var newinput = todoinput;
        TODOStorage.saveTodo(newinput);
        $("#todo-input").val("");

    }
    return {
        init,
        onClickRemove
    }

})();


$(document).ready(function() {

    EventHandler.init();
    TODOStorage.init();
    DocumentEdit.todoList();
});
