import * as Header from "./Header.js";
import * as Footer from "./Footer.js";
import * as Tilt from "./VanillaTilt.js";
import * as ScrollIndicator from "./ScrollIndicator.js";
import * as Button from "./Button.js";
import * as Card from "./Card.js";
import * as Code from "./Code.js";

OnLoadAll();

function OnLoadAll() {
    Header.LoadHeader();
    Footer.LoadFooter();
    Tilt.VanillaTiltEffect();
    Card.SetCardColors();
    Code.AddCopyButtons();
    Button.RandomizeButtonHover();
}

function OnLoadIndex() {
    console.log("test");
    Header.LoadHeader();
    Footer.LoadFooter();
    Tilt.VanillaTiltEffect();
    Card.SetCardColors();
    Button.RandomizeButtonHover();
}

function OnLoadLeaf() {
    Header.LoadHeader();
    Footer.LoadFooter();
    Card.AddCopyButtons();
    Button.RandomizeButtonHover();
}

function OnLoadSearch() {
    Header.LoadHeaderwithoutSearch();
    Footer.LoadFooter();
}

function OnLoadMin() {
    Header.LoadHeader();
    Footer.LoadFooter();
}

function OnScroll() {
    ScrollIndicator.ScrollIndicator();
}
