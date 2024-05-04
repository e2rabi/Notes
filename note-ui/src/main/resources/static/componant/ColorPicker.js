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
            <div class="card">
                <div class="container">
                    <span class="dot pink"></span>
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