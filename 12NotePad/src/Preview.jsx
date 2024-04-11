import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Markdown from 'react-markdown'
  

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

  const markdown = '# Hi, *Pluto*!'

  return (
    <div style={{display:'flex'}}>
    <div style={{flex:'0.5'}}>
      <textarea  value={content} style={{width:'100%', height:'70vh'}}  onChange ={(e) => {handleChange(e.target.value)}} ></textarea>
    </div>
    <div style={{flex:'0.5'}}>

    <Markdown>{content}</Markdown>
      
    </div>
    </div>
  )
}

export default Preview