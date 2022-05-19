export function SetCardColors() {
    var colors = ["#f6e58d", "#f9ca24", "#ffbe76", "#f0932b", "#ff7979", "#eb4d4b", "#badc58", "#6ab04c", "#7ed6df", "#22a6b3", "#e056fd", "#be2edd", "#686de0", "#4834d4", "#30336b", "#130f40", "#fc5c65", "#eb3b5a", "#fd9644", "#fa8231", "#f7b731", "#26de81", "#20bf6b", "#2bcbba", "#0fb9b1", "#45aaf2", "#2d98da", "#4b7bec", "#3867d6", "#a55eea", "#f1c40f", "#8e44ad", "#27ae60", "#8854d0", "#1abc9c", "#e67e22"];

    var cards_before = document.querySelectorAll(".card-before");

    for (let i = 0; i < cards_before.length; i++) {
        const card_before = cards_before[i];
        card_before.style.background = colors[Math.floor(Math.random() * colors.length)];
    }
}
