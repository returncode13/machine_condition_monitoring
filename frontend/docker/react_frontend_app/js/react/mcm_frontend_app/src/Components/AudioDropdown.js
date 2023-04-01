import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import {Picker} from '@react-native-picker/picker';
import eventBus from '../Events/EventBus';
import {EVENT_FILE_CHOSEN,EVENT_MIC_CHOSEN} from '../Events/EventList'


/**
 * The dropdown component
 */
 class AudioDropdown extends React.Component{
    constructor(props){
        super(props);
        console.log("AudioDropdown PROPS:",props)
        this.files=props.files;
        this.state={
            files:props.files,     //audiolist from DATA_URL
            chosenFile:'',                 //selected file
            chosenIndex:0,                 //its index
            cb:props.cb                    //callback executed on select
        }

    }
    
    componentDidMount(){
        eventBus.on(EVENT_MIC_CHOSEN,(data)=>{
            console.log("AudioDropdown: EVENT_MIC_CHOSEN: ",data)
            this.setState({chosenFile:''});
            this.setState({chosenIndex:0})

        })
    }

    componentWillUnmount(){
        eventBus.remove(EVENT_MIC_CHOSEN);
    }

/*https://alexb72.medium.com/how-to-populate-react-native-picker-dynamically-with-values-from-an-api-dbe122e85a5a */
    render(){

        let files=this.state.files.map((item,value)=>{
            // console.log("F:",item,' Val: ',value)
            return (
                <Picker.Item label={item} value={item} key={value}/>
            )
        });

        return (
            <div>
            <Picker 
            selectedValue = {this.state.chosenFile}
            onValueChange={
                (itemValue,itemPosition) => {
                    this.setState({chosenFile:itemValue,chosenIndex:itemPosition});
                    eventBus.dispatch(EVENT_FILE_CHOSEN,{"file":itemValue});
                }
                
            }>
                
               {files}
               
            </Picker>
            <p>{"Selected file: "+this.state.chosenFile}</p>             
            </div>
        );
    }

};

export default AudioDropdown;