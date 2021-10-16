function listazas() {
    let fetchEredmeny = fetch("movies.json").then((data) => {
        //let fetchEredmeny = fetch("moviesShort.json").then((data) => {    
        //Forrásállomány kezelés
        if (data.ok) {
            return data.json();
        } else {
            return Promise.reject(
                new Error("A szerver " + data.status + " hibát adott")
            );
        }
    }).then(filmek => {
        //Év szerint csökkenő
        filmek.sort((a, b) => {
            if (a.year > b.year) {
                return -1;
            } else if (a.year < b.year) {
                return 1;
            } else {
                return 0;
            }
        }).forEach(element => {
            let ul = document.createElement("ul");
            let li = document.createElement("li");
            /*
            //moviesShort.json-nél működik csak
            li.innerHTML = element.title + " (" + element.year + ")" +
                "<div class='card'>" +
                "<ul class='cardList'>" +
                "<li>Title: " + element.title + "</li>" +
                "<li>Year: " + element.year + "</li>" +
                "<a href='javascript:void(0)' class='anchor'>Cast: " + element.cast + "</a>" + "<br />" +
                "<a href='javascript:void(0)'>Genres: " + element.genres + "</a>" +
                "</ul>" + "<button class='reset'> Reset </button>" +
                "</div>";
            */
            li.innerHTML = element.title + " (" + element.year + ")";

            ul.appendChild(li);
            document.querySelector("#lista").appendChild(ul);

            //Törli a listázást (moviesShort.json-nél működik)
            document.querySelectorAll('.reset').forEach(item => {
                item.addEventListener("click", clickEvent => {
                    for (let elem of document.querySelectorAll("#lista > ul > li")) {
                        elem.remove();
                    }
                })
            });
        });
    }).catch(e => {
        console.log(e);
        var error = document.getElementById("error");
        error.innerHTML = e.message;
        error.style.borderBottom = "5px solid red";
        error.style.width = "50%";
    }).finally(() => {});
}

//Betöltés
document.addEventListener("DOMContentLoaded", () => {
    //Link ne működjön
    //Sajnos az órai példa sem működött (2021-09-24), ezért 'javascript:void(0)'-t használtam
    if (document.getElementsByTagName("a")[0]) {
        document.getElementsByTagName("a")[0]
            .addEventListener("click", (e) => {
                e.preventDefault();
            });
    }

    document.getElementById("betoltes").addEventListener("click", clickEvent => {
        listazas();
    });
});