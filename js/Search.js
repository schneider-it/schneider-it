// import * as Fuse from "./Fuse";

const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1,
    // location: 0,
    threshold: 0.3,
    // distance: 0,
    useExtendedSearch: true,
    ignoreLocation: true,
    ignoreFieldNorm: false,
    fieldNormWeight: 1,
    keys: [
        {
            name: "title",
            weight: 0.9,
        },
        {
            name: "prettypath",
            weight: 0.1,
        },
    ],
};

let fuse = null;
fetch("/tools/indexer/index.json")
    .then(function (response) {
        // The API call was successful!
        return response.json();
    })
    .then(function (data) {
        fuse = new Fuse(data, options);
    })
    .catch(function (err) {
        // There was an error
        alert("Error in loading json file.");
    });

let ergebnisse;
let search_history;

var active_element;
var index;

let search_history_element_count;

document.onkeydown = function (event) {
    if (
        event.key === "Tab" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Enter" ||
        event.key === "Shift" ||
        event.key === "Delete"
    )
        event.preventDefault();
    else document.getElementById("search").focus();
};

document.onkeyup = function (event) {
    if (
        !(
            event.key === "Tab" ||
            event.key === "ArrowDown" ||
            event.key === "ArrowUp" ||
            event.key === "Enter" ||
            event.key === "Shift" ||
            event.key === "Delete"
        )
    ) {
        let search = document.getElementsByClassName("search_div");
        //search.scrollIntoViewIfNeeded(true);

        let pattern = document.getElementById("search").value;
        ergebnisse = fuse.search(pattern);

        for (let i = 0; i < ergebnisse.length; i++) {
            const ergebnis = ergebnisse[i];
            ergebnisse[i] = ergebnis.item;
        }

        if (pattern != "" && ergebnisse != "") {
            if (!window.matchMedia("(pointer: coarse)").matches)
                document.querySelector("#information-after").innerHTML =
                    "Press <kbd light>Enter</kbd> to open the&nbsp;<div style='color: var(--main-color)'>first</div>&nbsp;result!";

            BuildErgebnisse();
        } else {
            // search_history = JSON.parse(localStorage.getItem("search_history"));
            if (pattern != "") BuildSearchHistory(false);
            else BuildSearchHistory();
        }
    } else if (event.key === "Tab" || event.key === "ArrowDown" || event.key === "ArrowUp") {
        if (
            window.matchMedia("(pointer: coarse)").matches &&
            ergebnisse == "" &&
            ergebnisse == null
        )
            return false;

        // HTML altes active löschen

        if (active_element) {
            let html_active_element = document.getElementById(active_element.id);

            if (html_active_element) {
                html_active_element.removeAttribute("active");
                html_active_element.style.background = "";
            }
        }

        // active Element herausfinden / index herausfinden

        if ((event.key === "Tab" && !event.shiftKey) || event.key == "ArrowDown") {
            if (++index > ergebnisse.length - 1 || active_element == null) index = 0;
        } else if ((event.key === "Tab" && event.shiftKey) || event.key == "ArrowUp") {
            if (--index < 0 || active_element == null) index = ergebnisse.length - 1;
        }

        active_element = ergebnisse[index];

        // Message korrigieren

        if (active_element)
            document.querySelector("#information-after").innerHTML =
                "Press <kbd light>Enter</kbd> to open the&nbsp;<div style='color: var(--main-color)'>selected</div>&nbsp;result!";

        // HTML neues active setzen

        html_active_element = document.getElementById(active_element.id);

        if (html_active_element) {
            html_active_element.setAttribute("active", "");
            setBackgroundofErgebnis(html_active_element);
            html_active_element.scrollIntoViewIfNeeded(true);
        }

        return false;
    } else if (event.key === "Enter") {
        if (active_element == null) OnClickErgebnis(ergebnisse[0].id);
        else OnClickErgebnis(active_element.id);
    } else if (event.key === "Delete") {
        ClearSearchHistory();
    }
};

