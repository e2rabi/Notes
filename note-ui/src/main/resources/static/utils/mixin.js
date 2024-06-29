// Define the mixin
const Mixin = {
    cloneCard(card) {
        const newCard = document.createElement("app-card");
        newCard.isFavorit = card.isFavorit;
        newCard.color = card.color;
        newCard.draggable = true;
        newCard.id = card.id;
        newCard.title = card.name;
        newCard.pinned = card.pinned == "true" ? "false" : "true";
        newCard.description = card.description;
        newCard.setAttribute("id", card.id);
        return newCard;
    },
    createCard(data) {
        const card = document.createElement("app-card");
        card.setAttribute("id", data.id)
        card.style.width = "20%";
        card.isFavorit = data.isFavorit;
        card.color = data.color;
        card.draggable = true;
        card.id = data.id;
        card.title = data.name;
        card.description = data.description;
        card.pinned = data.pinned;
        return card;
    },
    applyDragAndDrop(div) {
        Sortable.create(div, {
            swapThreshold: 1,
            animation: 150
        })
    }
};

// Export the mixin if using modules
export { Mixin };