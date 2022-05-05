function LoadHeader() {
    if (document.getElementById("header") != null) {
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
        $("#header").load("/components/header_without_search.html", function () {
            NavigationActiveToggle();
            ThemeSwitch();
            TastenkombinationenActiveToggle();
            ActiveFollowCursor();
        });
    }
}
