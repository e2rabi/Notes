import BaseComponant from "./BaseComponant.js";

class Trash extends BaseComponant{
    constructor(){
        super();
    }
    connectedCallback(){
       super.css `Trash` ;
       this.render();
    }
    render(){
        const template = document.getElementById("app-trash-cards");
        const content = template.content.cloneNode(true);  
        this.root.appendChild(content);
        const cardContainer = this.root.getElementById("cards-container");
        if(app.deletedNotes.length>0){
            app.deletedNotes.forEach(note=>{
                const card = document.createElement("app-card");
                card.setAttribute("id",note.id)
                card.setAttribute("isFavorit",note.isFavorit)
                card.setAttribute("isRemoved",note.isRemoved)
                card.setAttribute("draggable",true)
                card.setAttribute("color",note.color)
                card.setAttribute("title",note.name)
                card.setAttribute("description",note.description)
                cardContainer.appendChild(card);
            })
        }
        // apply drap and drop on childs
        Sortable.create(cardContainer,{
            swapThreshold: 1,
            animation: 150
        })
    }
}
customElements.define("app-trash-cards",Trash)