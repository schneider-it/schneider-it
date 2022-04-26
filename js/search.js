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

    // console.log(JSON.stringify(ergebnisse, null, 2));

    if (pattern != "" && ergebnisse != "") {
      if (!window.matchMedia("(pointer: coarse)").matches)
        document
          .querySelector(".search_div")
          .setAttribute("data-after", "Press Enter to open the first result!");
    } else {
      search_history = JSON.parse(localStorage.getItem("search_history"));
      BuildSearchHistory();
      document.querySelector(".search_div").setAttribute("data-after", "");
    }

    BuildErgebnisse(ergebnisse);
  }
});

function BuildErgebnisse(ergebnisse) {
  let container = document.getElementById("ergebnisse");
  container.innerHTML = "";

  let clear_search_history = document.getElementById("clear_search_history");
  clear_search_history.style.display = "none";

  for (let i = 0; i < ergebnisse.length; i++) {
    container.insertAdjacentHTML(
      "beforeend",
      "<div onclick=\"OnClickErgebnis('" +
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
}

function BuildSearchHistory() {
  let container = document.getElementById("ergebnisse");
  if (search_history.length == 1)
    container.innerHTML = "<h6>Latest Result:</h6>";
  else if (search_history.length > 1)
    container.innerHTML = "<h6>Latest Results:</h6>";

  let clear_search_history = document.getElementById("clear_search_history");
  if (search_history.length != 0) clear_search_history.style.display = "block";

  for (let i = 0; i < search_history.length; i++) {
    container.insertAdjacentHTML(
      "beforeend",
      "<div onclick=\"OnClickErgebnis('" +
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
}

document.onkeydown = function (e) {
  if (e.key === "Tab" || e.keyCode === 9) {
    if (!window.matchMedia("(pointer: coarse)").matches && ergebnisse != "")
      document
        .querySelector(".search_div")
        .setAttribute("data-after", "Press Enter to open the selected result!");

    let active_element = document.getElementById("active");
    if (active_element == null) {
      let container = document.getElementById("ergebnisse");
      let first_element = container.firstElementChild;
      if (first_element != null) {
        first_element.setAttribute("id", "active");
        setBackgroundofErgebnis(first_element);
      }
      return false;
    }
    let new_active_element;

    if (!e.shiftKey) {
      new_active_element = active_element.nextElementSibling;
    } else if (e.shiftKey) {
      new_active_element = active_element.previousElementSibling;
    }

    if (new_active_element != null) {
      active_element.setAttribute("id", "");
      active_element.style.background = "";
      new_active_element.setAttribute("id", "active");
      setBackgroundofErgebnis(new_active_element);
      new_active_element.scrollIntoViewIfNeeded(true);
    } else {
      active_element.setAttribute("id", "");
      let container = document.getElementById("ergebnisse");
      if (!e.shiftKey) {
        let first_element = container.firstElementChild;
        let last_element = container.lastElementChild;
        if (first_element != null) {
          last_element.style.background = "";
          first_element.setAttribute("id", "active");
          setBackgroundofErgebnis(first_element);
          first_element.scrollIntoViewIfNeeded(true);
        }
      } else if (e.shiftKey) {
        let last_element = container.lastElementChild;
        let first_element = container.firstElementChild;
        if (last_element != null) {
          first_element.style.background = "";
          last_element.setAttribute("id", "active");
          setBackgroundofErgebnis(last_element);
          last_element.scrollIntoViewIfNeeded(true);
        }
      }
    }

    return false;
  }

  if (e.key === "Enter" || e.keyCode === 13) {
    let pattern = document.getElementById("search").value;
    let ergebnisse = fuse.search(pattern);
    let active_element = document.getElementById("active");
    if (active_element != null) {
      // let link = active_element.firstElementChild.href;
      OnClickErgebnis(active_element);
    } else {
      // let link = ergebnisse[0].item.location;
      OnClickErgebnis(ergebnisse[0]);
    }

    return false;
  }
};

function LoadSearchHistory() {
  if (localStorage.getItem("search_history") != null)
    search_history = JSON.parse(localStorage.getItem("search_history"));
  else search_history = [];
  BuildSearchHistory();
}

function ClearSearchHistory() {
  search_history = [];
  localStorage.setItem("search_history", JSON.stringify(search_history));
  BuildSearchHistory();
}

function OnClickErgebnis(title, location, prettypath) {
  let isalreadyinHistory = false;
  for (let i = 0; i < search_history.length; i++) {
    if (
      (search_history[i].title == title &&
        search_history[i].location == location &&
        search_history[i].prettypath == prettypath) ||
      search_history.length >= 5
    )
      isalreadyinHistory = true;
  }
  if (!isalreadyinHistory) {
    search_history[search_history.length] = {
      title: title,
      location: location,
      prettypath: prettypath,
    };
  }
  console.log(search_history);
  localStorage.setItem("search_history", JSON.stringify(search_history));
  // window.location.href = location;
}

function setBackgroundofErgebnis(element) {
  if (element.children[0].href.includes("datenbanken"))
    element.style.background = "hsl(295, 80%, 69%)";
  else if (element.children[0].href.includes("programmiersprachen"))
    element.style.background = "hsl(208, 80%, 50%)";
  else if (element.children[0].href.includes("netzwerktechnik"))
    element.style.background = "hsl(37, 80%, 51%)";
  else if (element.children[0].href.includes("systemtechnik"))
    element.style.background = "hsl(158, 95%, 34%)";
}

$("#search_form").submit(function () {
  return false;
});
