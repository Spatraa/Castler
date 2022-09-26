import React, { useState } from "react";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import  "./App.css"
import axios from "axios";
function App() {
  let [error,setError]=useState("");
  let[uid,setUid]=useState(0);
  let[url,setUrl]=useState("https://reqres.in/api/users");

  let [data,setData]=useState(null);
  function handleInput(id){
      setData(null);
    if(id>12 || id<1){
       setUid(0);
      setError("Please enter from 1 to 12 number");
    }
    else{
      setUid(id);
      setError("");
      setUrl(`https://reqres.in/api/users/${id}`);
      
    }  
  }
    function getUser(){
      if(error==="" && uid>0){

        axios.get(url)
        .then((res)=>setData(res.data.data))
        .catch((error)=>console.log(error))

      }
    }
  return (
    <>
    <div className="App" style={{textAlign:"center"}}>
      <input type="number" id="input" onChange={(e)=>handleInput(parseInt(e.target.value))} />
      <Button id="btn" onClick={getUser}>Submit</Button><br/>
      <span style={{color:"red", marginLeft:-150}}>{error}</span>
       <div id="userDiv">
       {data!==null &&<Paper elevation={10} sx={{width:350, bgcolor:"smoke"}}>
         <Avatar variant="rounded" sx={{ width: 140, height: 150, bgcolor: "green", marginLeft:12,marginTop:5 }}>
            <img src={data!==null?data.avatar:""} alt="avatar"/>
            </Avatar> 
            <TextField className="descrip" variant="standard" sx={{width: 250, margin:1}} label="Name" value={data!==null?(data.first_name + " " +data.last_name):""}/><br/> 
            <TextField className="descrip" variant="standard" sx={{width: 250,margin:1}} label="Email:" value={data!==null?data.email:""}/> <br/> 
            <TextField className="descrip" variant="standard" sx={{width: 250,marginBottom:3, }} label="Description:" value={data!==null?"Hi! I'm "+data.first_name+". Nice to meet you.":""}/><br/> 
            </Paper>
         }
         </div>
       </div>
       </>
  );
}

export default App;
