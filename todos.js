//Bloquear Cookies de Terceiros impede o uso de localStorage
var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");
buttonElement.onclick = addTodo;

//caso o valor retornado seja null, passa-se à segunda opção, que é []
var TODOS = JSON.parse(localStorage.getItem("lista__")) || [];


function renderTodos() {
listElement.innerHTML = "";
for (todo of TODOS){
var divElement0 = document.createElement("div");
divElement0.setAttribute("class","zero");

var divElement = document.createElement("div");
divElement.setAttribute("class","listitem");

var daysOffElement = document.createElement("pre");
var daysOffText = document.createTextNode(todo.span);
daysOffElement.appendChild(daysOffText);

var dateElement = document.createElement("input");
dateElement.value = todo.data;
dateElement.setAttribute("type","date");
dateElement.setAttribute("name","date");
dateElement.setAttribute("onchange","changeStyle()");




var todoElement = document.createElement("li");
var todoText = document.createTextNode(todo.item);

var linkElement = document.createElement("a");
linkElement.setAttribute("href", "#");

var pos = TODOS.indexOf(todo);
linkElement.setAttribute("onclick", "deleteTodo(" + pos + ")");

var linkText = document.createTextNode("⛔ Excluir");
linkElement.appendChild(linkText);


todoElement.appendChild(todoText);
todoElement.appendChild(linkElement);

divElement.appendChild(daysOffElement);
divElement.appendChild(dateElement);
divElement.appendChild(todoElement);
divElement0.appendChild(divElement);
listElement.appendChild(divElement0);

}

}

function changeStyle(){
var counter = -1;
for(date of document.getElementsByName("date")){
counter +=1;
TODOS[counter].data = date.value;
TODOS[counter].span = dateDifference(TODOS[counter].data,todayAsString());
var theDate = new Date(date.value);
var hoje = new Date(todayAsString());
var span = date.previousElementSibling;
span.innerText = TODOS[counter].span + " dias";
if( theDate > hoje){
date.setAttribute("class","tomorrow");
span.setAttribute("class","tomorrow");
}
else if(theDate < hoje ){
date.setAttribute("class","yesterday");
span.setAttribute("class","yesterday");
}
else{
date.setAttribute("class","today");
span.setAttribute("class","today");
}
}
saveToStorage();
}


function todayAsString(){
var dateObject = new Date();
var dateVector = [dateObject.getFullYear(),dateObject.getMonth()+1,dateObject.getDate()];
if(dateVector[1]<10){
dateVector[1] = "0" + dateVector[1] ;
}
var dateText = dateVector.join("-");
return dateText;
}



function addTodo() {
var todoText = inputElement.value;
if (todoText){
var todoItem = {
item: todoText,
data: todayAsString(),
span: dateDifference(todayAsString(),todayAsString()),
}
TODOS.push(todoItem);
inputElement.value = "";
}
update();
}



function deleteTodo(pos) {
TODOS.splice(pos,1); //.splice remove item em uma lista
update();
}


function saveToStorage() {
localStorage.setItem("lista__", JSON.stringify(TODOS));
}


function update(){
saveToStorage();
loadData();
renderTodos();
changeStyle();
}


function loadData(){
TODOS = JSON.parse(localStorage.getItem("lista__")) || [];
}


function dateDifference(xStr,yStr){
x = new Date(xStr);
y = new Date(yStr);
return parseInt((x.getTime()-y.getTime())/(1000*60*60*24));
}



update();






