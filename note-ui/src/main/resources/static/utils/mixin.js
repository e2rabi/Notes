// Define the mixin
const Mixin = {
    cloneCard(card) {
        console.log(`Clone card : ${JSON.stringify(card)}`)
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
    }
};

// Export the mixin if using modules
export { Mixin };