import BaseComponant from "./BaseComponant.js";

class ColorPicker extends BaseComponant{
    constructor(){
        super();
        this._cardId;
    }
    get cardId() {
        return this._cardId;
      }
    set cardId(value) {
        this._cardId = value;
    }
    connectedCallback(){
        super.css `ColorPicker.css` ;
        this.render();
    }
    addEventSListener(){
        const elements = this.shadowRoot.querySelectorAll("span");
        if(elements){
            elements.forEach(e=>{
                e.addEventListener('click',(event)=>{
                    document.dispatchEvent(new CustomEvent("CHANGE_CARD_COLOR",{
                        detail: {
                            noteId:this._cardId,
                            color: e.getAttribute("color")
                        }
                    }));
                });
            })
        }
    };
    render(){
        const template = document.createElement("div");
        template.innerHTML = `
            <div class="card ${this.getAttribute("visibility")}">
                <div class="container">
                    <span class="dot pink">
                    <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                    <span color="dark-green" class="dot dark-green"></span>
                    <span color="brown" class="dot brown"></span>
                    <span color="orange" class="dot orange"></span>
                    <span color="blue" class="dot blue"></span>
                    <span color="light-green" class="dot light-green"></span>
                    <span color="purple" class="dot purple"></span>
                    <span color="light-brown" class="dot light-brown"></span>
                    <span color="red" class="dot red"></span>
                </div>
            </div>
        `;
        this.root.appendChild(template);
        this.addEventSListener();
      
    }
}
customElements.define("color-picker",ColorPicker);