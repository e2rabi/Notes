class Demo extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        console.log("Custom element added to page.");
        const shadow  = this.attachShadow({mode: "open"});
        const template = document.createElement("div");
        template.innerHTML = `<style>
    
        </style><div><slot></slot><h1 class="test">This is shadow dom</h1></div>`;
        shadow.appendChild(template);
    }
}
customElements.define("demo-app",Demo);