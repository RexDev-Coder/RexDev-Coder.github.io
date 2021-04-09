let Deadlines;
let tr;
let lakeTbody = document.querySelector("#Table tbody");
Deadlines = [
    {
        Deadline_id: "MC234089",
        Coursework_module_id: "CST3140",
        Coursework_Module_Name: "Novel Interaction Technologies",
        Coursework_Name: "Coursework 2 Report Submission",
        Date_details: new Date(new Date('April 14, 2021 11:00:00')),
        Coursework_criteria: "VUI Interaction for Computer Science Students and to help them (web html, css, javascript, web speech api",
    },
    {
        Deadline_id: "MC257434",
        Coursework_module_id: "CST3180",
        Coursework_Module_Name: "User Experience (UX) Design",
        Coursework_Name: "Phase 3 Report submission link",
        Date_details: new Date(new Date('March 22, 2021 11:59:00')),
        Coursework_criteria: "Design Review and analysis done  by students/ users to know if good or not",
    },
    {
        Deadline_id: "MC704567",
        Coursework_module_id: "CST3340",
        Coursework_Module_Name: "Business Intelligence",
        Coursework_Name: "Coursework 2 Report Submission",
        Date_details: new Date(new Date('April 22, 2021 05:30:00')),
        Coursework_criteria: "Analyse dataset come with conclusion and make data understandable",
    },
    {
        Deadline_id: "MC205187",
        Coursework_module_id: "CST3990",
        Coursework_Module_Name: "Undergraduate Individual Project",
        Coursework_Name: "Final project report submission",
        Date_details: new Date(new Date('March 22, 2021 12:00:00')),
        Coursework_criteria: "Last final report + final project with prototype",
    },
    {
        Deadline_id: "MC905467",
        Coursework_module_id: "CST3340",
        Coursework_Module_Name: "Business Intelligence",
        Coursework_Name: "Coursework 1 Report Submission",
        Date_details: new Date(new Date('March 12, 2021 04:30:00')),
        Coursework_criteria: "Come up with proper case study and make use of olap, etc",
    },
    {
        Deadline_id: "MC402378",
        Coursework_module_id: "CST3170",
        Coursework_Module_Name: "Artificial Intelligence",
        Coursework_Name: "Coursework 1 Code Submission",
        Date_details: new Date(new Date('April 1, 2021 04:30:00')),
        Coursework_criteria: "Core proper handwriting recognition software & make run time faster",
    },
];

