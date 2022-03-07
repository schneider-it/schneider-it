function OnLoadAll() {
    NavigationActiveToggle();
    ThemeSwitch();
    TastenkombinationenActiveToggle();
    VanillaTiltEffect();
    SetCardColors();
    AddCopyButtons();
    PicRandomVogel();
}

function OnLoadIndex() {
    NavigationActiveToggle();
    ThemeSwitch();
    TastenkombinationenActiveToggle();
    VanillaTiltEffect();
    SetCardColors();
    PicRandomVogel();    
}

function OnLoadLeaf() {
    NavigationActiveToggle();
    ThemeSwitch();
    TastenkombinationenActiveToggle();
    AddCopyButtons();
    PicRandomVogel();    
}

function OnLoadMin() {
    NavigationActiveToggle();
    ThemeSwitch();
    TastenkombinationenActiveToggle();
}

function OnScroll() {
    ScrollIndicator();
}

function OnKeyDown() {
    e = window.event;
    KeyCombination(e);
}

function VanillaTiltEffect() {
    VanillaTilt.init(document.querySelectorAll(".card"), {
        max: 8,
        speed: 500
    });
}

function ThemeSwitch() {    
    const body = document.querySelector('body');
    const themeSwitch = document.querySelector('.themeSwitch');
    
    let burger = document.querySelector('.burger');
    let blurfilter = document.querySelector('.navigation-blur-filter');
    let navigation = document.querySelector('.navigation');

    themeSwitch.onclick = function() {
        if(localStorage.getItem("colorTheme") == null){
            // if(!(body.classList.contains("dark") || body.classList.contains("light"))) {
                if(window.matchMedia('(prefers-color-scheme: light)').matches){
                    body.classList.add("dark");
                    localStorage.setItem("colorTheme", "dark");
                }
                else {
                    body.classList.add("light");
                    localStorage.setItem("colorTheme", "light");
                }
            // }
        }
        else {
            if(body.classList.contains("dark")){
                body.classList.add("light");
                body.classList.remove("dark");
                localStorage.setItem("colorTheme", "light");
            }
            else {
                body.classList.add("dark");
                body.classList.remove("light");
                localStorage.setItem("colorTheme", "dark");
            }
        }
    }

    if(localStorage.getItem("colorTheme") != null) {
        if(localStorage.getItem("colorTheme") == "dark"){
            body.classList.add("dark");
        }
        else if(localStorage.getItem("colorTheme") == "light"){
            body.classList.add("light");
        }
    }
}

function SetCardColors() {
    var colors = [
        '#f6e58d', '#f9ca24', '#ffbe76',
        '#f0932b', '#ff7979', '#eb4d4b',
        '#badc58', '#6ab04c', '#7ed6df',
        '#22a6b3', '#e056fd', '#be2edd',
        '#686de0', '#4834d4', '#30336b',
        '#130f40', '#fc5c65', '#eb3b5a',
        '#fd9644', '#fa8231', '#f7b731',
        '#26de81', '#20bf6b', '#2bcbba',
        '#0fb9b1', '#45aaf2', '#2d98da',
        '#4b7bec', '#3867d6', '#a55eea',
        '#f1c40f', '#8e44ad', '#27ae60',
        '#8854d0', '#1abc9c', '#e67e22'
    ]    
    
    var cards_before = document.querySelectorAll('.card-before');
    
    for (let i = 0; i < cards_before.length; i++) {
        const card_before = cards_before[i];
        card_before.style.background = colors[Math.floor(Math.random() * colors.length)];
    }    
}

function AddCopyButtons() {
    for (var i = 0; i < $('.code').length; i++) {
        $(".code")[i].id = 'code-' + i;
        $('<div/>', { 'text': 'Copy', 'class': 'code-copy', 'id': 'code-copy-' + i, 'onclick': 'CopyToClipboardCode("#code-' + i + '"); ShowCopyAccess("#code-copy-' + i + '")'}).appendTo('#code-' + i);        
    }
}

