class NavBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
                <div class="container body-container">
                <div class="row" style="margin:auto;">
                <ul class="nav flex-column">
                    <li class="nav-item">
                    <a class="nav-link " href="/notes"> <i class="fa-regular fa-note-sticky fa-lg fa-color"></i>
                        <span class="left-menu-label">Notes</span></a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="fa-solid fa-file-zipper fa-lg fa-color"></i>
                        <span class="left-menu-label">Archive</span>
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/trash" aria-disabled="true">
                        <i class="fa-solid fa-trash-can fa-lg fa-color"></i>
                        <span class="left-menu-label">Trash</span></a>
                    </li>
                </ul>
                </div>
            </div>
        `
    }
}
customElements.define("nav-bar", NavBar);