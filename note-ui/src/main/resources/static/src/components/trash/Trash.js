import BaseComponant from "../BaseComponant.js";

class Trash extends BaseComponant {
    constructor() {
        super();
    }
    connectedCallback() {
        super.css`trash.css`;
        super.css(`trash.css`, new URL("./trash.css", import.meta.url));
        this.addEventListener();
        this.render();
    }
    createCard(fetchedData) {
        const card = document.createElement("app-card");
        card.setAttribute("id", fetchedData.id)
        card.style.width = "20%";
        card.isFavorit = fetchedData.isFavorit;
        card.color = fetchedData.color;
        card.draggable = true;
        card.id = fetchedData.id;
        card.title = fetchedData.name;
        card.isRemoved = fetchedData.isRemoved;
        card.description = fetchedData.description;
        card.pinned = fetchedData.pinned;
        return card;
    }
    render() {
        const template = document.getElementById("app-trash-cards");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);
        const cardContainer = this.root.getElementById("cards-container");
        if (app.deletedNotes.length > 0) {
            app.deletedNotes.forEach(noteData => {
                const card = this.createCard(noteData);
                cardContainer.appendChild(card);
            })
        }
        // apply drap and drop on childs
        Sortable.create(cardContainer, {
            swapThreshold: 1,
            animation: 150
        })
    }
    updateComponents(newCard) {
        let targetCard = this.shadowRoot.getElementById("cards-container");
        if (targetCard) {
            targetCard.childNodes.forEach(e => {
                if (e.id == newCard.id) {
                    const card = document.createElement("app-card");
                    card.isFavorit = newCard.isFavorit;
                    card.color = newCard.color;
                    card.draggable = true;
                    card.pinned = newCard.pinned;
                    card.id = newCard.id;
                    card.isRemoved = newCard.isRemoved;
                    card.title = newCard.name;
                    card.description = newCard.description;
                    card.setAttribute("id", newCard.id);
                    e.replaceWith(card);
                }
            });
        }
    }
    addEventListener() {
        document.addEventListener("CHANGE_CARD_COLOR", (e) => {
            if (app.deletedNotes.length > 0 && e.detail != undefined) {
                // confirme 
                // call API
                // on success re render the page
                const objWithIdIndex = app.deletedNotes.findIndex((obj) => obj.id === Number(e.detail.noteId));
                const targetCard = app.deletedNotes[objWithIdIndex];
                targetCard.color = e.detail.color;
                this.updateComponents(targetCard);
            }
        });
    }
}
customElements.define("app-trash-cards", Trash)