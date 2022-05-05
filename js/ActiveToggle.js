export function NavigationActiveToggle() {
    let burger = document.querySelector(".burger");
    let blurfilter = document.querySelector(".navigation-blur-filter");
    let navigation = document.querySelector(".navigation");
    burger.onclick = function () {
        burger.getAttribute("active") != "true" ? burger.setAttribute("active", "true") : burger.removeAttribute("active"); // damit zu X wird
        blurfilter.getAttribute("active") != "true" ? blurfilter.setAttribute("active", "true") : blurfilter.removeAttribute("active"); // damit Hintergrund verschwommen
        navigation.getAttribute("active") != "true" ? navigation.setAttribute("active", "true") : navigation.removeAttribute("active"); // damit Navigation sehen
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
