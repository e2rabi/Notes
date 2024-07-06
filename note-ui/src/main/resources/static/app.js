import { loadNData, loadDeletedNotes } from "./service/API.js";
import Router from "./service/Router.js";

// Global object
window.app = {}
app.router = Router;
app.notes = [];
app.deletedNotes = [];

// Setup redux store
const ADD_NOTE = "ADD_NOTE";
const addNote = (obj) =>
    ({ type: ADD_NOTE, payload: obj });

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
        return {
            ...state,
            notes: [...state.notes, action.payload],
        };
    }
};
const store = Redux.createStore(reducer, initialState);
app.store = store;


// wait for this event to manipulate the DOM
window.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM is ready")
    app.router.init();
    await loadNData();
    await loadDeletedNotes();
    app.notes.forEach(e => {
        app.store.dispatch(addNote(e));
    })
    console.log(app.store.getState().notes);
})
// shorthand methods
const $ = (selector) => document.querySelector(selector);
