import { loadNData,loadDeletedNotes } from "./service/API.js";
import Router from "./service/Router.js";
import Card from "./componant/Card.js";
import CardPage from "./componant/CardPage.js";
import BaseComponant from "./componant/BaseComponant.js";
import PinnedCard from "./componant/PinnedCard.js";
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

