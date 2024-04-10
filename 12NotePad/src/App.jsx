import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState([])

  const navigate = useNavigate() 

  const addNote = () => {
    let title = window.prompt('Enter note title')
    
    let oldNotes = localStorage.getItem("notes")

    if(!oldNotes) {
      let uniqueId = Date.now()
      let noteBody = {
        id: uniqueId,
        title: title,
        content: ""
      }
      let notesAry = {data: [noteBody]}
      
      
      localStorage.setItem("notes",JSON.stringify(notesAry))
      navigate("/preview/"+uniqueId)
    } else {
      let uniqueId = Date.now()
      let noteBody = {
        id: uniqueId,
        title: title,
        content: ""
      }
      let oldNotesData = JSON.parse(oldNotes)
      let oldNotesDataAry  = oldNotesData?.data || []
      let newNotes = {data: [...oldNotesDataAry,noteBody]}
      
      
      localStorage.setItem("notes",JSON.stringify(newNotes))
      navigate("/preview/"+uniqueId)
    }

   
   
    


  }


  const getNotes = async () => {
    let prevNotesRaw = await localStorage.getItem("notes")
  let prevNotes = JSON.parse(prevNotesRaw)
  console.log("PREV NOTES:", prevNotes)
    if(prevNotes){
      setNotes(prevNotes?.data ||  [])
    }
  }

  useEffect(() => {
   getNotes()
  }, [])

  const deletenote = (id) => {
    console.log(id);
    let notesRaw = localStorage.getItem("notes")
  //  console.log("notesRaw: ",notesRaw)
    let notesParsed = JSON.parse(notesRaw)
   // console.log("notesParsed: ",notesParsed)

    let notesDataAry = notesParsed?.data
   // console.log("notesDataAry: ",notesDataAry)

    let notes = notesDataAry
    const filtered = notes.filter(note => String(note.id) !== String(id));

   // console.log("filtered Note :"+ filtered);
    let obj = {
      data: filtered
    }

    localStorage.setItem('notes', JSON.stringify(obj))
    setNotes(filtered)
    
    
  }
  
  return (
    <div>
      <button onClick={() => addNote()}>Create note</button>
      <h1>Note Pad</h1>
      {
       notes.map((note) => (
        <div onClick={() => navigate('/preview/'+ note.id)} style={{backgroundColor: "yellow", color: "#1A1A1A", padding: "5px",  marginBottom: "5px", borderBottom: "1px solid rgba(0,0,0,0.02)"}}>
          <h2 >{note?.title || 'untitled'}</h2>
          <p>{note?.content || 'NO description'} </p>
          <button onClick={(e) => {
            e.stopPropagation()
            deletenote(note.id)}
          }>Delete Note</button>
        </div>
       ))
       
      }
    </div>
  )
}

export default App
