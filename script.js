const columns = document.querySelectorAll(".column_cards");
const column = document.querySelectorAll(".column");
const cards = document.querySelectorAll(".card");

const MAX_CARDS = 6;
let draggedCard;

const dragStart = (event) => {
    draggedCard = event.target
    event.dataTransfer.effectAllowed = "move";
};

const dragOver = (event) => {
    event.preventDefault();
};

const dragLeave = ({target}) => {
    target.classList.remove("column-highlight")
    console.log(target)
};

const createCard = (event) => {

    const column = event.target;
    const cardCount = column.querySelectorAll(".card").length;
   
    if(event.target.classList.contains("column_cards")){

           if (cardCount < MAX_CARDS) {
            const card = document.createElement("section");
           
            card.className = "card";
            card.draggable = "true"
            card.contentEditable = "true"
          
            card.addEventListener("focusout", () => {

            card.contentEditable = "false";
            if(!card.textContent) card.remove();
            })

            card.addEventListener("dragstart", dragStart);
            
            event.target.append(card)
            console.log("append target:", event.target)

            card.focus()
        }               
    }
};

const drop = ({target}) => {
    const column = target;
    const cardCount = column.querySelectorAll(".card").length;

    if (cardCount < MAX_CARDS) {
    if(target.classList.contains("column_cards")){
        target.classList.remove("column-highlight")
        target.append(draggedCard)
    }
}

if (cardCount === MAX_CARDS) {
    if(target.classList.contains("column_cards")){
        target.classList.remove("column-highlight")
    }
}
   
};

const dragEnter = ({target}) => {
    if(target.classList.contains("column_cards")){
    target.classList.add("column-highlight");
    };
};

cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
});

columns.forEach((column) => {
column.addEventListener("dragover", dragOver);
column.addEventListener("dragenter", dragEnter);
column.addEventListener("dragleave", dragLeave);
column.addEventListener("drop", drop);
column.addEventListener("dblclick", createCard);
})