function CopyToClipboardCode(id) {
    var code = document.querySelector(id);
    let text = code.textContent;
    text = text.replace(/^\s+|\s+$/gm,'');
    navigator.clipboard.writeText(text.substring(0, text.length - 5));
}

function ShowCopyAccess(id) {
    var code = document.querySelector(id);
    code.classList.add("copied");
    setTimeout(function(){ 
        code.classList.remove("copied");
    }, 1200); 
}

function PicRandomVogel() {
    var myPix = new Array("/img/vogel1.png","/img/vogel2.png","/img/vogel3.png","/img/vogel4.gif","/img/vogel5.png","/img/vogel6.png","/img/vogel7.png","/img/vogel9.png","/img/vogel10.png","/img/vogel11.png","/img/vogel12.png","/img/vogel13.png","/img/vogel14.png","/img/vogel15.png","/img/vogel16.png","/img/vogel17.png","/img/vogel18.png","/img/vogel19.gif","/img/vogel20.gif","/img/vogel21.gif","/img/vogel22.gif","/img/vogel23.gif","/img/vogel24.gif","/img/vogel25.gif");
    var randomNum = Math.floor(Math.random() * myPix.length);
    try{
        document.getElementById("vogel").src = myPix[randomNum];
        if(Math.random() < .5 && myPix[randomNum] != "/img/vogel24.gif") {
            document.getElementById("vogel").style.transform = "scale(-1, 1)";
        }
        // document.getElementById("vogel_a").style.cursor = "default";
    
        // if(Math.random() < .18){
        //     document.getElementById("vogel_a").href = "34573r366.html";
        //     document.getElementById("vogel_a").style.cursor = "pointer";
        // }
    }
    catch{ console.log("There are no birds in here!") }
}

function ScrollIndicator() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("scroll_indicator").style.width = scrolled + "%";
}

//#region MouseTracker & Navigation

function NavigationActiveToggle() {
    let burger = document.querySelector('.burger');
    let blurfilter = document.querySelector('.navigation-blur-filter');
    let navigation = document.querySelector('.navigation');
    burger.onclick = function() {
        burger.classList.toggle('active'); // damit zu X wird
        blurfilter.classList.toggle('active'); // damit Hintergrund verschwommen
        navigation.classList.toggle('active'); // damit Navigation sehen
    }
    blurfilter.onclick = function() {
        burger.classList.remove('active');
        blurfilter.classList.remove('active');
        navigation.classList.remove('active');
    }
}

function TastenkombinationenActiveToggle() {
    let tastenkombinationenSwitch = document.querySelector('.tastenkombinationenSwitch');
    let blurfilter = document.querySelector('.tastenkombinationen-blur-filter');
    let tastenkombinationen_iframe = document.querySelector('.tastenkombinationen-iframe');
    tastenkombinationenSwitch.onclick = function() {
        blurfilter.classList.add('active'); // damit Hintergrund verschwommen
        tastenkombinationen_iframe.style.display = "block";
    }
    blurfilter.onclick = function() {
        blurfilter.classList.remove('active');
        tastenkombinationen_iframe.style.display = "none";
    }
}

let clientX = 0,
	clientY = 0,
	navclientY = 0;

     
const navLinks = document.querySelectorAll('.navlink');

const calculateDistance = (x, y, boundary) => {
	const distance = Math.sqrt((x * x) + (y * y));
	return distance <= boundary;
}

const mouseEnterHandler = (event, element) => {
	const rect = element.getBoundingClientRect();
	const diffX = clientX - (rect.width / 2) - rect.left;
	const diffY = clientY - (rect.height / 2) - rect.top;
	if(calculateDistance(diffX / 2, diffY / 2, 10000)) {
		element.style.transform = `translate(${diffX * 1.2}px, ${diffY * 1.2}px)`;	
	}	
}

const mouseLeaveHandler = (event, element) => {
	element.style.transform = `translate(0, 0)`;
}

const mouseNavEnterHandler = (event, element) => {
	const rect = element.getBoundingClientRect();
	const diffX = clientX - (rect.width / 2) - rect.left;
	const diffY = navclientY - (rect.height / 2) - rect.top;
	if(calculateDistance(diffX, diffY, 0.15625 * document.body.offsetWidth)) {
		element.style.transform = `translate(${diffX/2}px, ${diffY/2}px)`;	
	}	
}