$("#notify").hide();
$('#reading').click(function () {
    let text = document.getElementById("textTitle").innerHTML;
    SayText(text);
});
let RandomTask = RandomTaskAnswer();
let RandomSentence = RandomString();
let RandomList = RandomTaskAdd();
let RandomHelpAnswer = HelpList();
let VideoList = VideoAnswer();
let VideoId = RandomVideo();
let CategoryAsk = CategorySearch();
let suggestions_List = suggestions();
let recognition = new webkitSpeechRecognition();
if ("webkitSpeechRecognition" in window) {
    $(function () {
            try {
                recognition = new webkitSpeechRecognition();
                fillDeadline();
            } catch (e) {
                recognition = Object;
            }

            $('#speaking').click(function () {
                recognition.start();
                $('.pulse-loader').show();
                $('#speak').html("Listening");
                $('#speak-img').hide();
                console.log("recognition started");
            });

            recognition.onspeechend = function () {
                $('.pulse-loader').hide();
                $('#speak').html("Tap To Speak");
                $('#speak-img').show();
                console.log("ending voice");
            }

            recognition.continuous = false;
            recognition.continuous = false;
            recognition.interimResults = false;
            var chatBody = document.getElementById("chatBody");

            recognition.onresult = function (event) {
                let divUser = document.createElement("div");
                let divWeb = document.createElement("div");
                console.log("hello");
                divUser.classList.add("chat_box_body_self");
                divWeb.classList.add("chat_box_body_other");
                let txtRec = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    txtRec += event.results[i][0].transcript;
                    divUser.innerHTML = txtRec;
                }
                chatBody.append(divUser);
                console.log(divUser);

                if (txtRec.toLowerCase().trim().includes("deadlines") || txtRec.toLowerCase().trim().includes("coursework deadlines") || txtRec.toLowerCase().trim().includes("deadlines for courseworks ")) {
                    let divWeb = document.createElement("div");
                    divWeb.classList.add("chat_box_body_other");

                    /*Asking for what coursework does the person need deadlines for*/
                    divWeb.innerHTML = RandomSentence;
                    setTimeout(function () {
                        $('divWeb').show();
                    }, 5000);
                    chatBody.append(divWeb);

                    SayText(divWeb.innerHTML);
                    recognition.stop();
                    recognition.onresult = function (event) {
                        let CDeadlines = '';
                        let divUser1 = document.createElement("div");
                        divUser1.classList.add("chat_box_body_self");
                        for (let i = event.resultIndex; i < event.results.length; ++i) {
                            CDeadlines += event.results[i][0].transcript;
                            divUser1.innerHTML = CDeadlines;
                        }
                        divUser1.innerHTML = CDeadlines;
                        chatBody.append(divUser1);

                        let Tbody = document.querySelector("#Table tbody");
                        Tbody.innerHTML = "";
                        let SearchInput;

                        let divWeb1 = document.createElement("div");
                        divWeb1.classList.add("chat_box_body_other");
                        divWeb1.innerHTML = CategoryAsk;
                        chatBody.append(divWeb1);
                        SayText(divWeb1.innerHTML);
                        let CategoryDetails = "";
                        recognition.onresult = function (event) {
                            for (let i = event.resultIndex; i < event.results.length; ++i) {
                                CategoryDetails += event.results[i][0].transcript;
                            }
                            let divUser3 = document.createElement("div");
                            divUser3.classList.add("chat_box_body_self");
                            divUser3.innerHTML = CategoryDetails;
                            chatBody.append(divUser3);

                            let divWeb3 = document.createElement("div");
                            divWeb3.classList.add("chat_box_body_other");
                            divWeb3.innerHTML = "Got it!";
                            chatBody.append(divWeb3);
                            if (CategoryDetails.includes("module name") || CategoryDetails.includes("coursework module")
                                || CategoryDetails.includes("module") || CategoryDetails.includes("name")) {
                                SearchInput = CDeadlines.toLowerCase();
                                document.getElementById("search").value = SearchInput;
                                const ModuleName = Deadlines.filter(
                                    Deadline => {
                                        return Deadline.Coursework_Module_Name.toLowerCase() === SearchInput;
                                    }
                                );
                                console.log("Search Input: " + SearchInput);
                                console.log(" Module Name : " + ModuleName[0].Coursework_Module_Name.toLowerCase());
                                for (let i = 0; i < ModuleName.length; i++) {
                                    if (SearchInput.toLowerCase() === ModuleName[i].Coursework_Module_Name.toLowerCase()) {
                                        let divWeb4 = document.createElement("div");
                                        divWeb4.innerHTML = "Success";
                                        chatBody.append(divWeb4);
                                        SayText(divWeb4.innerHTML);
                                        let tr = document.createElement("tr");
                                        tr.innerHTML =
                                            "<td>" + ModuleName[i].Deadline_id + "</td>" +
                                            "<td>" + ModuleName[i].Coursework_module_id + "</td>" +
                                            "<td>" + ModuleName[i].Coursework_Module_Name + "</td>" +
                                            "<td>" + ModuleName[i].Coursework_Name + "</td>" +
                                            "<td>" + ModuleName[i].Date_details + "</td>" +
                                            "<td>" + ModuleName[i].Coursework_criteria + "</td>";

                                        let td = document.createElement("td");
                                        let editButton = document.createElement("button"); // edit button
                                        let deleteButton = document.createElement("button"); // delete button

                                        editButton.type = "button";
                                        deleteButton.type = "button";

                                        editButton.innerText = "Edit";
                                        editButton.class = "edit";
                                        deleteButton.innerText = "Delete";
                                        deleteButton.class = "delete";

                                        editButton.classList.add("Button_Column");
                                        deleteButton.classList.add("Button_Column");

                                        td.appendChild(editButton);
                                        td.appendChild(deleteButton);
                                        tr.appendChild(td);

                                        Tbody.appendChild(tr);
                                        Tbody.appendChild(tr);
                                        Tbody.appendChild(tr);

                                        console.log(SearchInput + " " + "SearchInput");
                                        toggle_deadline();
                                        ul(1);
                                        setTimeout(EmptySearch, 300000);

                                    } else {
                                        let divWeb5 = document.createElement("div");
                                        divWeb5.classList.add("chat_box_body_other");
                                        divWeb5.innerHTML = "Not Found";
                                        chatBody.append(divWeb5);
                                        SayText(divWeb5.innerHTML);
                                        document.getElementsByName("SearchTable")[0].value = CDeadlines;
                                        $("tbody").hide();
                                        $('.no-result').show();
                                        toggle_deadline();
                                        ul(1);
                                        setTimeout(EmptySearch, 10000);
                                    }
                                }
                            } else {
                                let divWeb6 = document.createElement("div");
                                SayText(divWeb6.innerHTML = "Pretty this category doesn't exist yet...sorry. " +
                                    "Go next door if you want! :)");
                                chatBody.append(divWeb6);
                                SayText(divWeb6.innerHTML);
                                toggle_deadline();
                                ul(1);
                            }
                        }
                    }
                    AddRow();
                } else if (txtRec.toLowerCase().trim().includes("to do") || txtRec.toLowerCase().includes("list") || txtRec.trim().toLowerCase().includes("show my task list") || txtRec.trim().toLowerCase().includes("task")) {
                    let divWeb7 = document.createElement("div");
                    divWeb7.innerHTML = RandomTask;
                    chatBody.appendChild(divWeb7);
                    SayText(divWeb7.innerHTML);
                    recognition.stop();
                    recognition.onresult = function (event) {
                        let Tasks = " ";
                        let AddTask = " ";
                        for (let i = event.resultIndex; i < event.results.length; ++i) {
                            Tasks += event.results[i][0].transcript;
                        }
                        let divUser2 = document.createElement("div");
                        divUser2.innerHTML = Tasks;
                        chatBody.appendChild(divUser2);
                        SayText(divUser2.innerHTML);

                        let TaskList = ["Add to to do list", "Add", "to do", "Add to to do", "Add to my list", "to my list"];
                        let found = false;
                        for (let i = 0; i < TaskList.length; i++) {
                            if (Tasks.includes(TaskList[i].toLowerCase())) {
                                found = true;
                                break;
                            }
                        }

                        if (found) {
                            let divWeb8 = document.createElement("div");
                            divWeb8.innerHTML = RandomList;
                            chatBody.appendChild(divWeb8);
                            SayText(divWeb8.innerHTML);
                            recognition.onresult = function (event) {
                                for (let i = event.resultIndex; i < event.results.length; ++i) {
                                    AddTask += event.results[i][0].transcript;
                                }
                                let DivUser3 = document.createElement("div");
                                DivUser3.innerHTML = AddTask;
                                chatBody.appendChild(DivUser3);
                                SayText(DivUser3.innerHTML);
                                document.querySelector('#new-task').value = AddTask;

                                let divWeb9 = document.createElement("div");
                                divWeb9.classList.add("chat_box_body_other");
                                divWeb9.innerHTML = "Got it!"
                                chatBody.append(divWeb9);
                                SayText(divWeb9.innerHTML);
                                toggle_task();
                                ul(2);
                            }
                        }
                    }
                } else if (txtRec.toLowerCase().trim().includes("help") || txtRec.toLowerCase().trim().includes("help commands") || txtRec.toLowerCase().trim().includes("help please") || txtRec.toLowerCase().trim().includes("help me here")) {
                    let divWeb = document.createElement("div");
                    divWeb.classList.add("chat_box_body_other");
                    divWeb.innerHTML = RandomHelpAnswer;
                    chatBody.append(divWeb);
                    SayText(divWeb.innerHTML);
                    recognition.stop();
                    toggle_help();
                    ul(4);

                } else if (txtRec.toLowerCase().trim().includes("Play a funny video") || txtRec.toLowerCase().trim().includes("Funny videos please") || txtRec.toLowerCase().trim().includes("funny video")
                    || txtRec.toLowerCase().trim().includes("funny") || txtRec.toLowerCase().trim().includes("video")) {
                    let divWeb = document.createElement("div");
                    divWeb.classList.add("chat_box_body_other");
                    divWeb.innerHTML = VideoList;
                    chatBody.append(divWeb);
                    recognition.stop();
                    toggle_stress();
                    ul(5);
                    let video = document.getElementById(VideoId);
                    video.checked = true;
                    video.play();
                } else {
                    let divWeb = document.createElement("div");
                    divWeb.classList.add("chat_box_body_other");
                    divWeb.innerHTML = "Do you want me to give you a suggestion? Yes or No?";
                    chatBody.append(divWeb);
                    SayText(divWeb.innerHTML);
                    let TRecBack = "";
                    recognition.onresult = function (event) {
                        for (let i = event.resultIndex; i < event.results.length; ++i) {
                            TRecBack += event.results[i][0].transcript;
                        }
                        let divUser = document.createElement("div");
                        divUser.classList.add("chat_box_body_self");
                        divUser.innerHTML = TRecBack;
                        chatBody.append(divUser);

                        if (TRecBack.toLowerCase().trim().includes("yes")) {
                            let divWeb3 = document.createElement("div");
                            divWeb3.classList.add("chat_box_body_other");
                            divWeb3.innerHTML = suggestions_List;
                            setTimeout(function () {
                                $('divWeb3').show();
                            }, 5000);
                            chatBody.append(divWeb3);
                        } else if (TRecBack.toLowerCase().trim().includes("no")) {
                            let divWeb4 = document.createElement("div");
                            divWeb4.classList.add("chat_box_body_other");
                            chatBody.append(divWeb4);
                            SayText(divWeb4.innerHTML = "Okie Dokie! Wander around and explore!");
                        }
                    }
                }
            }
        }
    );


} else {
    console.log("Speech Recognition Not Available")
}

