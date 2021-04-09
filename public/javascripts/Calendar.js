var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var startYear = 2017;
var endYear = 2021;
var month = 0;
var year = 0;
var selectedDays = [];
var eForm;
let SelectedDay = "";
let SelectedY = "";
let SelectedM = "";
let String = " ";

function drawCalendarMonths() {
    for (var i = 0; i < months.length; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = months[i];
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            var selectedMonth = i;
            return function () {
                month = selectedMonth;
                document.getElementById("curMonth").innerHTML = months[month];
                loadCalendarDays();
                return month;
            }
        })();

        document.getElementById("months").appendChild(doc);
    }
}

function loadCalendarMonths() {
    for (var i = 0; i < months.length; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = months[i];
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            var selectedMonth = i;
            return function () {
                month = selectedMonth;
                document.getElementById("curMonth").innerHTML = months[month];
                SelectedM = months[month];
                loadCalendarDays();
                return month;
            }
        })();

        document.getElementById("months").appendChild(doc);
    }
}

function loadCalendarYears() {
    document.getElementById("years").innerHTML = "";

    for (var i = startYear; i <= endYear; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = i;
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            var selectedYear = i;
            return function () {
                year = selectedYear;
                document.getElementById("curYear").innerHTML = year.toString();
                SelectedY = year;
                loadCalendarDays();
                return year;
            }
        })();

        document.getElementById("years").appendChild(doc);
    }
}

function loadCalendarDays() {
    document.getElementById("calendarDays").innerHTML = "";

    var tmpDate = new Date(year, month, 0);
    var num = daysInMonth(month, year);
    var dayofweek = tmpDate.getDay();       // find where to start calendar day of week

    for (var i = 0; i <= dayofweek; i++) {
        var d = document.createElement("div");
        d.classList.add("day");
        d.classList.add("blank");
        document.getElementById("calendarDays").appendChild(d);
    }

    for (var i = 0; i < num; i++) {
        var tmp = i + 1;
        var d = document.createElement("div");
        d.id = "calendarday_" + i;
        d.className = "day";

        d.innerHTML = tmp;
        d.dataset.day = tmp;
        let date = new Date();
        let dateNumber = date.getDate();
        let Month = date.toLocaleString('default', { month: 'short' });
        let n = Number(dateNumber);

        if (d.dataset.day === n.toString() && SelectedM === Month) {
            d.classList.add("today");
        }
        // easier to retrieve the date
        var tForm = "<h1>" + "EDIT" + " " + "/" + " " + "ADD" + " " + " EVENT" + "</h1>";
        tForm += "<div id='evt-date'>" + " " + "</div>";
        tForm += "<textarea id='evt-details' required>" + "</textarea>";
        tForm += "<input type='button' value='Close' onclick='remove()'/>";
        tForm += "<input type='button' value='Delete' onclick='deleteNote(String);' />";
        tForm += "<input type='button' value='Save' onclick='save(String);' />";
        eForm = document.createElement("form");
        eForm.innerHTML = tForm;
        var container = document.getElementById("cal-event");
        container.innerHTML = "";


        /* ****************** Click Event ********************** */
        d.addEventListener('click', function () {
            container.appendChild(eForm);
        });
        d.addEventListener('click', function () {
            jQuery(this).toggleClass('active');
            document.getElementById("evt-date").innerHTML = "";
            SelectedDay = this.dataset.day;
            let oop = document.createElement("div");
            let dateCalendar = document.getElementById("evt-date");
            dateCalendar.appendChild(oop);
            let date = document.createElement("div");
            date.innerHTML = SelectedDay.toString() + " " + SelectedM.toString() + " " + SelectedY.toString();
            oop.append(date);
            container.appendChild(eForm);
        });


        d.addEventListener('click', function () {
            let found = -1;
            document.getElementById("evt-details").value = "";
            if (!selectedDays.includes(this.dataset.day)) {
                selectedDays.push(this.dataset.day);
                for (let i = 0; i < selectedDays.length; i++) {
                    console.log(selectedDays[i]);
                    found = selectedDays[i] - 1;
                }
                String = document.getElementById("calendarday_" + found);
            } else {
                selectedDays.splice(selectedDays.indexOf(this.dataset.day), 1);
            }
        });

        /* **************************************************** */

        d.classList.add("CalendarButton");
        document.getElementById("calendarDays").appendChild(d);
    }
    var clear = document.createElement("div");
    clear.className = "clear";
    document.getElementById("calendarDays").appendChild(clear);
}

function daysInMonth(month, year) {
    var d = new Date(year, month + 1, 0);
    return d.getDate();
}

window.addEventListener('load', function () {
    var date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    document.getElementById("curMonth").innerHTML = months[month];
    document.getElementById("curYear").innerHTML = year.toString();
    SelectedY = year;
    SelectedM = months[month];
    console.log(months[month]);
    loadCalendarMonths();
    loadCalendarYears();
    loadCalendarDays();
});

function remove() {
    eForm.remove();
}

function save(String) {
    let div = document.createElement("p");
    div.innerHTML = document.getElementById("evt-details").value;
    String.appendChild(div);
}

function deleteNote(String) {
    document.getElementById("evt-details").value = "";
    let p = document.getElementsByTagName('p')[0];
    p.innerHTML = "";
    p.style.display = 'none';
}