// array con le section
let sections = document.getElementsByTagName("section")

document.addEventListener("scroll", (event) => {
    // per ogni sezione, sull'evento di scroll
    for (let s of sections){
        // verifico se la posizione del lato alto del rettangolo è oltre il bordo basso dello schermo
        if(s.getBoundingClientRect().top >= window.innerHeight){
            // se si, allora quella sezione deve essere invisibile
            s.classList.add("invisible")
        }
        else{
            // altrimenti deve essere visibile
            s.classList.remove("invisible")
        }
    }

})