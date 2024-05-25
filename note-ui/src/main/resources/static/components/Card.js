import BaseComponant from "./BaseComponant.js"
class Card extends BaseComponant {
  constructor() {
    super();
    this._isFavorit;
    this._color;
    this._id;
    this._title;
    this._description;
    this._pinned;
    this._displayColorPicker = "hidden"
    this._isRemoved = "false"
  } // TODO find a better way for property management
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get displayColorPicker() {
    return this._displayColorPicker;
  }
  set displayColorPicker(value) {
    this._displayColorPicker = value;
  }
  get pinned() {
    return this._pinned;
  }
  set pinned(value) {
    this._pinned = value;
  }
  get isRemoved() {
    return this._isRemoved;
  }
  set isRemoved(value) {
    this._isRemoved = value;
  }
  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }
  get isFavorit() {
    return this._isFavorit;
  }
  set isFavorit(value) {
    this._isFavorit = value;
  }
  get color() {
    return this._color;
  }
  set color(value) {
    this._color = value;
  }

  connectedCallback() {
    super.css`Card.css`;
    this.render();
  }
  propagateEvent(cardId, eventType) {
    if (app.notes.length > 0) {
      // dispatch event to the card page component
      document.dispatchEvent(new CustomEvent(eventType, {
        detail: {
          noteId: cardId
        }
      }));
    }
  }
  toggleColorPicker() {
    const card = this.shadowRoot.getElementById("card");
    if (this._displayColorPicker == "hidden") {
      this._displayColorPicker = "visible";
      const cardColorPicker = document.createElement("color-picker");
      cardColorPicker.setAttribute("visibility", this._displayColorPicker);
      cardColorPicker.setAttribute("id", "cardColorPicker");
      cardColorPicker.cardId = this._id;
      card.appendChild(cardColorPicker);
    } else {
      this._displayColorPicker = "hidden";
      card.removeChild(this.shadowRoot.getElementById("cardColorPicker"))
    }
  }
  render() {
    const template = document.getElementById("card");
    template.innerHTML = ` <div class="cards">
          <div key="${this._id}" class="card ${this._color}">
              <p class="tip" id="card-title">${this._title}
                <i class="fa fa-heart ${this._isFavorit == "true" ? "card-favorit" : ""}" aria-hidden="true"></i>
                <i class="fa fa-trash ${this._isRemoved == "true" ? "card-removed" : "card-active"}" aria-hidden="true"></i>
                <i class="fa fa-thumb-tack  ${this._pinned == "true" ? "card-pinned" : "card-active"}" aria-hidden="true"></i>
              </p>
              <p class="second-text">${this._description}</p>
              <div class="card-buttons" id="cardEdit">
              <i action="reminder"class="fa fa-bell-o card-buttons-icons" aria-hidden="true"></i>
              <i action="edit" class="fa fa-pencil-square-o card-buttons-icons" aria-hidden="true"></i>
              <i action="color" class="fa fa-paint-brush card-buttons-icons" aria-hidden="true"></i>
              <i action="archive" class="fa fa-file-archive-o card-buttons-icons" aria-hidden="true"></i>
              <i action="favorit" class="fa ${this._isFavorit == "true" ? "fa-star" : "fa-star-o"}  card-buttons-icons" aria-hidden="true"></i>
              <i action="trash" class="fa ${this.getAttribute("isRemoved") == "true" ? "fa-trash" : "fa-trash-o"}  card-buttons-icons" aria-hidden="true"></i>
              <i action="pin" class="fa fa-thumb-tack  card-buttons-icons" aria-hidden="true"></i>
              </div>
          </div>
      </div>
      <div  id="card"></div>
      `;
    const content = template.content.cloneNode(true);
    if (this.root.children.length <= 1) {
      content.getElementById('cardEdit').addEventListener('click', (event) => {
        if (event.target.tagName == 'I') {
          const action = event.target.getAttribute("action");
          switch (action.toUpperCase()) {
            case "TRASH":
              this.propagateEvent(this._id, 'CARD_IS_REMOVED');
              break;
            case "PIN":
              this.propagateEvent(this._id, 'CARD_IS_PINNED');
              break;
            case "FAVORIT":
              this.propagateEvent(this._id, 'CARD_IS_FAVORIT');
              break;
            case "COLOR":
              this.toggleColorPicker();
              break;
            case "EDIT":
              this.propagateEvent(this._id, 'EDIT_CARD');
              break;
          }
        }
      });
      this.root.appendChild(content);
    }
  }

}
customElements.define("app-card", Card)