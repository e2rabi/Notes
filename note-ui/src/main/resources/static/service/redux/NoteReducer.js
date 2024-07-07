import { ADD_NOTE } from './actions.js'
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
const noteReducer = (state = initialState, action) => {
    if (action.type === ADD_NOTE) {
        return {
            ...state,
            notes: [...state.notes, action.payload],
        };
    }
};
export default noteReducer;