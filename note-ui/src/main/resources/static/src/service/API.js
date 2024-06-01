const API = {
    url: "../data/notes.json",
    url2: "../data/deleted-notes.json",
    fetchNote: async (url) => {
        const result = await fetch(url);
        return await result.json();
    }
}

export async function loadNData() {
    /*   const data = await API.fetchNote(API.url);
      app.notes = JSON.parse(JSON.stringify(data));
      const cards = [];
      if (app.notes.length > 0) {
          app.notes.forEach(card => {
              cards.push(new Proxy(card, handler))
          })
          app.notes = cards;
      } */
    app.notes = [

        {
            "id": 1,
            "name": "Simple note 1",
            "description": "note 1 description",
            "isFavorit": "false",
            "color": "light-brown",
            "pinned": "true",
            "status": "F",
            "isRemoved": "false"
        },
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
        }
    ];
}

export async function loadDeletedNotes() {
    const data = await API.fetchNote(API.url2);
    app.deletedNotes = JSON.parse(JSON.stringify(data));
    const cards = [];
    if (app.deletedNotes.length > 0) {
        app.deletedNotes.forEach(card => {
            cards.push(new Proxy(card, handler))
        })
        app.deletedNotes = cards;
    }
}
const handler = {
    get: function (target, prop) {
        if (prop === 'isPinned' && target[prop] == "true") {
            // target['color']="purple"
            return target[prop];
        }
        else if (prop === 'isRemoved' && target[prop] == "true") {
            target['color'] = "removed"
            return target[prop];
        }
        else {
            return target[prop];
        }
    }
}
export default API;