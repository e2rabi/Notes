const notes = [];

const addNote =(note)=>{
notes.push(note);
}

function display(data){
    console.log(data);
}

const futureData = fetch("url");
futureData.then(display);

function createNote(name,description){
   const note = Object.create(null);
    note.name=name;
    note.description=description;
    note.display= function(){
        console.log("Note : "+note.name+ " description : "+note.description)
    }
    return note ;
}