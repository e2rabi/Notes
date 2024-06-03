import BaseComponant from "../BaseComponant.js";

class ColorPicker extends BaseComponant {
    constructor() {
        super();
        this._cardId;
        this._color;
    }
    get cardId() {
        return this._cardId;
    }
    set cardId(value) {
        this._cardId = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    connectedCallback() {
        super.css`colorPicker.css`;
        this.render();
    }
    getCardColor() {
        if (app.notes.length > 0) {
            app.notes.forEach(e => {
                if (e.id == this._cardId) {
                    console.log("color is : " + e.color)
                    this._color = e.color;
                }
            })
        }
    }
    addEventSListener() {
        const elements = this.shadowRoot.querySelectorAll("span");
        if (elements) {
            elements.forEach(e => {
                e.addEventListener('click', (event) => {
                    document.dispatchEvent(new CustomEvent("CHANGE_CARD_COLOR", {
                        detail: {
                            noteId: this._cardId,
                            color: e.getAttribute("color")
                        }
                    }));
                });
            })
        }
    };
    render() {
        const template = document.createElement("div");
        this.getCardColor();
        template.innerHTML = `
            <div class="card ${this.getAttribute("visibility")}">
                <div class="container">
                    <span color="pink" class="dot pink">
                        <svg class="${this._color == "pink" ? "visible" : "hidden"}" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                    <span color="dark-green" class="dot dark-green">
                        <svg  class="${this._color == "dark-green" ? "visible" : "hidden"}" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                    <span color="brown" class="dot brown">
                        <svg class="${this._color == "brown" ? "visible" : "hidden"}" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                    <span color="orange" class="dot orange">
                        <svg class="${this._color == "orange" ? "visible" : "hidden"}" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                    <span color="blue" class="dot blue">
                        <svg class="${this._color == "blue" ? "visible" : "hidden"}" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                    <span color="light-green" class="dot light-green">
                        <svg class="${this._color == "light-green" ? "visible" : "hidden"}" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                    <span color="purple" class="dot purple">
                        <svg class="${this._color == "purple" ? "visible" : "hidden"}" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                    <span color="light-brown" class="dot light-brown">
                        <svg class="${this._color == "light-brown" ? "visible" : "hidden"}" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                    <span color="red" class="dot red">
                        <svg class="${this._color == "red" ? "visible" : "hidden"}" width="24" height="24" viewBox="0 0 24 24" focusable="false" class="AHe6Kc-LgbsSe-gk6SMd-g6cJHd NMm5M"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                    </span>
                </div>
            </div>
        `;
        this.root.appendChild(template);
        this.addEventSListener();

    }
}
customElements.define("color-picker", ColorPicker);