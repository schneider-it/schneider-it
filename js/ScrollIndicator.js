export function ScrollIndicator() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    if (document.getElementById("scroll_indicator") != null) {
        document.getElementById("scroll_indicator").style.width = scrolled + "%";
    }
}
