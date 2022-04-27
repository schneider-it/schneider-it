function OnLoadAll() {
    LoadHeader();
    LoadFooter();
    VanillaTiltEffect();
    SetCardColors();
    AddCopyButtons();
}

function OnLoadIndex() {
    LoadHeader();
    LoadFooter();
    VanillaTiltEffect();
    SetCardColors();
}

function OnLoadLeaf() {
    LoadHeader();
    LoadFooter();
    AddCopyButtons();
}

function OnLoadSearch() {
    LoadHeaderwithoutSearch();
    LoadFooter();
}

function OnLoadMin() {
    LoadFooterandHeader();
}

function OnScroll() {
    ScrollIndicator();
}

// function OnKeyDown() {
//     e = window.event;
//     KeyCombination(e);
// }

function VanillaTiltEffect() {
    VanillaTilt.init(document.querySelectorAll(".card"), {
        max: 8,
        speed: 500,
    });
}

function ThemeSwitch() {
    const body = document.querySelector("body");
    const themeSwitch = document.querySelector(".themeSwitch");

    let burger = document.querySelector(".burger");
    let blurfilter = document.querySelector(".navigation-blur-filter");
    let navigation = document.querySelector(".navigation");

    themeSwitch.onclick = function () {
        if (localStorage.getItem("colorTheme") == null) {
            if (window.matchMedia("(prefers-color-scheme: light)").matches) {
                body.setAttribute("colorTheme", "dark");
                localStorage.setItem("colorTheme", "dark");
            } else {
                body.setAttribute("colorTheme", "light");
                localStorage.setItem("colorTheme", "light");
            }
        } else {
            if (body.getAttribute("colorTheme") == "dark") {
                body.setAttribute("colorTheme", "light");
                localStorage.setItem("colorTheme", "light");
            } else {
                body.setAttribute("colorTheme", "dark");
                localStorage.setItem("colorTheme", "dark");
            }
        }
    };

    if (localStorage.getItem("colorTheme") != null) {
        if (localStorage.getItem("colorTheme") == "dark") {
            body.setAttribute("colorTheme", "dark");
        } else if (localStorage.getItem("colorTheme") == "light") {
            body.setAttribute("colorTheme", "light");
        }
    }
}

function SetCardColors() {
    var colors = [
        "#f6e58d",
        "#f9ca24",
        "#ffbe76",
        "#f0932b",
        "#ff7979",
        "#eb4d4b",
        "#badc58",
        "#6ab04c",
        "#7ed6df",
        "#22a6b3",
        "#e056fd",
        "#be2edd",
        "#686de0",
        "#4834d4",
        "#30336b",
        "#130f40",
        "#fc5c65",
        "#eb3b5a",
        "#fd9644",
        "#fa8231",
        "#f7b731",
        "#26de81",
        "#20bf6b",
        "#2bcbba",
        "#0fb9b1",
        "#45aaf2",
        "#2d98da",
        "#4b7bec",
        "#3867d6",
        "#a55eea",
        "#f1c40f",
        "#8e44ad",
        "#27ae60",
        "#8854d0",
        "#1abc9c",
        "#e67e22",
    ];

    var cards_before = document.querySelectorAll(".card-before");

    for (let i = 0; i < cards_before.length; i++) {
        const card_before = cards_before[i];
        card_before.style.background =
            colors[Math.floor(Math.random() * colors.length)];
    }
}

function AddCopyButtons() {
    for (var i = 0; i < $(".code").length; i++) {
        $(".code")[i].id = "code-" + i;
        $("<div/>", {
            text: "Copy",
            class: "code-copy",
            id: "code-copy-" + i,
            onclick:
                'CopyToClipboardCode("#code-' +
                i +
                '"); ShowCopyAccess("#code-copy-' +
                i +
                '")',
        }).appendTo("#code-" + i);
    }
}

function CopyToClipboardCode(id) {
    var code = document.querySelector(id);
    let text = code.textContent;
    text = text.replace(/^\s+|\s+$/gm, "");
    navigator.clipboard.writeText(text.substring(0, text.length - 5));
}

function ShowCopyAccess(id) {
    var code = document.querySelector(id);
    code.setAttribute("copied", "");
    setTimeout(function () {
        code.removeAttribute("copied");
    }, 1200);
}

function LoadHeader() {
    if (document.getElementById("header") != null) {
        console.log("inside");
        $("#header").load("/components/header.html", function () {
            NavigationActiveToggle();
            ThemeSwitch();
            TastenkombinationenActiveToggle();
            ActiveFollowCursor();
        });
    }
}

