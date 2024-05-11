let scrollPosition = 0;
// array con le section
let sections = document.getElementsByTagName("section")

let breakpoints = [
    { bp: 1400, nrCard: 5},
    {bp: 1200, nrCard: 4},
    {bp: 992, nrCard: 3},
    {bp: 768, nrCard: 2},
    {bp: 680, nrCard: 1},
]


document.addEventListener("scroll", (event) => {
    // per ogni sezione, sull'evento di scroll
    for (let s of sections){
        // verifico se la posizione del lato basso del rettangolo è oltre il bordo basso dello schermo
        if(s.getBoundingClientRect().bottom >= window.innerHeight){
            // se si, allora quella sezione deve essere invisibile
            s.classList.add("invisible")
        }
        else{
            // altrimenti deve essere visibile
            s.classList.remove("invisible")
        }
    }

})


let next = function(id){
    section = document.getElementById(id)
    windowWidth = screen.innerWidth
    let nrCards = 0
    for (let b of breakpoints){
        console.log(b.bp, b.nrCard)
        if (windowWidth >= b.bp){
            nrCards = b.nrCard;
            console.log(nrCards)
            break;
        }
    }
    let cardWidth = document.getElementsByClassName('card')[0].getBoundingClientRect().width
    console.log(cardWidth*nrCards)
    section.style.transform = `translatex(${cardWidth*nrCards}px`
}