export function ActiveFollowCursor() {
    let clientX = 0,
        clientY = 0,
        navclientY = 0;

    const navLinks = document.querySelectorAll(".navlink");

    const calculateDistance = (x, y, boundary) => {
        const distance = Math.sqrt(x * x + y * y);
        return distance <= boundary;
    };

    const mouseEnterHandler = (event, element) => {
        const rect = element.getBoundingClientRect();
        const diffX = clientX - rect.width / 2 - rect.left;
        const diffY = clientY - rect.height / 2 - rect.top;
        if (calculateDistance(diffX / 2, diffY / 2, 10000)) {
            element.style.transform = `translate(${diffX * 1.2}px, ${diffY * 1.2}px)`;
        }
    };

    const mouseLeaveHandler = (event, element) => {
        element.style.transform = `translate(0, 0)`;
    };

    const mouseNavEnterHandler = (event, element) => {
        const rect = element.getBoundingClientRect();
        const diffX = clientX - rect.width / 2 - rect.left;
        const diffY = navclientY - rect.height / 2 - rect.top;
        if (calculateDistance(diffX, diffY, 0.15625 * document.body.offsetWidth)) {
            element.style.transform = `translate(${diffX / 2}px, ${diffY / 2}px)`;
        }
    };

    document.addEventListener("mousemove", (e) => {
        clientX = e.clientX;
        clientY = e.clientY;
        navclientY = e.clientY + 30; // +20 damit sich Navigation nicht überlappt
    });

    if (!window.matchMedia("(pointer: coarse)").matches) {
        // none, fine, coarse
        navLinks.forEach((link) => {
            link.addEventListener("mousemove", (event) => mouseNavEnterHandler(event, link));
            link.addEventListener("mouseleave", (event) => mouseLeaveHandler(event, link));
        });

        if ((themeSwitch = document.querySelector(".themeSwitch"))) {
            themeSwitch.addEventListener("mousemove", (event) =>
                mouseEnterHandler(event, themeSwitch)
            );
            themeSwitch.addEventListener("mouseleave", (event) =>
                mouseLeaveHandler(event, themeSwitch)
            );
        }

        if ((burger = document.querySelector(".burger"))) {
            burger.addEventListener("mousemove", (event) => mouseEnterHandler(event, burger));
            burger.addEventListener("mouseleave", (event) => mouseLeaveHandler(event, burger));
        }

        if ((back_button = document.querySelector(".back_button"))) {
            back_button.addEventListener("mousemove", (event) =>
                mouseEnterHandler(event, back_button)
            );
            back_button.addEventListener("mouseleave", (event) =>
                mouseLeaveHandler(event, back_button)
            );
        }

        if ((search_button = document.querySelector(".search_button"))) {
            search_button.addEventListener("mousemove", (event) =>
                mouseEnterHandler(event, search_button)
            );
            search_button.addEventListener("mouseleave", (event) =>
                mouseLeaveHandler(event, search_button)
            );
        }

        if ((tastenkombinationenSwitch = document.querySelector(".tastenkombinationenSwitch"))) {
            tastenkombinationenSwitch.addEventListener("mousemove", (event) =>
                mouseEnterHandler(event, tastenkombinationenSwitch)
            );
            tastenkombinationenSwitch.addEventListener("mouseleave", (event) =>
                mouseLeaveHandler(event, tastenkombinationenSwitch)
            );
        }
    }
}