function LoadHeaderwithoutSearch() {
    if (document.getElementById("header") != null) {
        console.log("inside");
        $("#header").load(
            "/components/header_without_search.html",
            function () {
                NavigationActiveToggle();
                ThemeSwitch();
                TastenkombinationenActiveToggle();
                ActiveFollowCursor();
            }
        );
    }
}

function LoadFooter() {
    if (document.getElementById("footer") != null) {
        $("#footer").load("/components/footer.html", function () {
            var myPix = new Array(
                "/img/vogel1.png",
                "/img/vogel2.png",
                "/img/vogel3.png",
                "/img/vogel4.gif",
                "/img/vogel5.png",
                "/img/vogel6.png",
                "/img/vogel7.png",
                "/img/vogel9.png",
                "/img/vogel10.png",
                "/img/vogel11.png",
                "/img/vogel12.png",
                "/img/vogel13.png",
                "/img/vogel14.png",
                "/img/vogel15.png",
                "/img/vogel16.png",
                "/img/vogel17.png",
                "/img/vogel18.png",
                "/img/vogel19.gif",
                "/img/vogel20.gif",
                "/img/vogel21.gif",
                "/img/vogel22.gif",
                "/img/vogel23.gif",
                "/img/vogel24.gif",
                "/img/vogel25.gif"
            );
            var randomNum = Math.floor(Math.random() * myPix.length);
            try {
                document.getElementById("vogel").src = myPix[randomNum];
                if (
                    Math.random() < 0.5 &&
                    myPix[randomNum] != "/img/vogel24.gif"
                ) {
                    document.getElementById("vogel").style.transform =
                        "scale(-1, 1)";
                }
                // document.getElementById("vogel_a").style.cursor = "default";

                // if(Math.random() < .18){
                //     document.getElementById("vogel_a").href = "34573r366.html";
                //     document.getElementById("vogel_a").style.cursor = "pointer";
                // }
            } catch {
                console.log("There are no birds in here!");
            }
        });
    }
}

function ScrollIndicator() {
    var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    if (document.getElementById("scroll_indicator") != null) {
        document.getElementById("scroll_indicator").style.width =
            scrolled + "%";
    }
}

//#region MouseTracker & Navigation

function NavigationActiveToggle() {
    let burger = document.querySelector(".burger");
    let blurfilter = document.querySelector(".navigation-blur-filter");
    let navigation = document.querySelector(".navigation");
    burger.onclick = function () {
        burger.getAttribute("active") != "true"
            ? burger.setAttribute("active", "true")
            : burger.removeAttribute("active"); // damit zu X wird
        blurfilter.getAttribute("active") != "true"
            ? blurfilter.setAttribute("active", "true")
            : blurfilter.removeAttribute("active"); // damit Hintergrund verschwommen
        navigation.getAttribute("active") != "true"
            ? navigation.setAttribute("active", "true")
            : navigation.removeAttribute("active"); // damit Navigation sehen
    };
    blurfilter.onclick = function () {
        burger.removeAttribute("active");
        blurfilter.removeAttribute("active");
        navigation.removeAttribute("active");
    };
}

function TastenkombinationenActiveToggle() {
    let tastenkombinationenSwitch = document.querySelector(
        ".tastenkombinationenSwitch"
    );
    let background_close = document.querySelector(
        ".tastenkombinationen-background_close"
    );
    let tastenkombinationen_iframe = document.querySelector(
        ".tastenkombinationen-iframe"
    );
    tastenkombinationenSwitch.onclick = function () {
        background_close.classList.add("active"); // damit Hintergrund verschwommen
        tastenkombinationen_iframe.style.display = "block";
        console.log(background_close);
    };
    background_close.onclick = function () {
        background_close.classList.remove("active");
        tastenkombinationen_iframe.style.display = "none";
    };
}

