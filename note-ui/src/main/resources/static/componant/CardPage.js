import Sortable from "../lib/Sortable.js";
import BaseComponant from "./BaseComponant.js"

class CardPage extends BaseComponant {
    constructor() {
        super();
    }
    connectedCallback() {
        super.css`CardPage.css`;
        this.addCardEventListener();
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
        card.description = fetchedData.description;
        card.pinned = fetchedData.pinned;
        return card;
    }
    checkIfPinnedCardExist() {
        if (app.notes.length > 0) {
            return app.notes.filter(e => e.pinned = "true").length > 0 ? true : false;
        }
        return false;
    }
    loadPinnedCard(card, pinnedCardContainer) {
        this.applyDragAndDrop(pinnedCardContainer);
        return function () {
            if (card && card.pinned == "true") {
                pinnedCardContainer.style.display = "flex"
                pinnedCardContainer.style.position = "relative";
                pinnedCardContainer.style.top = "8px";
                pinnedCardContainer.setAttribute("id", "app-pinned-cards");
                pinnedCardContainer.appendChild(card);
            }
        }
    }
    render() {
        const template = document.getElementById("app-cards");
        const content = template.content.cloneNode(true);
        this.root.replaceChildren(content);
        // build normal card container
        const element = this.shadowRoot.getElementById("cards-container");
        if (app.notes.length > 0) {
            if (element.querySelector('div').textContent == "") {
                element.querySelector('div').textContent = "OTHERS"
            }
            const cards = document.createElement("div");
            cards.style.display = "flex";
            cards.setAttribute("id", "app-cards-container")
            element.appendChild(cards);
            // build Pinned card container
            const pinnedCards = this.shadowRoot.getElementById("cards-pinned-container");
            const pinnedCardsContainer = document.createElement("div");
            pinnedCards.appendChild(pinnedCardsContainer)

            // Fill containers with data 
            app.notes.forEach(fetchedCardData => {
                if (fetchedCardData.pinned == "true") {
                    const card = this.createCard(fetchedCardData);
                    this.loadPinnedCard(card, pinnedCardsContainer)();
                } else {
                    const card = this.createCard(fetchedCardData);
                    cards.appendChild(card);
                }
            });
            // apply drap and drop on childs
            this.applyDragAndDrop(cards);
        }

    }
    applyDragAndDrop(cards) {
        Sortable.create(cards, {
            swapThreshold: 1,
            animation: 150
        })
    }
    updateComponents(newCard) {
        let targetCard = null;
        if (newCard.pinned == "true") {
            targetCard = this.shadowRoot.getElementById("app-pinned-cards");
        } else {
            targetCard = this.shadowRoot.getElementById("app-cards-container");
        }
        if (targetCard) {
            targetCard.childNodes.forEach(e => {
                if (e.id == newCard.id) {
                    const card = document.createElement("app-card");
                    card.isFavorit = newCard.isFavorit;
                    card.color = newCard.color;
                    card.draggable = true;
                    card.pinned = newCard.pinned;
                    card.id = newCard.id;
                    card.title = newCard.name;
                    card.description = newCard.description;
                    card.setAttribute("id", newCard.id);
                    e.replaceWith(card);
                }
            });
        }
    }
    removeComponents(card) {
        if (card) {
            let targetCard = null;
            if (card.pinned == "true") {
                targetCard = this.shadowRoot.getElementById("app-pinned-cards");
            } else {
                targetCard = this.shadowRoot.getElementById("app-cards-container");
            }
            if (targetCard) {
                targetCard.childNodes.forEach(e => {
                    if (e.id == card.id) {
                        e.remove();
                    }
                });
            }
        }
    }
    closeEditCard() {
        const element = this.shadowRoot.getElementById("card-edit");
        const pinnedCardContainer = this.shadowRoot.getElementById("app-pinned-cards");
        const otherCardContainer = this.shadowRoot.getElementById("app-cards-container");
        pinnedCardContainer.style.opacity = "1";
        otherCardContainer.style.opacity = "1";
        element.children[0].remove();
    }
    openEditCard(newCard) {
        // change other containers opacity
        const element = this.shadowRoot.getElementById("card-edit");
        const pinnedCardContainer = this.shadowRoot.getElementById("app-pinned-cards");
        const otherCardContainer = this.shadowRoot.getElementById("app-cards-container");
        pinnedCardContainer.style.opacity = "0.3";
        otherCardContainer.style.opacity = "0.3";
        // display edit card
        const card = document.createElement("app-edit-card");
        card.isFavorit = newCard.isFavorit;
        card.color = newCard.color;
        card.draggable = true;
        card.pinned = newCard.pinned;
        card.id = newCard.id;
        card.title = newCard.name;
        card.description = "Edit card description";
        card.setAttribute("id", newCard.id);

        if (element && element.children.length > 0) {
            element.children[0].remove();
        }

        if (element && element.children.length == 0) {
            element.appendChild(card)
        }
    }
    addCardEventListener() {

        document.addEventListener("CARD_IS_REMOVED", (e) => {
            if (app.notes.length > 0 && e.detail != undefined) {
                // confirme 
                // call API
                // on success re render the page
                const objWithIdIndex = app.notes.findIndex((obj) => obj.id === Number(e.detail.noteId));
                const removedCard = app.notes[objWithIdIndex];
                app.notes.splice(objWithIdIndex, 1);
                this.removeComponents(removedCard);
            }
        });
        document.addEventListener("CARD_IS_PINNED", (e) => {
            if (app.notes.length > 0 && e.detail != undefined) {
                // confirme 
                // call API
                // on success re render the page
                const objWithIdIndex = app.notes.findIndex((obj) => obj.id === Number(e.detail.noteId));
                const pinnedCard = app.notes[objWithIdIndex];
                pinnedCard.pinned = pinnedCard.pinned == "true" ? "false" : "true";
                app.notes.splice(objWithIdIndex, 1);
                app.notes.push(pinnedCard);
                this.render(); // update only specific component instead of re render all component
            }
        });
        document.addEventListener("CARD_IS_FAVORIT", (e) => {
            if (app.notes.length > 0 && e.detail != undefined) {
                // confirme 
                // call API
                // on success re render the page
                const objWithIdIndex = app.notes.findIndex((obj) => obj.id === Number(e.detail.noteId));
                const targetCard = app.notes[objWithIdIndex];
                targetCard.isFavorit = targetCard.isFavorit == "true" ? "false" : "true";
                //app.notes.splice(objWithIdIndex, 1);
                //app.notes.push(targetCard);
                this.updateComponents(targetCard);
            }
        });
        document.addEventListener("CHANGE_CARD_COLOR", (e) => {
            if (app.notes.length > 0 && e.detail != undefined) {
                // confirme 
                // call API
                // on success re render the page
                const objWithIdIndex = app.notes.findIndex((obj) => obj.id === Number(e.detail.noteId));
                const targetCard = app.notes[objWithIdIndex];
                targetCard.color = e.detail.color;
                //app.notes.splice(objWithIdIndex, 1);
                //app.notes.push(targetCard);
                this.updateComponents(targetCard);
            }
        });
        document.addEventListener("EDIT_CARD", (e) => {
            if (app.notes.length > 0 && e.detail != undefined) {
                // confirme 
                // call API
                // on success re render the page
                const objWithIdIndex = app.notes.findIndex((obj) => obj.id === Number(e.detail.noteId));
                const targetCard = app.notes[objWithIdIndex];
                this.openEditCard(targetCard);

            }
        });
        document.addEventListener("CARD_EDIT_CLOSE", (e) => {
            this.closeEditCard();
        });
    }
}
customElements.define("app-cards", CardPage);
