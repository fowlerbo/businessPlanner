const input = document.getElementsByClassName('input')[0];

 const addSubmitBtn = document.getElementsByClassName('submit')[0];
 

addSubmitBtn.addEventListener('click', function (){
  
if(input.value.trim()!=0){
       let localItems = JSON.parse( localStorage.getItem('localItem'))
    if(localItems === null){
         taskList = []

    }else{
        taskList = localItems;
    }
    taskList.push(input.value)
    localStorage.setItem('localItem', JSON.stringify(taskList)); 
}

    displayItem()
})

function displayItem(){
    let localItems = JSON.parse( localStorage.getItem('localItem'))
    if(localItems === null){
         taskList = []

    }else{
        taskList = localItems;
    }

let html = '';
let itemShow = document.querySelector('.tasks');
taskList.forEach((data, index )=> {
    

    html += `
    <div class="tasks">
    <p class="pText">${data}</p>
    <button class="deleteTask" onClick="deleteItem(${index})">x</button>
    </div>
    `
})
itemShow.innerHTML = html;
}
displayItem()

function deleteItem(index){
    let localItems = JSON.parse( localStorage.getItem('localItem'))
    taskList.splice(index, 1)
    localStorage.setItem('localItem', JSON.stringify(taskList));
    displayItem()
}

function clearTask(){
    
localStorage.clear()
displayItem()
}
