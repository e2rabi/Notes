import Sortable from "../lib/Sortable.js";
import BaseComponant from "./BaseComponant.js"

class CardPage extends BaseComponant{
    constructor(){
        super();
    }
    connectedCallback(){
       super.css `CardPage.css` ;
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
            cards.setAttribute("id","app-cards-container")
            element.appendChild(cards);
            app.notes.filter(e=>e.isPinned!="true").forEach(note=>{
                const card = document.createElement("app-card");
                card.setAttribute("id",note.id)
                card.isFavorit=note.isFavorit;
                card.color=note.color;
                card.draggable=true;
                card.id=note.id;
                card.title=note.name;
                card.description=note.description;
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
    updateComponents(newCard){
        // if is pinned card 
        // else 
        const targetCard = this.shadowRoot.getElementById("app-cards-container");
        if(targetCard){
            targetCard.childNodes.forEach(e=>{
                if(e.id==newCard.id){
                    const card = document.createElement("app-card");
                    card.isFavorit=newCard.isFavorit;
                    card.color=newCard.color;
                    card.draggable=true;
                    card.id=newCard.id;
                    card.title=newCard.name;
                    card.description=newCard.description;
                    card.setAttribute("id",newCard.id)
                    e.replaceWith(card)
                }
             });
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
      });
      document.addEventListener("CARD_IS_FAVORIT",(e)=>{
        if(app.notes.length>0 && e.detail!=undefined){
            // confirme 
            // call API
            // on success re render the page
            const objWithIdIndex = app.notes.findIndex((obj) => obj.id === Number(e.detail.noteId));
            const targetCard =  app.notes[objWithIdIndex] ;
            targetCard.isFavorit=targetCard.isFavorit=="true"?"false":"true";
            //app.notes.splice(objWithIdIndex, 1);
            //app.notes.push(targetCard);
            this.updateComponents(targetCard);
        }
      });
    }
}
customElements.define("app-cards",CardPage);
