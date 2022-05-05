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
