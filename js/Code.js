export function AddCopyButtons() {
    for (var i = 0; i < $(".code").length; i++) {
        $(".code")[i].id = "code-" + i;
        $("<div/>", {
            text: "Copy",
            class: "code-copy",
            id: "code-copy-" + i,
            onclick: 'CopyToClipboardCode("#code-' + i + '"); ShowCopyAccess("#code-copy-' + i + '")',
        }).appendTo("#code-" + i);
    }
}

export function CopyToClipboardCode(id) {
    var code = document.querySelector(id);
    let text = code.textContent;
    text = text.replace(/^\s+|\s+$/gm, "");
    navigator.clipboard.writeText(text.substring(0, text.length - 5));
}

export function ShowCopyAccess(id) {
    var code = document.querySelector(id);
    code.setAttribute("copied", "");
    setTimeout(function () {
        code.removeAttribute("copied");
    }, 1200);
}
