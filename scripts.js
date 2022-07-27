//Something like enum for storing default list names
const listNames ={
    toDo:"toDoList",
    Done:"doneList"
}
//Variable that stores current list name
let currentList = listNames.toDo;
//Flags that prevents multiple editing of list items
let isListItemUpdating = false;
let isListItemSettings = false;
//Getting lists from localStorage
toDoList = getList(listNames.toDo);
doneList = getList(listNames.Done);
toDoListInit();

//Initialization of ToDo list
function toDoListInit(){
    if(!toDoList){
        renderEmptyOutput(listNames.toDo);
    }
    else{
        renderToDoList();
    }
}
//Rendering of Done list
function renderDoneList(){
    changeSwitchButtonsStyle();
    clearOutput();
    if(!doneList.length){
        saveList(listNames.Done, doneList);
        renderEmptyOutput("Done");
    }else{
        for(let i=0; i<doneList.length;i++){
            addListItem(doneList[i],i,listNames.Done);
        }
    }
}
//Rendering of ToDo list
function renderToDoList(){
    changeSwitchButtonsStyle();
    isListItemSettings = false;
    isListItemUpdating = false;
    clearOutput();
    if(!toDoList.length){
        saveList(listNames.toDo, toDoList);
        renderEmptyOutput("ToDo");
    }else{
        for(let i=0; i<toDoList.length;i++){
            addListItem(toDoList[i],i,listNames.toDo);
        }
    }
}
//Changing styles of list switch buttons according to current list
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
//ToDo switch button, onclick event handler
function switchInProgressButtonClick(){
    currentList = listNames.toDo;
    renderToDoList();
    changeSwitchButtonsStyle();
}
//Done switch button, onclick event handler
function switchDoneButtonClick(){
    currentList = listNames.Done;
    renderDoneList();
    changeSwitchButtonsStyle();
}
//Renders empty list with appropriate message
function renderEmptyOutput(listName){
    const emptyItemContainer = document.createElement("div");
    const emptyItemText = document.createElement("h3")
    emptyItemText.appendChild(document.createTextNode("Your "+listName+" list is empty :)"));
    emptyItemContainer.setAttribute("id","emptyListItem");
    emptyItemContainer.appendChild(emptyItemText);
    document.getElementById("listContainer").appendChild(emptyItemContainer);
}
//Input button, event handler.
function inputClick(){
    const inputText = addInputToList();
    if(!inputText){
        return;
    }
    currentList = listNames.toDo;
    renderToDoList();
}
//Validation of specified input text
function validateText(text){
    text = text.trim();
    if(!text){
        alert("Your input is invalid")
        return false;
    }
    return true;
}

//Validating and adding text from input to ToDo list
function addInputToList(){
    let inputText = document.getElementById("inputText").value;
    if(!validateText(inputText)){
        clearInput();
        return;
    }
    addTextToList(inputText);
    return inputText;
}
//Delete button, onclick event handler
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
//Apply button, onclick event handler
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
//Back button, onclick event handler
function backClick(button){
    renderToDoList();
}
//Update button, onclick event handler
function updateClick(button){
    if(!isListItemUpdating){
        isListItemUpdating = true;
        makeUpdateContent(button);
    }
    else{
        alert("Editing not finished");
    }
}
//Settings button, onclick event handler
function settingsClick(button){
    if(!isListItemSettings){
        isListItemSettings = true;
        makeSettingsContent(button);
    }
    else{
        alert("Close current settings");
    }
}
//Done button, onclick event handler
function doneClick(button){
    const listItemContainerId = button.parentNode.parentNode.id;
    doneList.push(removeFromList(listItemContainerId, listNames.toDo));
    saveList(listNames.Done,doneList);
    renderToDoList();
}
//Clear input text
function clearInput(){
    document.getElementById("inputText").value = "";
}
//Clear output of lists
function clearOutput(){
    document.getElementById("listContainer").innerHTML="";
}
//Save specified list to localStorage
function saveList(listName, list){
    localStorage.setItem(listName, JSON.stringify(list))
}
//Get specified list to localStorage
function getList(listName){
    let storedList = JSON.parse(localStorage.getItem(listName));
    if(!storedList){
        return [];
    }
    return storedList;
}
//Update the text of a list item at a specific index
function updateListItem(text, elementIndex){
    toDoList[elementIndex] = text;
}
//Removing an item from a specific list
function removeFromList(index, listName){
    if(listName === listNames.toDo){
        return toDoList.splice(index,1);
    }else{
        doneList.splice(index,1);
    } 
}
//Adding an item to the ToDo list
function addTextToList(item){
    if(!toDoList){
        toDoList = [item];
    }
    else{
        toDoList.push(item);
    }
}
//Adding an HTML element that stores representation of a list items
//to list items container and saving the current state of a list 
//to localStorage
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
//Creating an HTML element which is the representation of a list element
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
//Creating an HTML element that stores all HTML elements of list item representation
function makeListItemContainer(){
    const listItemContainer = document.createElement("div");
    listItemContainer.setAttribute("class","listItemContainer");
    return listItemContainer;
}
//Creating an HTML element that stores all buttons of a list items
function makeItemButtonContainer(){
    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class","listItemButtonContainer");
    return buttonContainer;
}
//Creating an HTML element that stores text HTML element of a list item
function makeItemTextContainer(){
    const listItemTextContainer = document.createElement("div");
    listItemTextContainer.setAttribute("class","listItemTextContainer");
    return listItemTextContainer;
}
//Creating an HTML element that stores text of a list item
function makeListItemText(text){
    const listItemText = document.createElement("p");
    listItemText.setAttribute("class", "listItemText");
    listItemText.appendChild(document.createTextNode(text));
    return listItemText;
}
//Creating an HTML button element, depending on the parameters
function makeListItemButton(className, actionName){
    const listItemButton = document.createElement("button");
    listItemButton.setAttribute("class", className);
    listItemButton.setAttribute("onclick", actionName)
    return listItemButton;
}
//Creating HTML elements for the update function
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
//Creating HTML elements for the settings function
function makeSettingsContent(button){
    const listButtonContainer = button.parentNode;
    listButtonContainer.innerHTML = "";
    listButtonContainer.appendChild(makeListItemButton("listItemDeleteButton","deleteClick(this)"));
    listButtonContainer.appendChild(makeListItemButton("listItemUpdateButton","updateClick(this)"));
    listButtonContainer.appendChild(makeListItemButton("listItemBackButton","backClick(this)"));
}

