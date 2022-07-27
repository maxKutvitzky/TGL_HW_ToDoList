let isListItemUpdating = false;
let isListItemSettings = false;
var toDoList = getList();
if(!toDoList){
    toDoList = [];
    renderEmptyOutput();
}
else{
    renderToDoList();
}

function renderToDoList(){
    isListItemSettings = false;
    isListItemUpdating = false;
    clearOutput();
    if(!toDoList.length){
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
    let inputText = document.getElementById("inputText").value;
    inputText = inputText.trim();
    if(!inputText){
        clearInput();
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
}
function backClick(button){
    renderToDoList();
}
function makeUpdateContent(button){
    const listItemContainerId = button.parentNode.parentNode.id;
    const listItemContainer = button.parentNode.parentNode;
    const applyButton = makeListItemButton("applyButton","applyClick(this)")
    const textArea = document.createElement("textarea");
    textArea.value = toDoList[listItemContainerId];
    textArea.setAttribute("class","updateTextArea");
    listItemContainer.innerHTML = "";
    listItemContainer.appendChild(applyButton);
    listItemContainer.appendChild(textArea);
}
function makeSettingsContent(button){
    const listButtonContainer = button.parentNode;
    listButtonContainer.innerHTML = "";
    listButtonContainer.appendChild(makeListItemButton("listItemDeleteButton","deleteClick(this)"));
    listButtonContainer.appendChild(makeListItemButton("listItemUpdateButton","updateClick(this)"));
    listButtonContainer.appendChild(makeListItemButton("listItemBackButton","backClick(this)"));
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
function settingsClick(button){
    if(!isListItemSettings){
        isListItemSettings = true;
        makeSettingsContent(button);
    }
    else{
        alert("already settings!");
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
    const itemTextContainer = makeItemTextContainer();
    const itemButtonContainer = makeItemButtonContainer();
    itemTextContainer.appendChild(makeListItemText(inputText));
    itemButtonContainer.appendChild(makeListItemButton("listItemSettingsButton", "settingsClick(this)"))
    itemContainer.appendChild(itemButtonContainer);
    itemContainer.appendChild(itemTextContainer);
    return itemContainer;
}
function makeItemButtonContainer(){
    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class","listItemButtonContainer");
    return buttonContainer;
}

function makeListItemContainer(){
    const listItemContainer = document.createElement("div");
    listItemContainer.setAttribute("class","listItemContainer");
    return listItemContainer;
}
function makeItemTextContainer(){
    const listItemTextContainer = document.createElement("div");
    listItemTextContainer.setAttribute("class","listItemTextContainer");
    return listItemTextContainer;
}
function makeListItemText(text){
    const listItemText = document.createElement("p");
    listItemText.setAttribute("class", "listItemText");
    listItemText.appendChild(document.createTextNode(text));
    return listItemText;
}
function makeListItemButton(className, actionName){
    const listItemButton = document.createElement("button");
    listItemButton.setAttribute("class", className);
    listItemButton.setAttribute("onclick", actionName)
    return listItemButton;
}
function renderEmptyOutput(){
    const emptyItemContainer = document.createElement("div");
    const emptyItemText = document.createElement("h3")
    emptyItemText.appendChild(document.createTextNode("Your ToDo list is empty :)"));
    emptyItemContainer.setAttribute("id","emptyListItem");
    emptyItemContainer.appendChild(emptyItemText);
    document.getElementById("listContainer").appendChild(emptyItemContainer);
}
