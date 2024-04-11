import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField'
import {Stack} from "@mui/material"

function App() {
  const [notes, setNotes] = useState([])
  const [filteredNotes,setFilteredNotes] = useState([])

  const [ searchString, setSearchString] = useState("") 

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


  const getNotes = () => {
    let prevNotesRaw =  localStorage.getItem("notes")
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

  const handleSearch = (text) => {
    setSearchString(text)
    if(text.length <= 0){
      setFilteredNotes(notes)
    } else{
    // text is variable input we get from input field
   
    // "notes" is a state that contains ARRAY of all notes, we placed data in it using geeNotes() function
    // Then we 
    let newNotes = notes.filter((note) => String(note.title).includes(text))
    setFilteredNotes(newNotes) }
  }

  useEffect(() => {
    setFilteredNotes(notes)
  },[notes])
  
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <TextSnippetOutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes App
          </Typography>


          <Stack spacing={2} direction="row">

          <TextField
          placeholder='Search'
          value={searchString} onChange={(e) => handleSearch(e.target.value)}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#1A1A1A",
              
            }}
          />

          <Button color="primary" variant='contained' onClick={() => addNote()}
            sx={{
              color: '#0000ff',
              backgroundColor: "#FFFFFF",
              "&: hover": {
                backgroundColor: "#FFFFFF"
              },
            }}
            disableElevation={true}
          >Create</Button>
          </Stack>


        </Toolbar>
      </AppBar>
    </Box>
      
      <Box p={2}>
      {
       filteredNotes.map((note) => (
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
      </Box>
    </div>
  )
}

export default App
