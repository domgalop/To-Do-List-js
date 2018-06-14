/** ======= Model ======= */

let model = {
    tasks:[]
};


/** ======= Controller ======= */

let controller = {

    id:0,

    init(){
        view.init();
    }, 

    /** devuelve las tareas del modelo */ 

    getTasks(){
        return model.tasks;
    },

    /** agrega una tarea al modelo  */

    addTask(task){
        model.tasks.push(task);
    },

    /** cambia el estado de la tarea en el modelo */

    editTaskState(taskId, stateToChange){
        model.tasks.filter((task) => {
            if(task.id === taskId){
                task.completed = stateToChange;
            }
        });
    },

    /** cambia el nombre de la tarea en el modelo */

    changeTaskName(taskId, newName){
        model.tasks.filter((task) => {
            if(task.id === taskId){
                task.name = newName;
            }
        });
    },

    /** borra una tarea del modelo */

    deleteTask(taskId){
        let newArray = model.tasks.filter((task) => {
            return task.id !== taskId;
        });
        model.tasks = newArray;
    },

    /** crea una nueva tarea en el modelo */

    createNewTask(name, id){
        class Task{
            constructor(name, id){
                this.id = id;  
                this.name = name;
                this.completed = false;  
            }
        }
        this.id++;
        return new Task(name, this.id); 
    }
};

/** ======= View ======= */

let view = {
    
    /** inicia el view */
    
    init(){
        this.inputTask = document.getElementById('new-task-input');
        this.submitForm = document.getElementById('add-task');
        this.taskToDo = document.getElementById('task-to-do');
        this.taskCompleted = document.getElementById('task-completed');
        this.todoList = document.getElementById('toDoList');
        this.addTask();
        this.modifyTask();
    },
    
    /** crea una nueva tarea en el dom */
    
    newTask(taskName, taskId){
        let newTask = document.createElement('li');
        newTask.innerHTML = `
            <input type="checkbox" id="check_input">
            <input type="text" disabled="" value ="${taskName}" data-id = ${taskId}>
            <button class="button__style" id="edit-button">Edit</button>
            <button class="button__style" id="delete-button">delete</button>
        `
        this.taskToDo.appendChild(newTask);
        this.inputTask.value ="";
    },
    
    /** agrega una tarea a la lista de tareas en el dom */
    
    addTask(){
        this.submitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let newTask = controller.createNewTask(this.inputTask.value);
            controller.addTask(newTask);
            this.newTask( newTask.name, newTask.id);
        });
        
    },
    
    /** modifica la tarea en el dom */

    modifyTask(){
        this.todoList.addEventListener('click', (e) =>{
            let parentElement = e.target.parentElement;
            let editTaskField = e.target.previousElementSibling;
            let taskId = parseInt(parentElement.querySelector('input[type="text"]').dataset.id);
            let taskToChange = parentElement.querySelector('input[type="checkbox"]').checked;
            switch(e.target.id){
                
                /** editar el nombre de la tarea */

                case "edit-button":
                    if (editTaskField.disabled){
                        editTaskField.disabled = !editTaskField.disabled;
                    } else {
                        let newTaskName = parentElement.querySelector('input[type="text"]').value;
                        newTaskName ? controller.changeTaskName(taskId, newTaskName): alert('Ingresa un valor valido');
                        controller.changeTaskName(taskId, newTaskName);
                        editTaskField.disabled = !editTaskField.disabled;
                    }
                    break;

                /** borra la tarea */

                case "delete-button":
                    controller.deleteTask(taskId);
                    parentElement.remove();
                    break;

                /** mover la tarea de lugar en el dom  */   

                case 'check_input':
                    e.target.checked ? this.taskCompleted.appendChild(parentElement):
                                       this.taskToDo.appendChild(parentElement);
                    controller.editTaskState(taskId, taskToChange);
                    break;
            }
        })
    }
};

controller.init();


