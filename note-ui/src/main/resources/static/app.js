import { loadNData, loadDeletedNotes } from "./service/API.js";
import Router from "./service/Router.js";

// Global object
window.app = {}
app.router = Router;
app.notes = [];
app.deletedNotes = [];

// Setup redux store
const ADD_NOTE = "ADD_NOTE";
const addNote = (payload) =>
    ({ type: ADD_NOTE, payload: { ...payload } });

const initialState = {
    notes: [
        {
            "id": 1,
            "name": "Simple note 1",
            "description": "note 1 description",
            "isFavorit": "false",
            "color": "light-brown",
            "pinned": "true",
            "status": "F",
            "isRemoved": "false"
        }
    ]
};
const reducer = (state = initialState, action) => {
    if (action.type === ADD_NOTE) {
        const array = [];
        array.push([action.payload])
        return array /* {
            ...state,
            notes: [action.payload],
        }; */
    }
};
const store = Redux.createStore(reducer, initialState);
app.store = store;
app.store.dispatch(addNote(
    [
        {
            "id": 2,
            "name": "Simple note 2",
            "description": "Note 2 description",
            "isFavorit": "true",
            "color": "blue",
            "pinned": "true",
            "isRemoved": "false"
        },
        {
            "id": 3,
            "name": "Simple note 3",
            "description": "Note 3 description",
            "isFavorit": "false",
            "color": "orange",
            "pinned": "false",
            "isRemoved": "false"
        },
        {
            "id": 4,
            "name": "Simple note 4",
            "description": "Note 4 description",
            "isFavorit": "false",
            "color": "dark-green",
            "pinned": "false",
            "isRemoved": "false"
        },
        {
            "id": 5,
            "name": "Simple note 5",
            "description": "Note 5 description",
            "isFavorit": "false",
            "color": "pink",
            "pinned": "false",
            "isRemoved": "false"
        },
        {
            "id": 6,
            "name": "Simple note 6",
            "description": "Note 6 description",
            "isFavorit": "false",
            "color": "brown",
            "pinned": "false",
            "isRemoved": "false"
        },
        {
            "id": 7,
            "name": "Simple note 7",
            "description": "Note 7 description",
            "isFavorit": "false",
            "color": "light-green",
            "pinned": "false",
            "isRemoved": "false"
        },
        {
            "id": 8,
            "name": "Simple note 8",
            "description": "note 8 description",
            "isFavorit": "false",
            "color": "red",
            "pinned": "true",
            "status": "F",
            "isRemoved": "false"
        }]
));
console.log(app.store.getState());


// wait for this event to manipulate the DOM
window.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM is ready")
    app.router.init();
    await loadNData();
    await loadDeletedNotes();
})
// shorthand methods
const $ = (selector) => document.querySelector(selector);
