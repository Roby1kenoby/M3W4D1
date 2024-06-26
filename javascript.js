// array con le section
let sections = document.getElementsByTagName("section")

// per capire quante carte sono attualmente visualizzate sullo schermo
let breakpoints = [
    { bp: 1400, nrCard: 6},
    {bp: 1200, nrCard: 4},
    {bp: 992, nrCard: 3},
    {bp: 768, nrCard: 2},
    {bp: 680, nrCard: 1},
]

// autocompilante per sapere quanti click sono già stati fatti su una section
let sectionsCounters = {}


document.addEventListener("scroll", (event) => {
    // per ogni sezione, sull'evento di scroll
    for (let s of sections){
        // verifico se la posizione del lato basso del rettangolo è oltre il bordo basso dello schermo
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


let next = function(id){
    // recupero la sezione
    section = document.getElementById(id)

    // recupero quante card ci sono in questo div
    arrayCardsLength = document.querySelectorAll(`#${id} .card`).length

    // controllo quanti click sono già stati fatti su questa sezione (se non c'è nell'oggetto, la aggiungo)
    let sectionClicks = sectionsCounters.hasOwnProperty(id) ? sectionsCounters[`${id}`] += 1 : sectionsCounters[`${id}`] = 1
    
    // recupero la grandezza della finestra
    windowWidth = document.documentElement.clientWidth
    
    let nrCards = 0
    // individuo il numero di carte presenti a schermo (in base ai breakpoint)
    for (let b of breakpoints){
        if (windowWidth >= b.bp){
            nrCards = b.nrCard;
            break;
        }
        else{
            nrCards = 1
        }
    }

    // calcolo il numero massimo di click prima di arrivare al fondo della lista
    let maxClick = arrayCardsLength / nrCards

    // individuo la grandezza di una card
    let cardWidth = document.getElementsByClassName('card')[0].getBoundingClientRect().width

    // se ho ancora click disponibili, faccio la transizione.
    if (sectionClicks < maxClick){
        // applico la traslazione (nr di carte * larghezza di una singola carta * il numero di click già fatti)
        // c'è un problema con la traslazione sull'asse x, credo che derivi dalle approssimazioni
        section.style.transform = `translatex(${(-cardWidth * nrCards * sectionClicks)}px)`
        section.style.transition = 'transform .8s ease-in-out'
    }
    else{
        // resetto il contatore della sezione e torno a 0 come posizione
        sectionsCounters[`${id}`] = 0
        section.style.transform = `translatex(0px)`
        section.style.transition = 'transform .8s ease-in-out'
    }
}

let prev = function(id){
    // recupero la sezione
    section = document.getElementById(id)

    // recupero quante card ci sono in questo div
    arrayCardsLength = document.querySelectorAll(`#${id} .card`).length

    // recupero la grandezza della finestra
    windowWidth = document.documentElement.clientWidth
    
    let nrCards = 0
    // individuo il numero di carte presenti a schermo (in base ai breakpoint)
    for (let b of breakpoints){
        if (windowWidth >= b.bp){
            nrCards = b.nrCard;
            break;
        }
        else{
            nrCards = 1
        }
    }

    // calcolo il numero massimo di click prima di arrivare al fondo della lista
    let maxClick = arrayCardsLength / nrCards

    // controllo quanti click sono già stati fatti su questa sezione (se non c'è, la aggiungo e so che sono all'inizio. 
    // Se c'è, faccio -1)
    let sectionClicks = sectionsCounters.hasOwnProperty(id) ? sectionsCounters[`${id}`] -= 1 : sectionsCounters[`${id}`] = -1
    
    // individuo la grandezza di una card
    let cardWidth = document.getElementsByClassName('card')[0].getBoundingClientRect().width
    
    // se vado in negativo vuol dire che ero all'inizio, quindi riparto dal fondo
    if (sectionClicks < 0){
        sectionsCounters[`${id}`] = maxClick -1
        sectionClicks = sectionsCounters[`${id}`]
        section.style.transform = `translatex(${(-cardWidth * nrCards * sectionClicks)}px)`
        section.style.transition = 'transform .8s ease-in-out'
    } 
    // se siamo arrivati a 0, resetto la situazione (partendo dall'inizio)
    else if (sectionClicks == 0){
        // torniamo a 0
        section.style.transform = `translatex(0px)`
        section.style.transition = 'transform .8s ease-in-out'
    }
    else{
        // vado indietro di una sezione
        let x = section.getBoundingClientRect().x
        section.style.transform = `translatex(${x - (-cardWidth * nrCards)}px)`
        section.style.transition = 'transform .8s ease-in-out'
    }
}