import { loadNData,loadDeletedNotes } from "./service/API.js";
import Router from "./service/Router.js";

// Global object
window.app = {}
app.router = Router;
app.notes = [];
app.deletedNotes=[];


// wait for this event to manipulate the DOM
window.addEventListener("DOMContentLoaded",async()=>{
    console.log("DOM is ready")
    app.router.init();
    await loadNData();
    await loadDeletedNotes();
})
// shorthand methods
const $ = (selector) => document.querySelector(selector);
