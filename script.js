var addButton = document.getElementById('addBtn');
var removeButton = document.getElementById('removeBtn');

addButton.onclick = function addTask(event) {
    event.preventDefault();
    const list = document.getElementById("taskList")
    const newItem = document.createElement('li');
    // ensure you can't add a task with only spaces
    const text = document.getElementById("task").value.trim();
    if (text === '') {
        alert("You need to give this task a name!")
    } else {
        newItem.appendChild(document.createTextNode(text));
        list.appendChild(newItem);
        // create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '❌'; 
        removeBtn.style.marginLeft = '10px';
        removeBtn.onclick = function () {
            list.removeChild(newItem);
        };

        // Add the button to the list item
        newItem.appendChild(removeBtn);
        list.appendChild(newItem);
        document.getElementById("task").value = '';
    }
}

document.getElementById("task").addEventListener("keydown", function (e) {
    if (e.key === "Enter"){
        addButton.click();
    }
});

removeButton.onclick = function removeTask() {
    const list = document.getElementById("taskList")
    const items = list.children;
    if (items.length > 0) {
        list.removeChild(items[0])
    }
}