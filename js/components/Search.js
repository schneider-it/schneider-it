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

        if (pattern != "" && ergebnisse != "") {
            if (!window.matchMedia("(pointer: coarse)").matches)
                document
                    .querySelector(".search_div")
                    .setAttribute("data-after", "Press Enter to open the first result!");

            BuildErgebnisse(ergebnisse);
        } else {
            // search_history = JSON.parse(localStorage.getItem("search_history"));
            if (pattern != "") BuildSearchHistory(false);
            else BuildSearchHistory();
        }
    }
});

function BuildErgebnisse(ergebnisse) {
    let container = document.getElementById("ergebnisse");
    container.innerHTML = "";

    // let clear_search_history = document.getElementById("clear_search_history");
    // clear_search_history.style.display = "none";

    for (let i = 0; i < ergebnisse.length; i++) {
        container.insertAdjacentHTML(
            "beforeend",
            "<div class='ergebnis' onclick=\"OnClickErgebnis('" +
                ergebnisse[i].item.title +
                "', '" +
                ergebnisse[i].item.location +
                "', '" +
                ergebnisse[i].item.prettypath +
                "')\">" +
                "<h4>" +
                ergebnisse[i].item.title +
                "</h4>" +
                "<p>" +
                ergebnisse[i].item.prettypath +
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

    if (results_exist == false) {
        container.innerHTML =
            "<h5>Your search did not return any results.</h5>" +
            "<h6>Suggestions:</h6>" +
            "<ul>" +
            "<li>Make sure all words are spelled correctly.</li>" +
            "<li>Try other search terms.</li>" +
            "<li>Try more general search terms.</li>" +
            "</ul>";
        if (search_history.length >= 1) container.innerHTML += "<hr>";
    }
    if (search_history.length == 0) container.innerHTML += "";
    else if (search_history.length == 1)
        // Einzahl
        container.innerHTML +=
            "<div id='latest-result-heading' class='flexbox' space-between centered><h5>Latest Result:</h5>" +
            "<div id='clear_search_history' class='button' onclick='ClearSearchHistory()' small>" +
            "Clear Latest Result&nbsp;&nbsp;&nbsp;<i class='fa-solid fa-arrow-down'></i>" +
            "</div>" +
            "</div>";
    else if (search_history.length > 1)
        // Mehrzahl
        container.innerHTML +=
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
            "<div class='ergebnis' onclick=\"OnClickErgebnis('" +
                search_history[i].title +
                "', '" +
                search_history[i].location +
                "', '" +
                search_history[i].prettypath +
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

document.onkeydown = function (e) {
    if (e.key === "Tab" || e.key == "ArrowDown" || e.key == "ArrowUp") {
        e.preventDefault();
        if (!window.matchMedia("(pointer: coarse)").matches && ergebnisse != "")
            document
                .querySelector(".search_div")
                .setAttribute("data-after", "Press Enter to open the selected result!");

        let active_element = document.querySelector("[active]");
        if (active_element == null) {
            let container = document.getElementById("ergebnisse");
            let first_element = container.firstElementChild;
            while (first_element.classList.contains("ergebnis") == false)
                // Achtung
                first_element = first_element.nextElementSibling;
            if (first_element != null) {
                first_element.setAttribute("active", "");
                setBackgroundofErgebnis(first_element);
            }
            return false;
        }
        let new_active_element;

        if (!e.shiftKey || e.key == "ArrowDown") {
            new_active_element = active_element.nextElementSibling;
        } else if (e.shiftKey || e.key == "ArrowUp") {
            new_active_element = active_element.previousElementSibling;
        }

        if (new_active_element != null) {
            active_element.removeAttribute("active");
            active_element.style.background = "";
            new_active_element.setAttribute("active", "");
            setBackgroundofErgebnis(new_active_element);
            new_active_element.scrollIntoViewIfNeeded(true);
        } else {
            active_element.removeAttribute("active");
            let container = document.getElementById("ergebnisse");
            if (!e.shiftKey || e.key == "ArrowDown") {
                let first_element = container.firstElementChild;
                let last_element = container.lastElementChild;
                if (first_element != null) {
                    last_element.style.background = "";
                    first_element.setAttribute("active", "");
                    setBackgroundofErgebnis(first_element);
                    first_element.scrollIntoViewIfNeeded(true);
                }
            } else if (e.shiftKey || e.key == "ArrowUp") {
                let last_element = container.lastElementChild;
                let first_element = container.firstElementChild;
                if (last_element != null) {
                    first_element.style.background = "";
                    last_element.setAttribute("active", "");
                    setBackgroundofErgebnis(last_element);
                    last_element.scrollIntoViewIfNeeded(true);
                }
            }
        }
        return false;
    }

    if (e.key === "Enter" || e.keyCode === 13) {
        event.preventDefault();
        let pattern = document.getElementById("search").value;
        let ergebnisse = fuse.search(pattern);
        let active_element = document.querySelector("[active]");
        var index = 0;
        if (active_element != null) {
            for (var i = 0; i < ergebnisse.length; i++) {
                if (
                    active_element.children[0].innerHTML == ergebnisse[i].title &&
                    active_element.children[1].innerHTML == ergebnisse[i].prettypath
                )
                    index = i;
            }
        }
        OnClickErgebnis(
            ergebnisse[index].item.title,
            ergebnisse[index].item.location,
            ergebnisse[index].item.prettypath
        );
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

function OnClickErgebnis(title, location, prettypath) {
    let isalreadyinHistory = false;
    for (let i = 0; i < search_history.length; i++) {
        if (
            search_history[i].title == EscapeHTML(title) &&
            search_history[i].location == EscapeHTML(location) &&
            search_history[i].prettypath == EscapeHTML(prettypath)
        )
            isalreadyinHistory = true;
    }
    if (!isalreadyinHistory) {
        for (let i = search_history.length - 1; i >= 0; i--) {
            if (i <= 5) search_history[i + 1] = search_history[i];
        }
        search_history[0] = {
            title: EscapeHTML(title),
            location: EscapeHTML(location),
            prettypath: EscapeHTML(prettypath),
        };
    }
    localStorage.setItem("search_history", JSON.stringify(search_history));
    window.location.href = location;
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
}

$("#search_form").submit(function () {
    return false;
});

function EscapeHTML(unsafe) {
    console.log(unsafe);
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
