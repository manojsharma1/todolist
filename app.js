// SELECTOR
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption =document.querySelector('.filter-todo');
// ADD EVEVTLISTIENER

todoButton.addEventListener('click', addTodo);
document.addEventListener('DOMContentLoaded', getTodos);

todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Function

function addTodo (event) {
// Prevent Default
event.preventDefault();
 //creare div
     const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");
   // create li
   const todoItem = document.createElement('li');
   todoItem.innerText = todoInput.value;
   todoItem.classList.add('todo-item');
   todoDiv.appendChild(todoItem);
   // add todo to local stroage

   saveLocalTodos (todoInput.value);
  //complete btn
   const completeButton =document.createElement('button');
        completeButton.classList.add('complete-btn');
   completeButton.innerHTML = '<i class="fas fa-check"></i>';
   todoDiv.appendChild(completeButton);
   //trash btn
   const trashButton = document.createElement('button');
     trashButton.classList.add('trash-btn');
   trashButton.innerHTML ='<i class="fas fa-trash"></i>';
   todoDiv.appendChild(trashButton);

   //Append todo-list
   todoList.appendChild(todoDiv);
  todoInput.value = "";
   
}

function deleteCheck (e){
const item = e.target;



if(item.classList[0] === 'complete-btn'){
     const todo = item.parentElement;
     todo.classList.toggle('complete');
}

if(item.classList[0] === 'trash-btn') {
   const todo = item.parentElement;
   todo.classList.add('fall');
   removeLocalTodos(todo);
   todo.addEventListener('transitionend', function(){
        todo.remove();
   })
}
}

// todo filter

function filterTodo(e) {
     
    
     const todos = todoList.childNodes;
     
     
        todos.forEach(function(todo){
        switch (e.target.value){
            case "all":
                 todo.style.display = 'flex';
                 break;
                 
                case "complete":
                    if (todo.classList.contains("complete")){
                         todo.style.display = 'flex';
                     }
                     else {
                         todo.style.display = 'none';
                     }
                   break;
                    case "uncomplete":
                    if(!todo.classList.contains('complete'))
                    {
                         todo.style.display = 'flex';
                    }

                    else {
                         todo.style.display ='none';
                    }
                    break;
          }

     })

     }

     // save local todo
     

     function saveLocalTodos (todo) {
         let todos;

         // do i have todo already
         if(localStorage.getItem('todos') === null){
              todos = [];
         }
         else {
              todos = JSON.parse(localStorage.getItem('todos'));
         }
         todos.push(todo);
         localStorage.setItem('todos', JSON.stringify(todos));
     }

     function getTodos (todo) {
          let todos;
          if(localStorage.getItem('todos') === null) {
               todos = [];

          }else {
               todos = JSON.parse(localStorage.getItem('todos'));
          }

          todos.forEach(function (todo){
               const todoDiv = document.createElement('div');
               todoDiv.classList.add("todo");
                // create li
                const todoItem = document.createElement('li');
                todoItem.innerText = todo;
                todoItem.classList.add('todo-item');
                todoDiv.appendChild(todoItem);
               //complete btn
                const completeButton =document.createElement('button');
                     completeButton.classList.add('complete-btn');
                completeButton.innerHTML = '<i class="fas fa-check"></i>';
                todoDiv.appendChild(completeButton);
                //trash btn
                const trashButton = document.createElement('button');
                  trashButton.classList.add('trash-btn');
                trashButton.innerHTML ='<i class="fas fa-trash"></i>';
                todoDiv.appendChild(trashButton);
             
                //Append todo-list
                todoList.appendChild(todoDiv);
          })
     }

     function removeLocalTodos (todo) {
          let todos;
          if(localStorage.getItem('todos') === null) {
               todos = [];

          }else {
               todos = JSON.parse(localStorage.getItem('todos'));
          }
          const todoIndex = todo.children[0].innerText;
          todos.splice(todos.indexOf(todoIndex), 1);
          localStorage.setItem("todos", JSON.stringify(todos));
     }


     
     

