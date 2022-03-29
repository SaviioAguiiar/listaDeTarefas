const text = document.querySelector('input');
const btnInsert = document.querySelector('.divInsert button');
const btnDeleteAll = document.querySelector('.header button');
const ul = document.querySelector('ul');

var itemDB = [];

btnDeleteAll.onclick = () => {
    itemDB = [];
    updateDB();
}

text.addEventListener('keypress', e => {
    if(e.key == 'Enter' && text.value != ''){
        setItemDB();
        text.value = '';
    }
})

btnInsert.onclick = () => {
    if(text.value != ''){
        setItemDB();
        text.value = '';
    }
}

function setItemDB(){
    if(itemDB.length >= 20){
        alert('Limite maximo de 20 itens atingido!');
        return;
    }
    
    itemDB.push({'item': text.value, 'status': ''});
    updateDB();    
    
}

function updateDB(){
    localStorage.setItem('todoList', JSON.stringify(itemDB));
    loadItens();
}

function loadItens(){
    ul.innerHTML = '';
    itemDB = JSON.parse(localStorage.getItem('todoList')) ?? [];
    itemDB.forEach((item, i) => {
         insertItemTela(item.item, item.status, i); 
    })   
}

function insertItemTela(text, status, i){
    const li = document.createElement('li');

    li.innerHTML = `
    <div class= 'divLi'>
      <input type='checkbox' ${status} data-i=${i} onchange='done(this, ${i});'/>
      <span data-si=${i}>${text}</span>
      <button onclick='removeItem(${i})' data-i=${i}><i class='bx bx-trash'></i></button>                 
    </div>
    `
    ul.appendChild(li);

    if(status){
        document.querySelector(`[data-si='${i}']`).classList.add('line-through');
    }else{
        document.querySelector(`[data-si='${i}']`).classList.remove('line-through');
    }

}

function done(chk, i){
   if(chk.checked){
       itemDB[i].status = 'checked';
   }else{
       itemDB[i].status = '';
   }

   updateDB();
}

function removeItem(i){
    itemDB.splice(i, 1);
    updateDB();
}

loadItens();