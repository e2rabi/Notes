class BaseComponant extends HTMLElement {
    root;
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
    }
    css(style, url = null) {
        const styles = document.createElement("style");
        if (style.toString().includes("{")) {
            styles.textContent = style;
            this.root.appendChild(styles);
        } else {
            const loadCss = async () => {
                // const url = "./cardPage/cardPage.css" //`./${style.toString().replace(".css", "")}/${style}`;
                const request = await fetch(url);
                const css = await request.text();
                styles.textContent = css;
                this.root.appendChild(styles);
            }
            loadCss();
        }
    }
}
export default BaseComponant;