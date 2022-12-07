import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Picker} from '@react-native-picker/picker';

const DATA_URL="http://0.0.0.0:8000/data"


class AudioDropdown extends React.Component{
    constructor(props){
        super(props);
        console.log("PROPS:",props)
        this.file_list=props.file_list;
        this.state={
            file_list:props.file_list,
            chosenFile:'',
            chosenIndex:0
        }

    }
    

    render(){

        let files=this.state.file_list.map((item,value)=>{
            console.log("F:",item,' Val: ',value)
            return (
                <Picker.Item label={item} value={item} key={value}/>
            )
        });

        return (
            <div>
            <Picker 
            selectedValue = {this.state.chosenFile}
            onValueChange={
                (itemValue,itemPosition) => 
                this.setState({chosenFile:itemValue,chosenIndex:itemPosition})
            }>
                
               {files}
               
            </Picker>
            <p>{"Selected file: "+this.state.chosenFile}</p>
            </div>
        );
    }


    populate_picker_items(){
        console.log("PPI called")
        for(let i=0;i<this.state.file_list.length;i++){
            <Picker.Item label={this.state.file_list[i]} value={this.state.file_list[i]}/>
        }
    }
};





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


  async function populate_audio_dropdown(){
    const result = await (await list_audio_names(DATA_URL)).json();
    const al=result.files
    console.log("After await: ",al)
    
    // cd.setAttribute('data-value',"dummy")
    const root = ReactDOM.createRoot(document.getElementById("root"))
    root.render(<AudioDropdown file_list={al}/>)
  }

var list_of_files=populate_audio_dropdown()
// console.log("LIST OF FILES: ",(list_of_files))



