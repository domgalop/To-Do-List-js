var newTaskInput = document.getElementById("new-task-input");
var submitTask = document.getElementById("submit-task");
var toDoList = document.getElementById("toDoList");

function createNewTask(event){
    var listItem = document.createElement("li");
    document.getElementById("uncompleted").appendChild(listItem);

    // inputs for fragment

    var inputTodo = document.createElement("input");
    inputTodo.type = "checkbox"
    inputTodo.id ="check_input"
    var editText = document.createElement("input");
    editText.type = "text";
    editText.value = newTaskInput.value;
    editText.disabled = true;
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "button__style";
    editButton.id ="edit-button"
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "button__style";
    deleteButton.id ="delete-button"
    var fragment = document.createDocumentFragment();
    var elements = [inputTodo, editText, editButton ,deleteButton];

    for ( var i = 0; i < elements.length; i++ ){
        fragment.appendChild(elements[i]);
    }

    listItem.appendChild(fragment);
}

function editNewTask(e){
    // e.target is the clicked element!
    // If it was a list item
    var taskCompleted = e.toElement.parentElement;

    if(e.target && e.target.type == "checkbox" && e.target.checked == true) {
        document.getElementById("completed").appendChild(taskCompleted);
    }

    else if(e.target && e.target.matches("#check_input") && e.target.checked == false) {
        document.getElementById("uncompleted").appendChild(taskCompleted);
    }

    else if (e.target && e.target.matches("#delete-button")) {
        if(taskCompleted.parentElement.id == "uncompleted"){
            document.getElementById("uncompleted").removeChild(taskCompleted);
        }
        else if(taskCompleted.parentElement.id== "completed"){
            document.getElementById("completed").removeChild(taskCompleted);
        }
    }

    else if (e.target && e.target.matches("#edit-button")){
        var taskToEdith = e.toElement.previousSibling;
        //Toggle disabled in input text 
        taskToEdith.disabled = !taskToEdith.disabled;
    }
}
submitTask.addEventListener("click", createNewTask);

toDoList.addEventListener("click", editNewTask);