document.addEventListener('mousemove', (e) => {
	clientX = e.clientX;
	clientY = e.clientY;
	navclientY = e.clientY+30; // +20 damit sich Navigation nicht überlappt
});

if(!window.matchMedia("(pointer: coarse)").matches) { // none, fine, coarse
    navLinks.forEach(link => {
        link.addEventListener('mousemove', (event) => mouseNavEnterHandler(event, link));
        link.addEventListener('mouseleave', (event) => mouseLeaveHandler(event, link));
    });
    
    // const themeSwitch = document.querySelector('.themeSwitch');
    // themeSwitch.addEventListener('mousemove', (event) => mouseEnterHandler(event, themeSwitch));
    // themeSwitch.addEventListener('mouseleave', (event) => mouseLeaveHandler(event, themeSwitch));

    if(themeSwitch = document.querySelector('.themeSwitch')) {
        themeSwitch.addEventListener('mousemove', (event) => mouseEnterHandler(event, themeSwitch));
        themeSwitch.addEventListener('mouseleave', (event) => mouseLeaveHandler(event, themeSwitch));        
    }

    if(burger = document.querySelector('.burger')) {
        burger.addEventListener('mousemove', (event) => mouseEnterHandler(event, burger));
        burger.addEventListener('mouseleave', (event) => mouseLeaveHandler(event, burger));        
    }

    if(back_button = document.querySelector('.back_button')) {
        back_button.addEventListener('mousemove', (event) => mouseEnterHandler(event, back_button));
        back_button.addEventListener('mouseleave', (event) => mouseLeaveHandler(event, back_button));
    }
    
    if(search_button = document.querySelector('.search_button')) {
        search_button.addEventListener('mousemove', (event) => mouseEnterHandler(event, search_button));
        search_button.addEventListener('mouseleave', (event) => mouseLeaveHandler(event, search_button));
    }

    if(tastenkombinationenSwitch = document.querySelector('.tastenkombinationenSwitch')) {
        tastenkombinationenSwitch.addEventListener('mousemove', (event) => mouseEnterHandler(event, tastenkombinationenSwitch));
        tastenkombinationenSwitch.addEventListener('mouseleave', (event) => mouseLeaveHandler(event, tastenkombinationenSwitch));
    }
}

//#endregion

//#region Tastenkombinationen

function KeyCombination(e) {

    // Holding keys: e.shiftKey, e.altKey, e.ctrlKey, e.metaKey (Windows Taste)

    if(!window.matchMedia("(pointer: coarse)").matches) {  
        if (e.key === '/' || e.key === "Tab") {
            window.open("/tools/search.html", "_self");
            return false;
        }

        if ((e.key === 'z' && e.ctrlKey) || (e.key === 'Backspace') || (e.key === "Tab" && e.shiftKey)) {
            history.back();
            return false;
        }

        if (e.key === 'g') {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            return false;
        }
        
        if (e.key === 'j') {
            window.scrollBy({ top: 800, left: 0, behavior: "smooth" });
            return false;
        }
    
        if (e.key === 'k') {
            window.scrollBy({ top: -800, left: 0, behavior: "smooth" });
            return false;
        }

        if (e.key === 'h') {
            window.open("/index.html", "_self");
            return false;
        }

        if (e.key === 'p') {
            window.open("/docs/programmiersprachen.html", "_self");
            return false;
        }

        if (e.key === 'n') {
            window.open("/docs/netzwerktechnik.html", "_self");
            return false;
        }

        if (e.key === 'd') {
            window.open("/docs/datenbanken.html", "_self");
            return false;
        }

        if (e.key === 's') {
            window.open("/docs/systemtechnik.html", "_self");
            return false;
        }

        if (e.key === 'q') {
            window.open("/law/quellen.html", "_self");
            return false;
        }

        if (e.key === 'i') {
            window.open("/law/impressum.html", "_self");
            return false;
        }
    }    
}

//#endregion