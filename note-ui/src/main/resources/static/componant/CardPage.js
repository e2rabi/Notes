import Sortable from "../lib/Sortable.js";
import BaseComponant from "./BaseComponant.js"

class CardPage extends BaseComponant{
    constructor(){
        super();
    }
    connectedCallback(){
       super.css `CardPage` ;
       this.render();
       this.addCardEventListener();
    }
    render(){
        const template = document.getElementById("app-cards");
        const content = template.content.cloneNode(true);  
        this.root.replaceChildren(content);

        // Add pinned cards
        const pinnedCardContainer = this.root.getElementById("cards-pinned-container");
        pinnedCardContainer.style.position="relative"
        pinnedCardContainer.style.top="12px"

        if(app.notes.filter(e=>e.isPinned=="true").length==0){
            this.shadowRoot.querySelector('span').textContent = "";
        }else{
            if(this.shadowRoot.querySelector('span').textContent == ""){
                this.shadowRoot.querySelector('span').textContent = "PINNED";
            }
        }
        const pinnedCards = document.createElement("app-pinned-cards");
        pinnedCardContainer.appendChild(pinnedCards)
        // Add othes cards
        const element = this.shadowRoot.getElementById("cards-container");
        if(app.notes.length>0){
            if(element.querySelector('span').textContent==""){
                element.querySelector('span').textContent = "OTHERS"
            }
            const cards = document.createElement("div");
            cards.style.display="flex";
            element.appendChild(cards);
            app.notes.filter(e=>e.isPinned!="true").forEach(note=>{
                const card = document.createElement("app-card");
                card.setAttribute("id",note.id)
                card.setAttribute("isFavorit",note.isFavorit)
                card.setAttribute("draggable",true)
                card.setAttribute("color",note.color)
                card.setAttribute("title",note.name)
                card.setAttribute("description",note.description)
                cards.appendChild(card);
            })
              // apply drap and drop on childs
            Sortable.create(cards,{
                swapThreshold: 1,
                animation: 150
            })
        }
        if(app.notes.filter(e=>e.isPinned!="true").length==0){
            element.querySelector('span').textContent = ""
        }
           
    }
    addCardEventListener(){
        document.addEventListener("CARD_IS_REMOVED",(e)=>{
            if(app.notes.length>0 && e.detail!=undefined){
                // confirme 
                // call API
                // on success re render the page
                const objWithIdIndex = app.notes.findIndex((obj) => obj.id === Number(e.detail.noteId));
                app.notes.splice(objWithIdIndex, 1);
                this.render();
        }
     });
     document.addEventListener("CARD_IS_PINNED",(e)=>{
        if(app.notes.length>0 && e.detail!=undefined){
            // confirme 
            // call API
            // on success re render the page
            const objWithIdIndex = app.notes.findIndex((obj) => obj.id === Number(e.detail.noteId));
            const pinnedCard =  app.notes[objWithIdIndex] ;
            pinnedCard.isPinned=pinnedCard.isPinned=="true"?"false":"true";
            app.notes.splice(objWithIdIndex, 1);
            app.notes.push(pinnedCard);
            this.render();
    }
 })
    }
}
customElements.define("app-cards",CardPage);
