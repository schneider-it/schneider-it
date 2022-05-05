export function RandomizeButtonHover() {
    var buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        // button.addEventListener("mouseenter", function (event) {
        var randomness = Math.random();
        if (randomness < 0.49) button.setAttribute("hover-from", "top");
        else if (randomness >= 0.49 && randomness < 0.5) button.setAttribute("hover-from", "right");
        else if (randomness >= 0.5 && randomness < 0.99) button.setAttribute("hover-from", "bottom");
        else button.setAttribute("hover-from", "left");
        // });
    }
}
