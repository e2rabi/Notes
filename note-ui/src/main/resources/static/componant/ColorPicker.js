import BaseComponant from "./BaseComponant.js";

class ColorPicker extends BaseComponant{
    constructor(){
        super();
    }
    connectedCallback(){
        super.css `ColorPicker.css` ;
        this.render();
    }
    render(){
        const template = document.createElement("div");
        template.innerHTML = `
            <div class="card ${this.getAttribute("visibility")}">
                <div class="container">
                    <span class="dot pink">
                    <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                    <span class="dot dark-green"></span>
                    <span class="dot brown"></span>
                    <span class="dot orange"></span>
                    <span class="dot blue"></span>
                    <span class="dot light-green"></span>
                    <span class="dot purple"></span>
                    <span class="dot light-brown"></span>
                    <span class="dot red"></span>
                </div>
            </div>
        `;

        this.root.appendChild(template);
    }
}
customElements.define("color-picker",ColorPicker);