function BuildErgebnisse() {
    let container = document.getElementById("ergebnisse");
    container.innerHTML = "";

    // let info = document.getElementById("info");
    // info.innerHTML = "";
    document.getElementById("info-no-result").style.display = "none";
    document.getElementById("info-hr").style.display = "none";
    document.getElementById("info-latest-result").style.display = "none";

    active_element = null;
    index = 0;

    // let clear_search_history = document.getElementById("clear_search_history");
    // clear_search_history.style.display = "none";

    for (let i = 0; i < ergebnisse.length; i++) {
        container.insertAdjacentHTML(
            "beforeend",
            "<div class='ergebnis' id='" +
                ergebnisse[i].id +
                "' onclick=\"OnClickErgebnis('" +
                ergebnisse[i].id +
                "')\">" +
                "<h4>" +
                ergebnisse[i].title +
                "</h4>" +
                "<p>" +
                ergebnisse[i].prettypath +
                "</p>" +
                "</div>"
        );
    }

    return false;
}

var singular_active;

function BuildSearchHistory(results_exist) {
    if (search_history != "")
        document.querySelector("#information-after").innerHTML =
            "Press <kbd light>Enter</kbd> to open your&nbsp;<div style='color: var(--main-color)'>latest</div>&nbsp;result!";
    else document.querySelector("#information-after").innerHTML = "";

    const container = document.getElementById("ergebnisse");
    container.innerHTML = "";

    // let info = document.getElementById("info");
    // info.innerHTML = "";
    document.getElementById("info-no-result").style.display = "none";
    document.getElementById("info-hr").style.display = "none";
    document.getElementById("info-latest-result").style.display = "none";

    active_element = null;
    index = 0;

    let pattern = document.getElementById("search").value;

    if (results_exist == false && pattern != "") {
        document.getElementById("info-no-result").style.display = "block";
        if (search_history.length >= 1) document.getElementById("info-hr").style.display = "block";
    }
    if (search_history.length >= 1) {
        let text = document.getElementById("info-latest-result").innerHTML;
        if (search_history.length == 1 && singular_active) {
            text = text.replace(/Results/g, "Result");
            singular_active = !singular_active;
        } else if (search_history.length > 1 && !singular_active) {
            text = text.replace(/Result/g, "Results");
            singular_active = !singular_active;
        }
        document.getElementById("info-latest-result").innerHTML = text;

        document.getElementById("info-latest-result").style.display = "grid";
    }

    // let clear_search_history = document.getElementById("clear_search_history");
    // if (search_history.length != 0) clear_search_history.style.display = "block";
    // else clear_search_history.style.display = "none";

    ergebnisse = search_history;

    for (let i = 0; i < ergebnisse.length; i++) {
        container.insertAdjacentHTML(
            "beforeend",
            "<div class='ergebnis' id='" +
                ergebnisse[i].id +
                "' onclick=\"OnClickErgebnis('" +
                ergebnisse[i].id +
                "')\">" +
                "<h4>" +
                ergebnisse[i].title +
                "</h4>" +
                "<p>" +
                ergebnisse[i].prettypath +
                "</p>" +
                "</div>"
        );
    }

    return false;
}

function OnClickErgebnis(id) {
    let isalreadyinHistory = false;
    for (let i = 0; i < search_history.length; i++) {
        if (search_history[i].id == id) isalreadyinHistory = true;
    }
    if (!isalreadyinHistory) {
        for (let i = search_history.length - 1; i >= 0; i--) {
            if (i < search_history_element_count - 1) search_history[i + 1] = search_history[i];
        }
        if (search_history_element_count > 0) search_history[0] = fuse._docs[id];
    }
    localStorage.setItem("search_history", JSON.stringify(search_history));
    window.location.href = fuse._docs[id].location;
}

function LoadSearchHistory() {
    if (localStorage.getItem("search_history") != null)
        search_history = JSON.parse(localStorage.getItem("search_history"));
    else search_history = [];

    // search_history = [];
    // localStorage.setItem("search_history", JSON.stringify(search_history));

    search_history = search_history.filter((element) => element.prettypath !== undefined);

    BuildSearchHistory();
}

function ClearSearchHistory() {
    if (confirm("Are you sure you want to delete your search history?")) {
        search_history = [];
        localStorage.setItem("search_history", JSON.stringify(search_history));
        BuildSearchHistory(false);
    }
}

