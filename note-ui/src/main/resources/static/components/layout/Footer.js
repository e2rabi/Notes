class Footer extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = ` <div>Footer</div>`;
    }
}
customElements.define("app-footer", Footer);