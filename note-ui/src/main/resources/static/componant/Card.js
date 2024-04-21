import BaseComponant from "./BaseComponant.js"
class Card extends BaseComponant{
    constructor(){
        super();
    }
    connectedCallback(){
       super.css `Card.css` ;
       this.render();
    }
    propagateEvent(cardId,eventType){
      if(app.notes.length>0){
         // dispatch event to render the card page
        document.dispatchEvent(new CustomEvent(eventType,{
            detail: {
              noteId: cardId
            }
        }));
      }
    }
    render(){
        const template = document.getElementById("card");
        template.innerHTML = ` <div class="cards">
          <div key="${this.getAttribute("id")}" class="card ${this.getAttribute("color")}">
              <p class="tip" id="card-title">${this.getAttribute("title")}
                <i class="fa fa-heart ${this.getAttribute("isFavorit")=="true"?"card-favorit":""}" aria-hidden="true"></i>
                <i class="fa fa-trash ${this.getAttribute("isRemoved")=="true"?"card-removed":"card-active"}" aria-hidden="true"></i>
                <i class="fa fa-thumb-tack ${this.getAttribute("isPinned")=="true"?"card-pinned":"card-active"}" aria-hidden="true"></i>
              </p>
              <p class="second-text">${this.getAttribute("description")}</p>
              <div class="card-buttons" id="cardEdit">
              <i action="reminder"class="fa fa-bell-o card-buttons-icons" aria-hidden="true"></i>
              <i action="edit" class="fa fa-pencil-square-o card-buttons-icons" aria-hidden="true"></i>
              <i action="addImage" class="fa fa-picture-o card-buttons-icons" aria-hidden="true"></i>
              <i action="archive" class="fa fa-file-archive-o card-buttons-icons" aria-hidden="true"></i>
              <i action="favorit" class="fa ${this.getAttribute("isFavorit")=="true"?"fa-star":"fa-star-o"}  card-buttons-icons" aria-hidden="true"></i>
              <i action="trash" class="fa ${this.getAttribute("isRemoved")=="true"?"fa-trash":"fa-trash-o"}  card-buttons-icons" aria-hidden="true"></i>
              <i action="pin" class="fa fa-thumb-tack  card-buttons-icons" aria-hidden="true"></i>
              </div>
          </div>
      </div>
      `;
      const content = template.content.cloneNode(true); 
      if(this.root.children.length<=1){
        content.getElementById('cardEdit').addEventListener('click',(event)=>{
          if (event.target.tagName == 'I') {
            const action = event.target.getAttribute("action");
            switch(action.toUpperCase()){
              case "TRASH" :
                this.propagateEvent(this.getAttribute("id"),'CARD_IS_REMOVED');
              break;
              case "PIN" :
                this.propagateEvent(this.getAttribute("id"),'CARD_IS_PINNED');
              break;
              case "FAVORIT" :
                this.propagateEvent(this.getAttribute("id"),'CARD_IS_FAVORIT');
              break;
            }
          }
        });
        this.root.appendChild(content);
      }
    }
   
} 
customElements.define("app-card",Card)