const API = {
    url: "./data/notes.json",
    url2: "./data/deleted-notes.json",
    fetchNote: async (url)=>{
        const result = await fetch(url);
        return await  result.json();
    }
}

export async function loadNData() {
    const data = await API.fetchNote(API.url);
    app.notes = JSON.parse(JSON.stringify(data));
    const cards = [];
    if(app.notes.length>0){
        app.notes.forEach(card=>{
             cards.push(new Proxy(card,handler))
        })
        app.notes = cards ;
      }
    }

export async function loadDeletedNotes() {
    const data = await API.fetchNote(API.url2);
    app.deletedNotes = JSON.parse(JSON.stringify(data));
    const cards = [];
    if(app.deletedNotes.length>0){
        app.deletedNotes.forEach(card=>{
             cards.push(new Proxy(card,handler))
        })
        app.deletedNotes = cards ;
      }
}
const handler = {
    get : function(target,prop){
        if(prop  === 'isPinned' && target[prop]=="true"){
           // target['color']="purple"
            return target[prop];
        }
        else if(prop  === 'isRemoved' && target[prop]=="true"){
            target['color']="removed"
            return target[prop];
        }
        else{
            return target[prop];
        }
    }
}  
export default API ;