class Header extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
        <header>
        <div class="container nav-container">
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand" href="/notes">
                <i class="fa-solid fa-bars"></i>
                <span class="app-title">Notes</span></a>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="d-flex app-header-form" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-secondary" type="submit">Search</button>
                </form>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/notes">
                      <i class="fa-solid fa-bars-progress fa-flip-vertical fa-lg fa-color"></i>
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/test2" role="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <i class="fa-solid fa-gear fa-lg fa-color"></i>
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <hr class="dropdown-divider">
                      </li>
                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          </header>
        `
    }
}
customElements.define("app-header", Header);