import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
  

function Preview() {
  const [content, setContent] = useState("")
  let {noteId } = useParams()


  const handleChange = (e) => {
    setContent(e)
    let oldNotes = localStorage.getItem("notes")
    let oldNotesData = JSON.parse(oldNotes)
    let oldNotesDataAry 
    = oldNotesData?.data || []
    let currentNote = oldNotesDataAry.find((item) => item.id == noteId)
    currentNote.content = e
    let currentNoteIndex = oldNotesDataAry.findIndex((item) => item.id === noteId)
    let newNotes = [...oldNotesDataAry]
    newNotes[currentNoteIndex]  = currentNote
    let  dataToSave = {data: newNotes}
    localStorage.setItem("notes",JSON.stringify(dataToSave))

  }

  const getNoteContent =async () => {
    let oldNotes = await localStorage.getItem("notes")
    let oldNotesData = 
    JSON.parse(oldNotes)
    console.log('oldNotesData:',oldNotesData);
    let oldNotesDataAry 
  = oldNotesData?.data || []
    console.log('oldNotesDataArray:' ,oldNotesDataAry);
    let currentNote = oldNotesDataAry.find((item) => String(item.id) == String(noteId))
    console.log("Current note: ",currentNote)

    console.log(`Note Id: ${noteId} `)
    console.log('oldNotedataArray:', oldNotesDataAry);
    setContent(currentNote?.content || "")
  }

  useEffect(() => {

    if(noteId) {
      getNoteContent()
    }
    
  }, [noteId])

  return (
    <>
    <h1>Enter note content</h1>
    <textarea value={content} onChange={(e) => handleChange(e.target.value)} placeholder='enter something' style={{width: '100%' , height:'70vh'}} ></textarea>
    </>
  )
}

export default Preview