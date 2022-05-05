export function NavigationActiveToggle() {
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

export function TastenkombinationenActiveToggle() {
    let tastenkombinationenSwitch = document.querySelector(".tastenkombinationenSwitch");
    let background_close = document.querySelector(".tastenkombinationen-background_close");
    let tastenkombinationen_iframe = document.querySelector(".tastenkombinationen-iframe");
    tastenkombinationenSwitch.onclick = function () {
        background_close.classList.add("active"); // damit Hintergrund verschwommen
        tastenkombinationen_iframe.style.display = "block";
    };
    background_close.onclick = function () {
        background_close.classList.remove("active");
        tastenkombinationen_iframe.style.display = "none";
    };
}

export function ThemeSwitch() {
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
