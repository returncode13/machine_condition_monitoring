
console.log("INSIDE audio_list.js")
const http = require('http')
const fs = require('fs')
base_url="http://0.0.0.0:8000/"
audio_filelist_url=base_url+"data"



  //list the names of all the files in "location"
  async function list_audio_names(location){
    try{
      console.log("inside list_audio_names function with location: ",location)
      const file_list=await(fetch(location))  
      return file_list;
      
    }
    catch(error){
      console.log("ERRORED!: ",error)
    }
  }


  async function log_audio_names(){
    const result = await (await list_audio_names(audio_filelist_url)).json();
    console.log("After await: ",result)
    updateHTML("id_audio_list","somedizzvalue")
    let cd=document.getElementById("id_audio_list")
    console.log("Chosen value: ",cd)
    // cd.setAttribute('data-value',"dummy")
  }

  function updateHTML(elmId, value) {
    var elem = document.getElementById(elmId);
    console.log("elem: ",elem)
    if(typeof elem !== 'undefined' && elem !== null) {
      elem.innerHTML = value;
    }
  }

  ll=log_audio_names()

  // window.onload = function() {
  //   addPageContents();  //example function call.
  // }

  window.addEventListener('load', function () {
    console.log("It's loaded!")
  }
  )
 