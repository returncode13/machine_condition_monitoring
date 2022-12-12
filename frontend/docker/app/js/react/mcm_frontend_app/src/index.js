import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import AudioDropdown from './Components/AudioDropdown';
import Waveform from './Components/Waveform';
import eventBus from './Events/EventBus';
import {EVENT_FILE_CHOSEN,EVENT_MIC_CHOSEN} from './Events/EventList';
import AudioAnalyzerApp from './Components/AudioAnalyzerApp';
const DATA_URL="http://0.0.0.0:8000/data"


/**
 * Get the file list from DATA_URL
 **/
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


  /**
   * create the frontend page
   */
  async function populate_audio_dropdown(){
    const result = await (await list_audio_names(DATA_URL)).json();
    const al=result.files
    console.log("After await: ",al)
    return al;
    
  }

populate_audio_dropdown().then((fl)=>{
console.log("FILES: ",fl)

const root = ReactDOM.createRoot(document.getElementById("root"))
    root.render(
        <div>
           <App files={fl}/>
        </div>
    )
    })
// let fire_fileChosenEvent=(filechosen)=>{
//   if(filechosen!=''){
//     console.log("fire_fileChosenEvent:",filechosen)
//     eventBus.dispatch(EVENT_FILE_CHOSEN,{ file:filechosen })
//   }
    
    
// }




