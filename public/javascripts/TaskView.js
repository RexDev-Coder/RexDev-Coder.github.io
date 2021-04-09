function Task() {
    let AddTask = document.querySelector('#new-task');
// first button
    let addTaskButton = document.getElementById("TaskButton");

// ul of #incomplete-tasks
    let DueTaskHolder = document.getElementById("incomplete-tasks");

// completed-tasks
    let CompletedTaskTab = document.getElementById("completed-tasks");

    let Array = [];

    function addTaskView() {
        // Get the input box
        AddTask = document.querySelector('#new-task');
        let ListItem = createNewTaskElement(AddTask.value);
        if (AddTask.value === "") {
            return;
        } else {
            DueTaskHolder.appendChild(ListItem);
            bindTaskEvents(ListItem, taskCompleted);
            let item = AddTask.value;
            Array.push(item.toString());
            for (let i = 0; i < Array.length; i++) {
                console.log(Array);
            }
        }
        AddTask.value = "";
    }


    function editTask() {
        console.log("Edit Task...");
        console.log("change 'edit' to 'save'");

        let listItem = this.parentNode;

        let editInput = listItem.querySelector('input[type=text]');
        let label = listItem.querySelector("label");
        let containsClass = listItem.classList.contains("editMode");
        // If class of the parent is .edit mode
        if (containsClass) {
            label.innerText = editInput.value;
            console.log(editInput.value);
        } else {
            editInput.value = label.innerText;
        }
        listItem.classList.toggle("editMode");
    }

    function deleteTask() {
        console.log("Delete Task...");

        let listItem = this.parentNode;
        let ul = listItem.parentNode;
        // Remove the parent list item from the ul.
        ul.removeChild(listItem);

    }

    function taskCompleted() {
        console.log("Complete Task...");

        // Append the task list item to the #completed-tasks
        let listItem = this.parentNode;
        CompletedTaskTab.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
        console.log("Step 2 " + listItem);
    }

    function taskIncomplete() {
        console.log("Incomplete Task...");
        // Mark task as incomplete.
        let listItem = this.parentNode;
        DueTaskHolder.appendChild(listItem);
        DueTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }

    addTaskButton.onclick = addTaskView;
    addTaskButton.addEventListener("click", addTaskView);

    function createNewTaskElement(TaskString) {

        let listItem = document.createElement("li");

        // input (checkbox)
        let checkBox = document.createElement("input"); // checkbox
        // label
        let label = document.createElement("label"); // label
        // input (text)
        let editInput = document.createElement("input"); // text
        // button.edit
        let editButton = document.createElement("button"); // edit button

        // button.delete
        let deleteButton = document.createElement("button"); // delete button

        label.innerText = TaskString;

        // Each elements, needs appending
        checkBox.type = "checkbox";
        editInput.type = "text";


        // innerText encodes special characters, HTML does not.
        editButton.innerText = "Edit";
        editButton.className = "edit";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";

        editButton.classList.add("Edit-Delete");
        deleteButton.classList.add("Edit-Delete");

        // and appending.
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        return listItem;
    }

    let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
        console.log("bind list item events");
        // select ListItems children
        let checkBox = taskListItem.querySelector("input[type=checkbox]");
        let editButton = taskListItem.querySelector("button.edit");
        let deleteButton = taskListItem.querySelector("button.delete");


        // Bind editTask to edit button.
        editButton.onclick = editTask;
        // Bind deleteTask to delete button.
        deleteButton.onclick = deleteTask;
        // Bind taskCompleted to checkBoxEventHandler.
        checkBox.onchange = checkBoxEventHandler;
    }

    /*---- Part 8 ----*/
// cycle over incompleteTaskHolder ul list items
// for each list item
    for (let i = 0; i < DueTaskHolder.children.length; i++) {

        // bind events to list items chldren(tasksCompleted)
        bindTaskEvents(DueTaskHolder.children[i], taskCompleted);
    }

// cycle over completedTasksHolder ul list items
    for (let i = 0; i < CompletedTaskTab.children.length; i++) {
        // bind events to list items chldren(tasksIncompleted)
        bindTaskEvents(CompletedTaskTab.children[i], taskIncomplete);
    }

    addTaskView();
}
