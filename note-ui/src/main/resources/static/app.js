import { loadNData, loadDeletedNotes } from "./service/API.js";
import Router from "./service/Router.js";
import noteReducer from "./service/redux/NoteReducer.js"
import Store from './service/redux/store.js'
// Global object
window.app = {}
app.router = Router;
app.notes = [];
app.deletedNotes = [];

// Setup redux store
const store = new Store(noteReducer);
app.store = store;
// wait for this event to manipulate the DOM
window.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM is ready")
    app.router.init();
    await loadNData();
    await loadDeletedNotes();

    store.save(app.notes);

    console.log(store.getNotes());
    console.log(app.notes)
})
// shorthand methods
const $ = (selector) => document.querySelector(selector);