function RandomString() {
    const Phrases = [
        "For which course do you need deadlines for?",
        "What module do you want deadlines for?",
        "Tell me for what module?",
        "Tell me the title of the module please."
    ];
    return Phrases[Math.floor(Math.random() * Phrases.length)];
}

function RandomTaskAnswer() {
    const Task = [
        "Ok so you want to see your tasks or...?",
        "Your tasks are my command! ",
        "Just tell me why you want em tasks!",
        "To make it easier, just tell me what to do with your tasks!"
    ];
    return Task[Math.floor(Math.random() * Task.length)];
}

function HelpList() {
    const helpList = [
        "Ok! Help Incoming!",
        "Ok! You will certainly get help!",
        "My my, you will get the help you need! Don't worry!",
        "Ok ok, don't stress, to understand, look at this Help page!",
        "Help you need, help you shall receive!"
    ];
    return helpList[Math.floor(Math.random() * helpList.length)];
}

function RandomTaskAdd() {
    const Task = [
        "Ok Tell me what task you wanna put there!",
        "Ok! Tell me what is the task you want to do later!",
        "Tell me the task and I'll put it there :)",
        "Just tell me the task and I'll do the rest of the work!"
    ];
    return Task[Math.floor(Math.random() * Task.length)];
}

function suggestions() {
    const suggestions = [
        "Go to the Deadlines section and see if you have anything upcoming maybe?",
        "Go to the task sections and fill in the tasks for today! don't close the tab to not lose your tasks!",
        "Maybe go to see if you need any templates for your assignments?",
        "Maybe relax and watch a funny video?"
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
}

function CategorySearch() {
    const Task = [
        "Specify a category such as module name and I'll look for it!",
        "Just tell me the date of the deadline and I'll show you!",
        "Just tell me the module title and I'll do the rest?",
        "Do you remember the date of the deadline?"
    ];
    return Task[Math.floor(Math.random() * Task.length)];
}

function VideoAnswer() {
    const VideoAnswer = [
        "OK, on it!",
        "Funny you want, funny you get!",
        "Relaxing once in a while is okay!",
        "Sure buddy! Chill! ",
        "What do you want: animals, Mr. Bean? ",
        "Funny Videos, sure! what do you want?",
        "Funny video you want, funny videos you get! What'd you want? Let's see what you get!",
        "OK! What do you wanna see!"
    ];
    return VideoAnswer[Math.floor(Math.random() * VideoAnswer.length)];
}

function RandomVideo() {
    const RVideo = [
        "video-1",
        "video-2",
        "video-3",
        "video-4",
        "video-5",
        "video-6"
    ];
    return RVideo[Math.floor(Math.random() * RVideo.length)];
}

function fillDeadline() {
    let element = document.getElementById("Table");
    if (element != null) {
        lakeTbody = document.querySelector("#Table tbody");
        console.log("business intelligence" === Deadlines[2].Coursework_Module_Name.toString().toLowerCase());
        addDataToTbody(lakeTbody, Deadlines);
        addColumn();
        AddRow();
    } else {
        console.log("successful !");
    }
}

function addDataToTbody(nl, data) { // nl -> NodeList, data -> array with objects
    data.forEach((d, i) => {
        let tr = nl.insertRow(i);
        Object.keys(d).forEach((k, j) => { // Keys from object represent th.innerHTML
            let cell = tr.insertCell(j);
            cell.innerHTML = d[k]; // Assign object values to cells
        });
        nl.appendChild(tr);
    })

}

function EmptySearch() {
    lakeTbody = document.querySelector("#Table tbody");
    lakeTbody.innerHTML = "";
    document.getElementsByName("SearchTable")[0].value = '';
    fillDeadline();
}


function addColumn() {
    for (let i = 0; i < Deadlines.length; i++) {
        tr = lakeTbody.getElementsByTagName("tr");
        let td = document.createElement("td");
        let editButton = document.createElement("button"); // edit button
        let deleteButton = document.createElement("button"); // delete button

        let CancelButton = document.createElement("button");
        let SaveButton = document.createElement("button");

        let EditForm = document.getElementById("FormEdit");
        editButton.type = "button";
        deleteButton.type = "button";

        CancelButton.type = "button";
        SaveButton.type = "button";

        editButton.innerText = "Edit";
        editButton.class = "edit";
        EditForm.style.display = "none";
        deleteButton.innerText = "Delete";
        deleteButton.class = "delete";

        CancelButton.innerText = "Cancel";
        SaveButton.innerText = "Save";

        CancelButton.class = "cancel";
        SaveButton.class = "save";

        editButton.classList.add("Button_Column");
        editButton.classList.add("EditContent");
        editButton.id = "edit-button";
        editButton.onclick = Edit;

        deleteButton.classList.add("Button_Column");
        deleteButton.classList.add("DeleteContent");
        deleteButton.id = "DeleteRow";
        deleteButton.onclick = deleteRow;

        CancelButton.classList.add("btn-sm");
        CancelButton.onclick = Cancel;

        SaveButton.classList.add("bt-save");

        td.appendChild(editButton);
        td.appendChild(deleteButton);
        td.appendChild(SaveButton);
        td.appendChild(CancelButton);
        tr[i].appendChild(td);
        $(document).find('.bt-save').hide();
        $(document).find('.btn-sm').hide();
    }

    function deleteRow() {
        let table = document.getElementById('Table');
        let cells = table.getElementsByTagName('td');

        for (let i = 0; i < cells.length; i++) {
            // Take each cell
            let cell = cells[i];
            // do something on onclick event for cell
            cell.onclick = function () {
                // Get the row id where the cell exists
                let rowId = this.parentNode.rowIndex;
                let rowSelected = table.getElementsByTagName('tr')[rowId];
                rowSelected.remove();
            }
        }
    }

    function Edit() {
        $(document).find('.DeleteContent').hide();
        $(document).find('.EditContent').hide();
        $(document).find('.bt-save').show();
        $(document).find('.btn-sm').show();

        let table = document.getElementById('Table');

        let Index;
        let rows = document.getElementById('Table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].onclick = function () {
                Index = this.rowIndex;

                let EditForm = document.getElementById("FormEdit");
                EditForm.style.display = "inline-block";
                let rowSelected = table.getElementsByTagName('tr')[Index];
                rowSelected.className += "selected";
                document.getElementById("deadlineId").setAttribute('value', rowSelected.cells[0].innerHTML);
                document.getElementById("ModuleId").setAttribute('value', rowSelected.cells[1].innerHTML);
                document.getElementById("ModuleName").setAttribute('value', rowSelected.cells[2].innerHTML);
                document.getElementById("CWName").setAttribute('value', rowSelected.cells[3].innerHTML);
                let Date = convertDate(rowSelected.cells[4].innerHTML);
                console.log(Date);
                document.getElementById("Edit-Date").innerHTML = Date;
                document.getElementById("Edit-criteria").innerHTML = rowSelected.cells[5].innerHTML;
            }
        }
    }

    function convertDate(inputFormat) {
        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }

        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    function Cancel() {
        $(document).find('.DeleteContent').show();
        $(document).find('.EditContent').show();
        $(document).find('.bt-save').hide();
        $(document).find('.btn-sm').hide();

        let table = document.getElementById('Table');

        let Index;
        var rows = document.getElementById('Table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].onclick = function () {
                Index = this.rowIndex;
                let rowSelected = table.getElementsByTagName('tr')[Index];
                rowSelected.classList.remove("selected");
                let EditForm = document.getElementById("FormEdit");
                EditForm.style.display = "none";
            }
        }
        closeForm();
    }

    function closeForm() {
        document.getElementById("CloseForm").onclick = function () {
            this.parentNode.parentNode.parentNode
                .removeChild(this.parentNode.parentNode);
            return false;
        };
    }
}


