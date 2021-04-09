function toggle_Home() {
    document.getElementById("Home").style.display='inline-block';
    document.getElementById("Deadlines").style.display='none';
    document.getElementById("Tasks").style.display='none';
    document.getElementById("Report-writing").style.display='none';
    document.getElementById("Stress").style.display='none';
    document.getElementById("Help").style.display='none';

}

function toggle_deadline() {
    document.getElementById("Home").style.display='none';
    document.getElementById("Deadlines").style.display='inline-block';
    document.getElementById("Tasks").style.display='none';
    document.getElementById("Report-writing").style.display='none';
    document.getElementById("Stress").style.display='none';
    document.getElementById("Help").style.display='none';
}

function toggle_task() {
    document.getElementById("Home").style.display='none';
    document.getElementById("Deadlines").style.display='none';
    document.getElementById("Tasks").style.display='inline-block';
    document.getElementById("Report-writing").style.display='none';
    document.getElementById("Stress").style.display='none';
    document.getElementById("Help").style.display='none';
}

function toggle_report() {
    document.getElementById("Home").style.display='none';
    document.getElementById("Deadlines").style.display='none';
    document.getElementById("Tasks").style.display='none';
    document.getElementById("Report-writing").style.display='inline-block';
    /*document.getElementById("container").style.width = "98%";
    document.getElementById("menu").style.left = "105px";
    var ele = document.getElementsByClassName('card');
    for (var i = 0; i < ele.length; i++ ) {
        ele[i].style.left = "92px";
    }*/
    document.getElementById("Stress").style.display='none';
    document.getElementById("Help").style.display='none';
}

function toggle_help() {
    document.getElementById("Home").style.display='none';
    document.getElementById("Deadlines").style.display='none';
    document.getElementById("Tasks").style.display='none';
    document.getElementById("Report-writing").style.display='none';
    document.getElementById("Stress").style.display='none';
    document.getElementById("Help").style.display='inline-block';
}

function toggle_stress() {
    document.getElementById("Stress").style.display='inline-block';
    document.getElementById("Home").style.display='none';
    document.getElementById("Deadlines").style.display='none';
    document.getElementById("Tasks").style.display='none';
    document.getElementById("Report-writing").style.display='none';
    document.getElementById("Help").style.display='none';
}
