const listNames ={
    toDo:"toDoList",
    Done:"doneList"
}
var currentList = listNames.toDo;
let isListItemUpdating = false;
let isListItemSettings = false;
toDoList = getList(listNames.toDo);
doneList = getList(listNames.Done);
toDoListInit();

function toDoListInit(){
    if(!toDoList){
        renderEmptyOutput(listNames.toDo);
    }
    else{
        renderToDoList();
    }
}
function renderDoneList(){
    changeSwitchButtonsStyle();
    clearOutput();
    if(!doneList.length){
        saveList(listNames.Done, doneList);
        renderEmptyOutput("Done");
    }else{
        for(var i=0; i<doneList.length;i++){
            addListItem(doneList[i],i,listNames.Done);
        }
    }
}
function renderToDoList(){
    changeSwitchButtonsStyle();
    isListItemSettings = false;
    isListItemUpdating = false;
    clearOutput();
    if(!toDoList.length){
        saveList(listNames.toDo, toDoList);
        renderEmptyOutput("ToDo");
    }else{
        for(var i=0; i<toDoList.length;i++){
            addListItem(toDoList[i],i,listNames.toDo);
        }
    }
}
function changeSwitchButtonsStyle(){
    const doneButton = document.getElementById("doneButton");
    const toDoButton = document.getElementById("inProgressButton");
    switch (currentList){
        case listNames.toDo:
            toDoButton.style.backgroundColor = "black";
            toDoButton.style.color = "white";
            doneButton.style.backgroundColor = "white";
            doneButton.style.color = "black";
            break;
        case listNames.Done:
            toDoButton.style.backgroundColor = "white";
            toDoButton.style.color = "black";
            doneButton.style.backgroundColor = "black";
            doneButton.style.color = "white";
            break;

    }
}
function switchInProgressButtonClick(){
    currentList = listNames.toDo;
    renderToDoList();
    changeSwitchButtonsStyle();
}
function switchDoneButtonClick(){
    currentList = listNames.Done;
    renderDoneList();
    changeSwitchButtonsStyle();
}
function renderEmptyOutput(listName){
    const emptyItemContainer = document.createElement("div");
    const emptyItemText = document.createElement("h3")
    emptyItemText.appendChild(document.createTextNode("Your "+listName+" list is empty :)"));
    emptyItemContainer.setAttribute("id","emptyListItem");
    emptyItemContainer.appendChild(emptyItemText);
    document.getElementById("listContainer").appendChild(emptyItemContainer);
}
function inputClick(){
    const inputText = getInput();
    if(!inputText){
        return;
    }
    currentList = listNames.toDo;
    renderToDoList();
}
function validateText(text){
    text = text.trim();
    if(!text){
        alert("not validated")
        return false;
    }
    return true;
}
function getInput(){
    let inputText = document.getElementById("inputText").value;
    if(!validateText(inputText)){
        clearInput();
        return;
    }
    addTextToList(inputText);
    return inputText;
}
function deleteClick(button){
    const listItemContainerId = button.parentNode.parentNode.id;
    switch (currentList){
        case listNames.toDo:
            removeFromList(listItemContainerId, currentList);
            renderToDoList();
            break;
        case listNames.Done:
            removeFromList(listItemContainerId, currentList);
            renderDoneList();
            break;
    }
}
function applyClick(button){
    const listItemContainerId = button.parentNode.id;
    updatedText = document.getElementsByClassName("updateTextArea")[0].value;
    if(!validateText(updatedText)){
        renderToDoList();
        return;
    }
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
function doneClick(button){
    const listItemContainerId = button.parentNode.parentNode.id;
    doneList.push(removeFromList(listItemContainerId, listNames.toDo));
    saveList(listNames.Done,doneList);
    renderToDoList();
}
function clearInput(){
    document.getElementById("inputText").value = "";
}
function clearOutput(){
    document.getElementById("listContainer").innerHTML="";
}
function saveList(listName, list){
    localStorage.setItem(listName, JSON.stringify(list))
}
function getList(listName){
    let storedList = JSON.parse(localStorage.getItem(listName));
    if(!storedList){
        return [];
    }
    return storedList;
}
function updateListItem(text, elementIndex){
    toDoList[elementIndex] = text;
}

function removeFromList(index, listName){
    if(listName === listNames.toDo){
        return toDoList.splice(index,1);
    }else{
        doneList.splice(index,1);
    } 
}

function addTextToList(item){
    if(!toDoList){
        toDoList = [item];
    }
    else{
        toDoList.push(item);
    }
}

function addListItem(itemText, itemIndex, listName){
    const listItem = makeListItem(itemText, itemIndex, listName);
    if(!listItem){
        return;
    }
    document.getElementById("listContainer").appendChild(listItem);
    clearInput();
    if(currentList === listNames.toDo){
        saveList(listNames.toDo ,toDoList); 
    }else{
        saveList(listNames.Done ,doneList);
    }
    
}
function makeListItem(inputText, itemIndex, listName){
    const itemContainer = makeListItemContainer();
    itemContainer.setAttribute("id",itemIndex);
    const itemTextContainer = makeItemTextContainer();
    const itemButtonContainer = makeItemButtonContainer();
    itemTextContainer.appendChild(makeListItemText(inputText));
    if(listName === listNames.toDo){
        itemButtonContainer.appendChild(makeListItemButton("listItemDoneButton", "doneClick(this)"))
        itemButtonContainer.appendChild(makeListItemButton("listItemSettingsButton", "settingsClick(this)"))
    }else{
        itemButtonContainer.appendChild(makeListItemButton("listItemDeleteButton","deleteClick(this)"));
    }
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