function AddRow() {
    lakeTbody = document.querySelector("#Table tbody");
    let rowCount = lakeTbody.rows.length;
    let NewRow = lakeTbody.insertRow(rowCount);

    let Cell1 = NewRow.insertCell(0);
    let Cell2 = NewRow.insertCell(1);
    let Cell3 = NewRow.insertCell(2);
    let Cell4 = NewRow.insertCell(3);
    let Cell5 = NewRow.insertCell(4);
    let Cell6 = NewRow.insertCell(5);
    let Cell7 = NewRow.insertCell(6);

    let newText = "<div class='select-box'>" +
        "<label for='select-box1' class='label select-box1'><span class='label-desc'>Choose your Module ID</span> </label>" +
        "<select id='select-box1' class='select form-control'>" +
        "<option disabled hidden selected>Select One</option>" +
        "<option value='Choice 1'>CST3140</option>" +
        "<option value='Choice 2'>CST3180</option>" +
        "<option value='Choice 3'>CST3340</option>" +
        "<option value='Choice 4'>CST3990</option>" +
        "<option value='Choice 5'>CST3170</option>" +
        "</select>" +
        "</div>";

    let Text2 =
        "<div class='form1 form-group'>" +
        "<label for='ex3' class='col-sm-10 control-label'>Deadline ID</label>" +
        "<div class='col-xs-6'>" +
        "<input type='text' class='form-control' id='Deadline-ID' value='MC' placeholder='Deadline ID'>" +
        "<small class='text-muted'>Enter Deadline ID here.</small>" +
        "</div>" +
        "</div>";

    let Text3 = "<div class='select-box'>" +
        "<label for='select-box2' class='label select-box1'><span class='label-desc'>Choose Module Name</span> </label>" +
        "<select id='select-box2' class='select form-control'>" +
        "<option disabled hidden selected>Select One</option>" +
        "<option value='Choice 1'>Novel Interaction Technologies</option>" +
        "<option value='Choice 2'>User Experience (UX) Design</option>" +
        "<option value='Choice 3'>Business Intelligence</option>" +
        "<option value='Choice 4'>Undergraduate Individual Project</option>" +
        "<option value='Choice 5'>Artificial Intelligence</option>" +
        "</select>" +
        "</div>";

    let Text4 = "<div class='form2 form-group'>" +
        "<label for='ex3' class='col-sm-10 control-label'>Coursework Title</label>" +
        "<div class='col-xs-6'>" +
        "<input type='text' class='form-control' id='CW-Name' placeholder='Coursework Name'>" +
        "<small class='text-muted'>Enter Coursework Title here.</small>" +
        "</div>" +
        "</div>";

    let Text5 = '<form class="form-group form3">' +
        ' <label for="birthday">Birthday:</label>\n' +
        "  <input style='width: 100%;' type=\"date\" class='form-control' id=\"birthday\" name=\"birthday\">\n" +
        "</form>";

    let Text6 = "<div class=\"form-group-sm\">\n" +
        "  <label for=\"form18\">Coursework Criteria(in your own words)</label>\n" +
        "  <textarea id=\"criteria\" class=\"form-control\" rows=\"3\"></textarea>\n" +
        "</div>";

    let AddButton = document.createElement("button");
    AddButton.type = "button";
    AddButton.innerText = "Add";
    AddButton.class = "Add";
    AddButton.classList.add("btn");
    AddButton.classList.add("btn-outline-dark");
    AddButton.classList.add("waves-effect");
    AddButton.classList.add("waves-light");
    AddButton.id = "AddButton";

    let div2 = document.createElement("div");
    div2.innerHTML = Text2;
    Cell1.appendChild(div2);

    let div = document.createElement("div");
    div.innerHTML = newText;
    Cell2.appendChild(div);

    let div3 = document.createElement("div");
    div3.innerHTML = Text3;
    Cell3.appendChild(div3);

    let div4 = document.createElement("div");
    div4.innerHTML = Text4;
    Cell4.appendChild(div4);

    let div5 = document.createElement("div");
    div5.innerHTML = Text5;
    Cell5.appendChild(div5);

    let div6 = document.createElement("div");
    div6.innerHTML = Text6;
    Cell6.appendChild(div6);

    let div7 = document.createElement("div");
    div7.appendChild(AddButton);
    div7.classList.add("center");
    Cell7.appendChild(div7);

    $("#AddButton").click(function () {
        let DeadlineId = document.getElementById("Deadline-ID").value;
        let StringDeadlineID = DeadlineId.toString();
        console.log("String Deadline ID: " + StringDeadlineID);

        let SelectedModuleID = document.getElementById("select-box1");
        let StringModuleID = SelectedModuleID.options[SelectedModuleID.selectedIndex].text;
        console.log("String Module ID: " + StringModuleID);

        let SelectedModuleName = document.getElementById("select-box2");
        let StringModuleName = SelectedModuleName.options[SelectedModuleName.selectedIndex].text;
        console.log("String Module Name: " + StringModuleName);

        let CWTitle = document.getElementById("CW-Name").value;
        let StringCWTitle = CWTitle.toString();
        console.log("String CW Name: " + StringCWTitle);

        /* Date value inserted by user*/
        let data = document.getElementById("birthday").value;
        let date = new Date(data);
        let stringDate = date.toString();
        console.log("String Date: " + stringDate);

        let Criteria = document.getElementById("criteria").value;
        let StringCriteria = Criteria.toString();
        console.log("String CW Name: " + StringCriteria);

        let dataNew = {
            "Deadline_id": StringDeadlineID,
            "Coursework_module_id": StringModuleID,
            "Coursework_Module_Name": StringModuleName,
            "Coursework_Name": StringCWTitle,
            "Date_details": stringDate,
            "Coursework_criteria": StringCriteria
        };
        Deadlines.push(dataNew);
        addDataToTbody(lakeTbody, Deadlines);
        lakeTbody.innerHTML = "";
        fillDeadline();
        console.log(Deadlines);
    });

}

function SayText(String) {
    let muted = 0;
    const utterance = new SpeechSynthesisUtterance(String);
    utterance.rate = 1;
    utterance.pitch = 1;
    if (muted === 0) {
        utterance.volume = 1;
    } else if (muted === 1) {
        utterance.volume = 0;
    }
    speechSynthesis.speak(utterance);
}