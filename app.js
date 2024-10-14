const addForm= document.querySelector('.add');
const list=document.querySelector('.todos');
const search = document.querySelector('.search input');
const searchicon=document.querySelector('.searcher');
// adding a todo



const generatetodo = (todo_obj,id)=>{
    const todo=todo_obj.task_name;
    const html =`<li class="list-group-item d-flex justify-content-between align-items-center" data-id=${id}>
    <span>${todo}</span>
    <i class="fa-regular fa-circle-check tick"></i>
    <i class="far fa-trash-alt delete"></i>
  </li>`;
  list.innerHTML+=html;
}

// deleting a todo
list.addEventListener('click',e=>{
    if(e.target.classList.contains('delete'))
    {   const id= e.target.parentElement.getAttribute('data-id');
    db.collection('recipe').doc(id).delete();
        e.target.parentElement.remove();
    }
    // checking the todo
    if(e.target.classList.contains('tick'))
    {   console.log('tick clicked');
        console.log(e.target.parentElement.children.item(0).classList.add('checked'));
    }
});


// const deleterecipe = (id)=>
// {
//     const recipeslist= document.querySelectorAll('li');
//     recipeslist.forEach(recipe=>
//         {
//             if(recipe.getAttribute('data-id')==id)
//             {
//                 recipe.remove();
//             }
//         });
// };

addForm.addEventListener('submit',e=>{
    e.preventDefault();
    const todo=addForm.add.value.trim();
    
    if(todo.length)
    {
        const task={
            task_name:todo
        };
        db.collection('recipe').add(task).then(()=>console.log("task added")).catch(err=>console.log(err))
        addForm.reset();
    }
})
// firebase part-------------------------------------------------------------------------------------------
const unsub =db.collection('recipe').onSnapshot(snapshot => {
    console.log(snapshot.docChanges());
    subscribed=true;
    snapshot.docChanges().forEach(change => {
        const doc=change.doc;
        if(change.type==="added")
        {
            generatetodo(doc.data(),doc.id);
        }
       
        
    });
  });

//--------------------------------------------------------------------------------------------------------
// filtering the todos
const filtertodos= term =>{
    //convert the html collection of list element into a array
    Array.from(list.children)
    .filter(todo=>!todo.textContent.toLowerCase().includes(term))
    .forEach(todo=>todo.classList.add('filtered'));
    // removing the filtered class for the todods which has the text
    Array.from(list.children)
    .filter(todo=>todo.textContent.toLowerCase().includes(term))
    .forEach(todo=>todo.classList.remove('filtered'));
    
}
search.addEventListener('keyup',e=>{
    const term = search.value.trim().toLowerCase();
    filtertodos(term);
});
//searching
searchicon.addEventListener('click',e=>{
    if(search.classList.contains('d-none'))
    {
        search.classList.remove('d-none');

    }
    else
    {
        search.classList.add('d-none');
    }
})