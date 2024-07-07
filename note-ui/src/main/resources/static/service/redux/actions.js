const ADD_NOTE = "ADD_NOTE";
const addNote = (obj) =>
    ({ type: ADD_NOTE, payload: obj });

export { ADD_NOTE, addNote };