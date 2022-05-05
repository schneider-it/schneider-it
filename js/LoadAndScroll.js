function OnLoadAll() {
    LoadHeader();
    LoadFooter();
    VanillaTiltEffect();
    SetCardColors();
    AddCopyButtons();
    RandomizeButtonHover();
}

function OnLoadIndex() {
    LoadHeader();
    LoadFooter();
    VanillaTiltEffect();
    SetCardColors();
    RandomizeButtonHover();
}

function OnLoadLeaf() {
    LoadHeader();
    LoadFooter();
    AddCopyButtons();
    RandomizeButtonHover();
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
