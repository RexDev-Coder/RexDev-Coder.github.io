var newArray = jQuery.extend(true, [], Deadlines);

function getInputValue() {
    let SearchInput = document.getElementById("search").value;
    var Tbody = document.querySelector("#Table tbody");
    Tbody.innerHTML = "";
    for (var i = 0; i < newArray.length; i++) {
        if (newArray[i].Deadline_id === SearchInput || newArray[i].Coursework_module_id === SearchInput || newArray[i].Coursework_Module_Name === SearchInput ||
            newArray[i].Coursework_Name === SearchInput || newArray[i].Date_details === SearchInput || newArray[i].Coursework_criteria === SearchInput) {
            let tr = document.createElement("tr");
            tr.innerHTML =
                "<td>" + newArray[i].Deadline_id + "</td>" +
                "<td>" + newArray[i].Coursework_module_id + "</td>" +
                "<td>" + newArray[i].Coursework_Module_Name + "</td>" +
                "<td>" + newArray[i].Coursework_Name + "</td>" +
                "<td>" + newArray[i].Date_details + "</td>" +
                "<td>" + newArray[i].Coursework_criteria + "</td>";

            var td = document.createElement("td");
            let editInput = document.createElement("input");
            let editButton = document.createElement("button"); // edit button
            let deleteButton = document.createElement("button"); // delete button

            editInput.type = "text";
            editButton.type = "button";
            deleteButton.type = "button";

            editButton.innerText = "Edit";
            editButton.className = "edit";
            deleteButton.innerText = "Delete";
            deleteButton.className = "delete";

            editButton.classList.add("Button_Column");
            deleteButton.classList.add("Button_Column");

            td.appendChild(editButton);
            td.appendChild(deleteButton);
            tr.appendChild(td);

            Tbody.appendChild(tr);
            Tbody.appendChild(tr);
        } else {
            $("tbody").hide();
            $('.no-result').show();
            setTimeout(NoSearchQuery, 5000);
            return false;
        }

    }
    AddRow();
    setTimeout(EmptySearch, 10000);
}

function NoSearchQuery() {
    lakeTbody = document.querySelector("#Table tbody");
    lakeTbody.innerHTML = "";
    $("tbody").show();
    $('.no-result').hide();
    fillDeadline();
}