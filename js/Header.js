import * as Toggle from "./Toggle.js";
import * as Cursor from "./Cursor.js";

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
        $("#header").load("/components/header_for_search.html", function () {
            Toggle.NavigationActiveToggle();
            Toggle.ThemeSwitch();
            Toggle.TastenkombinationenActiveToggle();
            Cursor.ActiveFollowCursor();
        });
    }
}
