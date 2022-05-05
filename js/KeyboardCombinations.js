function KeyboardCombinations(e) {
    // Holding keys: e.shiftKey, e.altKey, e.ctrlKey, e.metaKey (Windows Taste)

    if (!window.matchMedia("(pointer: coarse)").matches) {
        if (e.key === "/" || e.key === "Tab") {
            window.open("/tools/search.html", "_self");
            return false;
        }

        if ((e.key === "z" && e.ctrlKey) || e.key === "Backspace" || (e.key === "Tab" && e.shiftKey)) {
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
