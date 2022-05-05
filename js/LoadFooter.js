function LoadFooter() {
    if (document.getElementById("footer") != null) {
        $("#footer").load("/components/footer.html", function () {
            var myPix = new Array("/img/vogel1.png", "/img/vogel2.png", "/img/vogel3.png", "/img/vogel4.gif", "/img/vogel5.png", "/img/vogel6.png", "/img/vogel7.png", "/img/vogel9.png", "/img/vogel10.png", "/img/vogel11.png", "/img/vogel12.png", "/img/vogel13.png", "/img/vogel14.png", "/img/vogel15.png", "/img/vogel16.png", "/img/vogel17.png", "/img/vogel18.png", "/img/vogel19.gif", "/img/vogel20.gif", "/img/vogel21.gif", "/img/vogel22.gif", "/img/vogel23.gif", "/img/vogel24.gif", "/img/vogel25.gif");
            var randomNum = Math.floor(Math.random() * myPix.length);
            try {
                document.getElementById("vogel").src = myPix[randomNum];
                if (Math.random() < 0.5 && myPix[randomNum] != "/img/vogel24.gif") {
                    document.getElementById("vogel").style.transform = "scale(-1, 1)";
                }
                // document.getElementById("vogel_a").style.cursor = "default";

                // if(Math.random() < .18){
                //     document.getElementById("vogel_a").href = "34573r366.html";
                //     document.getElementById("vogel_a").style.cursor = "pointer";
                // }
            } catch {
                console.log("There are no birds in here!");
            }
        });
    }
}
