let isListItemUpdating = false;
var toDoList = getList();
if(!toDoList){
    toDoList = [];
    renderEmptyOutput();
}
else{
    renderToDoList();
}

function renderToDoList(){
    clearOutput();
    if(toDoList.length == 0){
        saveList();
        renderEmptyOutput();
    }else{
        for(var i=0; i<toDoList.length;i++){
            addListItem(toDoList[i],i);
        }
    }
    
}
function renderEmptyOutput(){
    const emptyItemContainer = document.createElement("div");
    const emptyItemText = document.createElement("h3")
    emptyItemText.appendChild(document.createTextNode("Your ToDo list is empty :)"));
    emptyItemContainer.setAttribute("id","emptyListItem");
    emptyItemContainer.appendChild(emptyItemText);
    document.getElementById("listContainer").appendChild(emptyItemContainer);
}
function inputClick(){
    const inputText = getInput();
    if(!inputText){
        return;
    }
    renderToDoList();
}

function getInput(){
    const inputText = document.getElementById("inputText").value;
    if(!inputText){
        alert("not validated")
        return;
    }
    addTextToList(inputText);
    return inputText;
}
function deleteClick(button){
    const listItemContainerId = button.parentNode.parentNode.id;
    removeFromList(listItemContainerId);
    renderToDoList();
}
function applyClick(button){
    const listItemContainerId = button.parentNode.id;
    updatedText = document.getElementsByClassName("updateTextArea")[0].value;
    updateListItem(updatedText,listItemContainerId);
    renderToDoList();
    isListItemUpdating = false;
}
function makeUpdateContent(button){
    const listItemContainerId = button.parentNode.parentNode.id;
    const listItemContainer = button.parentNode.parentNode;
    const applyButton = document.createElement("button");
    const textArea = document.createElement("textarea");
    textArea.value = toDoList[listItemContainerId];
    textArea.setAttribute("class","updateTextArea");
    applyButton.appendChild(document.createTextNode("apply"));
    applyButton.setAttribute("onclick","applyClick(this)");
    listItemContainer.innerHTML = "";
    listItemContainer.appendChild(applyButton);
    listItemContainer.appendChild(textArea);
}
function updateClick(button){
    if(!isListItemUpdating){
        isListItemUpdating = true;
        makeUpdateContent(button);
    }
    else{
        alert("already updating!");
    }
}
function clearInput(){
    document.getElementById("inputText").value = "";
}
function clearOutput(){
    document.getElementById("listContainer").innerHTML="";
}
function saveList(){
    localStorage.setItem("toDoList", JSON.stringify(toDoList))
}
function getList(){
    let storedList = JSON.parse(localStorage.getItem("toDoList"));
    return storedList;
}

function updateListItem(text, elementIndex){
    toDoList[elementIndex] = text;
}

function removeFromList(index){
    toDoList.splice(index,1);
}

function addTextToList(item){
    if(!toDoList){
        toDoList = [item];
    }
    else{
        toDoList.push(item);
    }
}

function addListItem(itemText, itemIndex){
    const listItem = makeListItem(itemText, itemIndex);
    if(!listItem){
        return;
    }
    document.getElementById("listContainer").appendChild(listItem);
    clearInput();
    saveList(); 
}

function makeListItem(inputText, itemIndex){
    const itemContainer = makeListItemContainer();
    itemContainer.setAttribute("id",itemIndex);
    const itemTextContainer = makeItemTextContainer(inputText);
    const itemButtonContainer = makeItemButtonContainer();
    itemContainer.appendChild(itemButtonContainer);
    itemContainer.appendChild(itemTextContainer);
    return itemContainer;
}
function makeItemButtonContainer(){
    const buttonContainer = document.createElement("div");
    const itemDeleteButton = makeListItemDeleteButton();
    const itemUpdateButton = makeListItemUpdateButton();
    buttonContainer.setAttribute("class","listItemButtonContainer");
    buttonContainer.appendChild(itemDeleteButton);
    buttonContainer.appendChild(itemUpdateButton);
    return buttonContainer;
}

function makeListItemContainer(){
    const listItemContainer = document.createElement("div");
    listItemContainer.setAttribute("class","listItemContainer");
    return listItemContainer;
}
function makeItemTextContainer(text){
    const listItemTextContainer = document.createElement("div");
    listItemTextContainer.setAttribute("class","listItemTextContainer");
    listItemTextContainer.appendChild(makeListItemText(text));
    return listItemTextContainer;
}
function makeListItemText(text){
    const listItemText = document.createElement("p");
    listItemText.setAttribute("class", "listItemText");
    listItemText.appendChild(document.createTextNode(text));
    return listItemText;
}
function makeListItemDeleteButton(){
    const listItemDeleteButton = document.createElement("button");
    listItemDeleteButton.setAttribute("class","listItemDeleteButton");
    listItemDeleteButton.setAttribute("onclick","deleteClick(this)")
    return listItemDeleteButton;
}
function makeListItemUpdateButton(){
    const listItemUpdateButton = document.createElement("button");
    listItemUpdateButton.setAttribute("class","listItemUpdateButton");
    listItemUpdateButton.setAttribute("onclick","updateClick(this)")
    return listItemUpdateButton;
}
function renderEmptyOutput(){
    const emptyItemContainer = document.createElement("div");
    const emptyItemText = document.createElement("h3")
    emptyItemText.appendChild(document.createTextNode("Your ToDo list is empty :)"));
    emptyItemContainer.setAttribute("id","emptyListItem");
    emptyItemContainer.appendChild(emptyItemText);
    document.getElementById("listContainer").appendChild(emptyItemContainer);
}
