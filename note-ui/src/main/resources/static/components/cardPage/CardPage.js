import Sortable from "../../lib/Sortable.js";
import BaseComponant from "../BaseComponant.js"
import { Mixin } from "../../utils/Mixin.js";

export default class CardPage extends BaseComponant {
    constructor() {
        super();
        this._numberOfPinnedCard = 0;
    }
    get numberOfPinnedCard() {
        return this._numberOfPinnedCard;
    }
    set numberOfPinnedCard(value) {
        this._numberOfPinnedCard = value;
    }
    connectedCallback() {
        super.css`cardPage.css`;
        this.addCardEventListener();
        this.render();
    }
    checkIfPinnedCardExist() {
        if (app.notes.length > 0) {
            return app.notes.filter(e => e.pinned = "true").length > 0 ? true : false;
        }
        return false;
    }
    addPinnedCard(card, pinnedCardDiv) {
        if (card && card.pinned == "true") {
            pinnedCardDiv.style.display = "flex"
            pinnedCardDiv.style.position = "relative";
            pinnedCardDiv.style.top = "8px";
            pinnedCardDiv.style.width = "87%";
            pinnedCardDiv.style.flexWrap = "wrap";
            pinnedCardDiv.style.justifyContent = "flex-start";
            pinnedCardDiv.setAttribute("id", "app-pinned-cards");
            pinnedCardDiv.appendChild(card);
        }
    }
    addToCardPage(data, cardDiv, cardPinnedDiv) {
        if (data.pinned != "true") {
            cardDiv.appendChild(this.createCard(data));
        } else {
            this.addPinnedCard(this.createCard(data), cardPinnedDiv);
        }
    }
    attachElementToShadowDom(elements) {
        const [cardDiv, cardPinnedDiv] = elements;
        const element = this.shadowRoot.getElementById("cards-container");
        const pinnedElement = this.shadowRoot.getElementById("cards-pinned-container");

        if (element.querySelector('div').textContent == "") {
            element.querySelector('div').textContent = "OTHERS"
        }
        element.appendChild(cardDiv);
        pinnedElement.appendChild(cardPinnedDiv);

        cardDiv.style.display = "flex";
        cardDiv.style.flexWrap = "wrap";
        cardDiv.style.width = "87%"
        cardDiv.setAttribute("id", "app-cards-container")
        // apply drag and drop
        this.applyDragAndDrop(cardDiv);
        this.applyDragAndDrop(cardPinnedDiv);
    }

    reduce(reducer, arr) {
        const cardDiv = document.createElement("div");
        const cardPinnedDiv = document.createElement("div");
        this.attachElementToShadowDom([cardDiv, cardPinnedDiv]);
        arr.forEach(data => {
            reducer(data, cardDiv, cardPinnedDiv)
        });
    }
    render() {
        const template = document.getElementById("card-list");
        const content = template.content.cloneNode(true);
        this.root.replaceChildren(content);

        if (app.notes.length > 0) {
            this.reduce(this.addToCardPage.bind(this), app.notes)
        } else {
            // handle empty list of cards
        }

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
                    const card = this.cloneCard(newCard) // call from mixin 
                    e.replaceWith(card);
                }
            });
        }
    }
    getCardParent(card) { // rename to getCardParent
        let targetCard = null; // to review this part
        let cardParent = null;
        targetCard = this.shadowRoot.getElementById("app-pinned-cards");
        if (card && targetCard) {
            targetCard.childNodes.forEach(e => {
                if (e.id == card.id) {
                    cardParent = targetCard;
                }
            });
        }
        targetCard = this.shadowRoot.getElementById("app-cards-container");
        if (card && targetCard) {
            targetCard.childNodes.forEach(e => {
                if (e.id == card.id) {
                    cardParent = targetCard;
                }
            });
        }
        return cardParent;
    }
    pinCards = (card) => {
        let targetCard = null;
        let cardParent = this.getCardParent(card);
        if (cardParent) {
            const cardParentId = cardParent.getAttribute("id");
            if (cardParentId == "app-pinned-cards") {
                targetCard = this.shadowRoot.getElementById("app-cards-container");
            } else {
                targetCard = this.shadowRoot.getElementById("app-pinned-cards");
            }
            const newCard = this.cloneCard(card) // call from mixin
            cardParent.childNodes.forEach(e => {
                if (e.id == card.id) {
                    e.remove();
                }
            });

            targetCard.appendChild(newCard);
        } else {
            console.error(`Card id :  ${card.id} no parent found`);
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
                app.notes.splice(objWithIdIndex, 1);
                app.notes.push(pinnedCard);
                this.pinCards(pinnedCard);
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
Object.assign(CardPage.prototype, Mixin);
customElements.define("app-cards", CardPage);
