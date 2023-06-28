let topButton = document.getElementById("topButton")
let noteOverlay = document.getElementById("note-overlay")
let closeModalIcon = document.getElementById("closeModalIcon")
let titleOfNote = document.getElementById("titleOfNote")
let bottomIcon = document.getElementById("bottomIcon")
let noteForm = document.getElementById("noteForm")
let noteContent = document.getElementById("noteContent")
let notesSection = document.getElementById("notesSection")



function openModal (){
    noteOverlay.classList.remove("note-overlay")
    noteOverlay.classList.add("note-overlay-visible")
    titleOfNote.focus()
}

topButton.addEventListener("click", openModal)
bottomIcon.addEventListener("click", openModal)



function closeModal(){
    if(noteOverlay.classList.contains("note-overlay-visible")){
        noteOverlay.classList.remove("note-overlay-visible")
        noteOverlay.classList.add("note-overlay")
    }
}

closeModalIcon.addEventListener("click", closeModal)



let myNotes = []

function printNotesOnUI(){
    notesSection.textContent = ""
    
    myNotes.forEach(function(allNotesFromArray){
        let printNoteTitle = allNotesFromArray.theNoteTitle
        let printNoteContent = allNotesFromArray.theContentOfNote

        let noteDiv = document.createElement("div")
        noteDiv.classList.add("note-container")

        let titleAndIconDiv = document.createElement("div")
        titleAndIconDiv.classList.add("title-and-icon-container")

        let titleDiv = document.createElement("div")
        titleDiv.classList.add("title-container")

        let titleText = document.createElement("a")
        titleText.setAttribute("href", `${printNoteTitle}`)
        titleText.setAttribute("target", "_blank")
        titleText.textContent = printNoteTitle

        let iconDiv = document.createElement("div")
        iconDiv.classList.add("icon-container")

        let editIcon = document.createElement("i")
        editIcon.classList.add("fa-solid", "fa-pen-to-square")
        // editIcon.setAttribute(`onclick`, `editNotes('${printNoteContent}')`)
        editIcon.addEventListener("click", function(){
            editNote(printNoteTitle, printNoteContent)
        })
    

        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash-can")
        // deleteIcon.setAttribute(`onclick`, `deleteNote('${printNoteContent}')`)
        deleteIcon.addEventListener("click", function(){
            deleteNote(printNoteContent)
        })

        let descriptionDiv = document.createElement("div")
        descriptionDiv.classList.add("description-container")

        descriptionText = document.createElement("p")
        descriptionText.textContent = printNoteContent

        descriptionDiv.append(descriptionText)
        iconDiv.append( editIcon, deleteIcon)
        titleDiv.append(titleText)
        titleAndIconDiv.append(titleDiv, iconDiv)
        noteDiv.append(titleAndIconDiv, descriptionDiv)
        notesSection.append(noteDiv)

    })
}

function editNote(printNoteTitle, printNoteContent){
    // noteOverlay.classList.remove("note-overlay")
    // noteOverlay.classList.add("note-overlay-visible")
    openModal()

    titleOfNote.value = printNoteTitle
    noteContent.value = printNoteContent
    

    noteForm.removeEventListener("submit", submitNote)
    noteForm.addEventListener("submit", function(event){
        event.preventDefault()
        let updatedNoteTitle = titleOfNote.value
        let updatedNoteContent = noteContent.value

        myNotes.forEach(function(note){
            if(note.theContentOfNote === printNoteContent){
                note.theNoteTitle = updatedNoteTitle
                note.theContentOfNote = updatedNoteContent
            }
        })

        localStorage.setItem("myNotes", JSON.stringify(myNotes))
     fetchNotes()
     noteForm.reset()
     closeModal()

     titleOfNote.focus()

    })

    myNotes.forEach(function(note){
        if(note.theContentOfNote === printNoteContent){
            note.theNoteTitle = updatedNoteTitle
            note.theContentOfNote = updatedNoteContent
        }
    })

    localStorage.setItem("myNotes", JSON.stringify(myNotes))
    fetchNotes()
    noteForm.reset()
    closeModal()

    titleOfNote.focus()
}

function deleteNote(printNoteContent){
    myNotes.forEach(function(notes, index){
        if(notes.theContentOfNote === printNoteContent){
            myNotes.splice(index, 1)
        }
    })
    localStorage.setItem("myNotes", JSON.stringify(myNotes))
    fetchNotes()
}


function fetchNotes (){
    if(localStorage.getItem("myNotes")){
        myNotes = JSON.parse(localStorage.getItem("myNotes"))
    }
    printNotesOnUI()
}
fetchNotes()



noteForm.addEventListener("submit", submitNote)
function submitNote(event){
    event.preventDefault()
    let noteTitle = titleOfNote.value
    let contentOfNote = noteContent.value

    if(titleOfNote.value === ""){
        titleOfNote.style.border = "1px solid red"
    }

    if(noteContent.value === ""){
        noteContent.style.border = "1px solid red"
    }

    



    const myCreatedNotes = {
        theNoteTitle : noteTitle,
        theContentOfNote : contentOfNote
    }

    myNotes.push(myCreatedNotes)
    localStorage.setItem("myNotes", JSON.stringify(myNotes))
    fetchNotes()
    noteForm.reset()
    closeModal()
}


