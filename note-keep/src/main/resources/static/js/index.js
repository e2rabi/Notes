const notes = [];

const addNote =(note)=>{
notes.push(note);
}

function display(data){
    console.log(data);
}

const futureData = fetch("url");
futureData.then(display);