function ActiveFollowCursor() {
    let clientX = 0,
        clientY = 0,
        navclientY = 0;

    const navLinks = document.querySelectorAll(".navlink");

    const calculateDistance = (x, y, boundary) => {
        const distance = Math.sqrt(x * x + y * y);
        return distance <= boundary;
    };

    const mouseEnterHandler = (event, element) => {
        const rect = element.getBoundingClientRect();
        const diffX = clientX - rect.width / 2 - rect.left;
        const diffY = clientY - rect.height / 2 - rect.top;
        if (calculateDistance(diffX / 2, diffY / 2, 10000)) {
            element.style.transform = `translate(${diffX * 1.2}px, ${
                diffY * 1.2
            }px)`;
        }
    };

    const mouseLeaveHandler = (event, element) => {
        element.style.transform = `translate(0, 0)`;
    };

    const mouseNavEnterHandler = (event, element) => {
        const rect = element.getBoundingClientRect();
        const diffX = clientX - rect.width / 2 - rect.left;
        const diffY = navclientY - rect.height / 2 - rect.top;
        if (
            calculateDistance(diffX, diffY, 0.15625 * document.body.offsetWidth)
        ) {
            element.style.transform = `translate(${diffX / 2}px, ${
                diffY / 2
            }px)`;
        }
    };

    document.addEventListener("mousemove", (e) => {
        clientX = e.clientX;
        clientY = e.clientY;
        navclientY = e.clientY + 30; // +20 damit sich Navigation nicht überlappt
    });

    if (!window.matchMedia("(pointer: coarse)").matches) {
        // none, fine, coarse
        navLinks.forEach((link) => {
            link.addEventListener("mousemove", (event) =>
                mouseNavEnterHandler(event, link)
            );
            link.addEventListener("mouseleave", (event) =>
                mouseLeaveHandler(event, link)
            );
        });

        if ((themeSwitch = document.querySelector(".themeSwitch"))) {
            themeSwitch.addEventListener("mousemove", (event) =>
                mouseEnterHandler(event, themeSwitch)
            );
            themeSwitch.addEventListener("mouseleave", (event) =>
                mouseLeaveHandler(event, themeSwitch)
            );
        }

        if ((burger = document.querySelector(".burger"))) {
            burger.addEventListener("mousemove", (event) =>
                mouseEnterHandler(event, burger)
            );
            burger.addEventListener("mouseleave", (event) =>
                mouseLeaveHandler(event, burger)
            );
        }

        if ((back_button = document.querySelector(".back_button"))) {
            back_button.addEventListener("mousemove", (event) =>
                mouseEnterHandler(event, back_button)
            );
            back_button.addEventListener("mouseleave", (event) =>
                mouseLeaveHandler(event, back_button)
            );
        }

        if ((search_button = document.querySelector(".search_button"))) {
            search_button.addEventListener("mousemove", (event) =>
                mouseEnterHandler(event, search_button)
            );
            search_button.addEventListener("mouseleave", (event) =>
                mouseLeaveHandler(event, search_button)
            );
        }

        if (
            (tastenkombinationenSwitch = document.querySelector(
                ".tastenkombinationenSwitch"
            ))
        ) {
            tastenkombinationenSwitch.addEventListener("mousemove", (event) =>
                mouseEnterHandler(event, tastenkombinationenSwitch)
            );
            tastenkombinationenSwitch.addEventListener("mouseleave", (event) =>
                mouseLeaveHandler(event, tastenkombinationenSwitch)
            );
        }
    }
}

//#endregion

//#region Tastenkombinationen

function KeyCombination(e) {
    // Holding keys: e.shiftKey, e.altKey, e.ctrlKey, e.metaKey (Windows Taste)

    if (!window.matchMedia("(pointer: coarse)").matches) {
        if (e.key === "/" || e.key === "Tab") {
            window.open("/tools/search.html", "_self");
            return false;
        }

        if (
            (e.key === "z" && e.ctrlKey) ||
            e.key === "Backspace" ||
            (e.key === "Tab" && e.shiftKey)
        ) {
            history.back();
            return false;
        }

        if (e.altKey) {
            switch (e.key) {
                case "j":
                    window.scrollBy({ top: 80, left: 0, behavior: "instant" });
                    return false;
                case "k":
                    window.scrollBy({ top: -80, left: 0, behavior: "instant" });
                    return false;
                // case 'n': window.open("/tools/search.html", "_self"); return false;
                // case 'n': window.open("/tools/search.html", "_self"); return false;
                // case 'n': window.open("/tools/search.html", "_self"); return false;
                // case 'n': window.open("/tools/search.html", "_self"); return false;
                // case 'n': window.open("/tools/search.html", "_self"); return false;
                // case 'n': window.open("/tools/search.html", "_self"); return false;
                // case 'n': window.open("/tools/search.html", "_self"); return false;
            }
            return false;
        }
    }
}

//#endregion