var values = [0, 3, 5, 10, 30, 100, Infinity];

function OnLoadCounter() {
    if (localStorage.getItem("search_history_counter") != null)
        search_history_element_count = localStorage.getItem("search_history_counter");
    else search_history_element_count = 5;

    $("#slider-value").text(search_history_element_count);
    let counter_index = 2;
    for (let i = 0; i < values.length; i++) {
        const element = values[i];
        if (element == search_history_element_count) counter_index = i;
    }
    $("#slider-range").val(counter_index);
}

$("#slider-range").on("input", (event) => {
    $("#slider-value").text(values[event.target.value]);
});

$("#slider-range").on("change", (event) => {
    if (values[event.target.value] < search_history.length) {
        if (
            confirm(
                "Your changes would delete some of your latest results. Are you sure you want to delete them?"
            )
        ) {
            search_history_element_count = values[event.target.value];
            localStorage.setItem("search_history_counter", search_history_element_count);

            search_history = search_history.slice(0, search_history_element_count);
            localStorage.setItem("search_history", JSON.stringify(search_history));
            BuildSearchHistory(false);
        } else {
            let counter_index = 2;
            for (let i = 0; i < values.length; i++) {
                const element = values[i];
                if (element == search_history_element_count) counter_index = i;
            }
            $("#slider-range").val(counter_index);
            $("#slider-value").text(search_history_element_count);
        }
    } else {
        search_history_element_count = values[event.target.value];
        localStorage.setItem("search_history_counter", search_history_element_count);
    }
});

function setBackgroundofErgebnis(element) {
    const body = document.querySelector("body");

    if (
        body.getAttribute("colorTheme") == "dark" ||
        (body.getAttribute("colorTheme") == "auto" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        if (
            element.children[1].innerHTML.includes("Datenbanken") ||
            element.children[0].innerHTML.includes("Datenbanken")
        ) {
            element.style.background = "hsl(295, 80%, 69%)";
            document.querySelector("#information-after").innerHTML =
                "Press <kbd light>Enter</kbd> to open the&nbsp;<div style='color: hsl(295, 80%, 69%)'>selected</div>&nbsp;result!";
        } else if (
            element.children[1].innerHTML.includes("Programmiersprachen") ||
            element.children[0].innerHTML.includes("Programmiersprachen")
        ) {
            element.style.background = "hsl(208, 80%, 50%)";
            document.querySelector("#information-after").innerHTML =
                "Press <kbd light>Enter</kbd> to open the&nbsp;<div style='color: hsl(208, 80%, 50%)'>selected</div>&nbsp;result!";
        } else if (
            element.children[1].innerHTML.includes("Netzwerktechnik") ||
            element.children[0].innerHTML.includes("Netzwerktechnik")
        ) {
            element.style.background = "hsl(37, 80%, 51%)";
            document.querySelector("#information-after").innerHTML =
                "Press <kbd light>Enter</kbd> to open the&nbsp;<div style='color: hsl(37, 80%, 51%)'>selected</div>&nbsp;result!";
        } else if (
            element.children[1].innerHTML.includes("Systemtechnik") ||
            element.children[0].innerHTML.includes("Systemtechnik")
        ) {
            element.style.background = "hsl(158, 95%, 34%)";
            document.querySelector("#information-after").innerHTML =
                "Press <kbd light>Enter</kbd> to open the&nbsp;<div style='color: hsl(158, 95%, 34%)'>selected</div>&nbsp;result!";
        } else if (
            element.children[1].innerHTML.includes("Betriebssysteme") ||
            element.children[0].innerHTML.includes("Betriebssysteme")
        ) {
            element.style.background = "hsl(267, 54%, 54%)";
            document.querySelector("#information-after").innerHTML =
                "Press <kbd light>Enter</kbd> to open the&nbsp;<div style='color: hsl(267, 54%, 54%)'>selected</div>&nbsp;result!";
        }
    } else element.style.background = "hsl(235, 86%, 65%)";
}

$("#search_form").submit(function () {
    return false;
});

function EscapeHTML(unsafe) {
    return (
        unsafe
            // .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
    );
}
