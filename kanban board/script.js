//columns
const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

//buttons
const del = document.querySelector('.buttons .delete-btn');
const edit = document.querySelector('.buttons .edit-btn');

//top add new task button
const addNew = document.querySelector('#add-task');

//new card modal
const card = document.querySelector('.add-new-card');
const addTask = document.querySelector('#add-new-task');

//count
const count = document.querySelector('.class-top p');

let draggedElement = null;

//tasks
const tasks = document.querySelectorAll('.section .task');


tasks.forEach(function (task) {
    task.addEventListener('dragstart', (e) => {
        draggedElement = task;
    });

    task.addEventListener('dragend', (e) => {
        draggedElement = null;
    });
});


function addDragEvent(col) {

    col.addEventListener("dragenter", function (e) {
        this.classList.add('hover-over');
    });
    col.addEventListener("dragleave", function (e) {
        this.classList.remove('hover-over');
    });
    col.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    col.addEventListener("drop", function (e) {
        if (draggedElement) {
            col.appendChild(draggedElement);
        }
        col.classList.remove('hover-over');
        updateTaskCounts();
    })
}

//initial delete button
if (del) {
    del.addEventListener('click', (event) => {
        const child = event.target.parentElement.parentElement;
        const parent = (event.target.parentElement.parentElement.parentElement);
        parent.removeChild(child);
        updateTaskCounts();
    });
}

//edit feature
function editing() {
    const task1 = document.querySelector('.task');

    const t = document.querySelector('.task h3').textContent;
    const d = document.querySelector('.task p').textContent;

    const title = document.querySelector('.center input');
    const desc = document.querySelector('.center textarea');


    title.value = t;
    desc.value = d;

    card.style.visibility = "visible";

    task1.remove();
}

//initial edit button
if (edit) {
    edit.addEventListener('click', function () {
        editing();

    })
}


addNew.addEventListener('click', (e) => {
    card.style.visibility = "visible";
});

addTask.addEventListener('click', (e) => {

    const title = document.querySelector('.center input');
    const title1 = title.value;
    const desc = document.querySelector('.center textarea');
    const desc1 = desc.value;

    const newDiv = document.createElement('div');
    newDiv.classList.add('task');
    newDiv.setAttribute('draggable', 'true');

    newDiv.innerHTML = `
        <h3 class="task-title">${title1}</h3>
        <p class="task-desc">${desc1}</p>
        <div class="buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    newDiv.addEventListener('dragstart', (e) => {
        draggedElement = newDiv;
    });

    newDiv.addEventListener('dragend', (e) => {
        draggedElement = null;
    });

    newDiv.querySelector(".delete-btn").addEventListener('click', () => {
        newDiv.remove();
        updateTaskCounts();
    });

    todo.appendChild(newDiv);
    updateTaskCounts();

    title.value = '';
    desc.value = '';

    card.style.visibility = "hidden";

})

//count feature
function updateTaskCounts(){
    const columns = [todo, progress, done];

    columns.forEach(col => {
        if(col){
            const taskCount = col.querySelectorAll('.task').length;
            const countDisplay = col.querySelector('.section-top p');

            if(countDisplay){
                countDisplay.textContent = `${taskCount}`;
            }
        }
    })
}


addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done);
updateTaskCounts();
