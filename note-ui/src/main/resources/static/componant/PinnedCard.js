import BaseComponant from "./BaseComponant.js";

class PinnedCard extends BaseComponant{
    constructor(){
        super()
    }
    connectedCallback(){
        super.css `.pinned-card-container{
                        margin-bottom: 36px;
                        display: flex;
                    }
                    .pinned-card{
                        position: relative;
                        top: 11px;
                        margin: 0px;
                        right: 5px;
                    }` ;
        this.render();
    }
    render(){
        const template = document.getElementById("app-pinned-cards");
        template.innerHTML = `<div id="pinned-card" class="pinned-card-container">
        </div>`;
        const content = template.content.cloneNode(true);  
        this.root.appendChild(content);
        const elements = this.root.getElementById("pinned-card")
        if(app.notes.length>0){
            app.notes.filter(e=>e.isPinned=="true").forEach(note=>{
                console.log(",note.color : "+note.color)
                const card = document.createElement("app-card");
                card.isFavorit=note.isFavorit;
                card.color=note.color;
                card.draggable=true;
                card.id=note.id;
                card.title=note.name;
                card.description=note.description;
                card.setAttribute("isPinned",note.isPinned)
                card.classList.add("pinned-card")
                elements.appendChild(card)
            })
        }
        // apply drap and drop on childs
        Sortable.create(elements,{
            swapThreshold: 1,
            animation: 150
        })
    }
}
customElements.define("app-pinned-cards",PinnedCard);