import * as Toggle from "./ui/Toggle.js";
import * as Cursor from "./ui/Cursor.js";

export function LoadHeader() {
    if (document.getElementById("header") != null) {
        $("#header").load("/components/header.html", function () {
            Toggle.NavigationActiveToggle();
            Toggle.ThemeSwitch();
            Toggle.TastenkombinationenActiveToggle();
            Cursor.ActiveFollowCursor();
        });
    }
}

export function LoadHeaderwithoutSearch() {
    if (document.getElementById("header") != null) {
        $("#header").load("/components/header_without_search.html", function () {
            Toggle.NavigationActiveToggle();
            Toggle.ThemeSwitch();
            Toggle.TastenkombinationenActiveToggle();
            Cursor.ActiveFollowCursor();
        });
    }
}
