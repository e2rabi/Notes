

import { addNote } from './actions.js'

class Store {
    constructor(reducer) {
        this.store = Redux.createStore(reducer);
    }
    save(objects) {
        objects.forEach(e => {
            this.store.dispatch(addNote(e));
        })
    }

    getNotes() {
        return this.store.getState().notes;
    }
}
export default Store;

