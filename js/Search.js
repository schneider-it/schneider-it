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

$("#search").on("keyup", function (e) {
    if (
        (e.key !== "Tab" || e.keyCode !== 9) &&
        (e.key !== "Shift" || e.keyCode !== 16) &&
        (e.key !== "Enter" || e.keyCode !== 13)
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
                document
                    .querySelector(".search_div")
                    .setAttribute("data-after", "Press Enter to open the first result!");

            BuildErgebnisse();
        } else {
            // search_history = JSON.parse(localStorage.getItem("search_history"));
            if (pattern != "") BuildSearchHistory(false);
            else BuildSearchHistory();
        }
    }
});

function BuildErgebnisse() {
    let container = document.getElementById("ergebnisse");
    container.innerHTML = "";

    let info = document.getElementById("info");
    info.innerHTML = "";

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

function BuildSearchHistory(results_exist) {
    if (search_history != "")
        document
            .querySelector(".search_div")
            .setAttribute("data-after", "Press Enter to open your latest result!");
    else document.querySelector(".search_div").setAttribute("data-after", "");

    const container = document.getElementById("ergebnisse");
    container.innerHTML = "";

    const info = document.getElementById("info");
    info.innerHTML = "";

    let pattern = document.getElementById("search").value;

    if (results_exist == false && pattern != "") {
        info.innerHTML =
            "<h5>Your search did not return any results.</h5>" +
            "<h6>Suggestions:</h6>" +
            "<ul>" +
            "<li>Make sure all words are spelled correctly.</li>" +
            "<li>Try other search terms.</li>" +
            "<li>Try more general search terms.</li>" +
            "</ul>";
        if (search_history.length >= 1) info.innerHTML += "<hr>";
    }
    if (search_history.length == 0) info.innerHTML += "";
    else if (search_history.length == 1)
        // Einzahl
        info.innerHTML +=
            "<div id='latest-result-heading' class='flexbox' space-between centered><h5>Latest Result:</h5>" +
            "<div id='clear_search_history' class='button' onclick='ClearSearchHistory()' small>" +
            "Clear Latest Result&nbsp;&nbsp;&nbsp;<i class='fa-solid fa-arrow-down'></i>" +
            "</div>" +
            "</div>";
    else if (search_history.length > 1)
        // Mehrzahl
        info.innerHTML +=
            "<div id='latest-result-heading' class='flexbox' space-between centered><h5>Latest Results:</h5>" +
            "<div id='clear_search_history' class='button' onclick='ClearSearchHistory()' small>" +
            "Clear Latest Results&nbsp;&nbsp;&nbsp;<i class='fa-solid fa-arrow-down'></i>" +
            "</div>" +
            "</div>";

    // let clear_search_history = document.getElementById("clear_search_history");
    // if (search_history.length != 0) clear_search_history.style.display = "block";
    // else clear_search_history.style.display = "none";

    for (let i = 0; i < search_history.length; i++) {
        container.insertAdjacentHTML(
            "beforeend",
            "<div class='ergebnis' id='" +
                search_history[i].id +
                "' onclick=\"OnClickErgebnis('" +
                search_history[i].id +
                "')\">" +
                "<h4>" +
                search_history[i].title +
                "</h4>" +
                "<p>" +
                search_history[i].prettypath +
                "</p>" +
                "</div>"
        );
    }

    return false;
}

var active_element;
var index;

document.onkeydown = function (e) {
    if (e.key === "Tab" || e.key == "ArrowDown" || e.key == "ArrowUp") {
        e.preventDefault();

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

        if (active_element == null) {
            index = 0;
        } else {
            if (!e.shiftKey || e.key == "ArrowDown") {
                if (++index > ergebnisse.length - 1) index = 0;
            } else if (e.shiftKey || e.key == "ArrowUp") {
                if (--index < 0) index = ergebnisse.length - 1;
            }
        }

        active_element = ergebnisse[index];

        console.log(fuse._docs);
        console.log(ergebnisse);

        // HTML neues active setzen

        html_active_element = document.getElementById(active_element.id);

        if (html_active_element) {
            html_active_element.setAttribute("active", "");
            setBackgroundofErgebnis(html_active_element);
            html_active_element.scrollIntoViewIfNeeded(true);
        }

        // Message korrigieren

        document
            .querySelector(".search_div")
            .setAttribute("data-after", "Press Enter to open the selected result!");

        return false;
    }

    if (e.key === "Enter" || e.keyCode === 13) {
        event.preventDefault();
        OnClickErgebnis(active_element.id);
    }
};

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
    search_history = [];
    localStorage.setItem("search_history", JSON.stringify(search_history));
    BuildSearchHistory(false);
}

function OnClickErgebnis(id) {
    let isalreadyinHistory = false;
    for (let i = 0; i < search_history.length; i++) {
        if (search_history[i].id == id) isalreadyinHistory = true;
    }
    if (!isalreadyinHistory) {
        for (let i = search_history.length - 1; i >= 0; i--) {
            if (i <= 5) search_history[i + 1] = search_history[i];
        }
        search_history[0] = fuse._docs[id];
    }
    localStorage.setItem("search_history", JSON.stringify(search_history));
    window.location.href = fuse._docs[id].location;
}

function setBackgroundofErgebnis(element) {
    if (
        element.children[1].innerHTML.includes("Datenbanken") ||
        element.children[0].innerHTML.includes("Datenbanken")
    )
        element.style.background = "hsl(295, 80%, 69%)";
    else if (
        element.children[1].innerHTML.includes("Programmiersprachen") ||
        element.children[0].innerHTML.includes("Programmiersprachen")
    )
        element.style.background = "hsl(208, 80%, 50%)";
    else if (
        element.children[1].innerHTML.includes("Netzwerktechnik") ||
        element.children[0].innerHTML.includes("Netzwerktechnik")
    )
        element.style.background = "hsl(37, 80%, 51%)";
    else if (
        element.children[1].innerHTML.includes("Systemtechnik") ||
        element.children[0].innerHTML.includes("Systemtechnik")
    )
        element.style.background = "hsl(158, 95%, 34%)";
    else if (
        element.children[1].innerHTML.includes("Betriebssysteme") ||
        element.children[0].innerHTML.includes("Betriebssysteme")
    )
        element.style.background = "hsl(267, 54%, 54%)";
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
