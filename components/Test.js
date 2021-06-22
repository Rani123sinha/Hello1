import axios from 'axios';
import React, { Component } from 'react';

class Test extends Component{
    constructor() {
        super();
        this.state = {
            
        };
    componentDidMount(){
        axios.get('').then(function(res){
          var arr=(res.data)
           var newArr=arr.map.(value=>{

           })
        ) }
        
    render(){

    return  
    `<div>
    <div class="id"><p>${value.ID}</p></div>
    <div class="name"><p>${value.Name}</p></div>
    </div>

    }
    }
}










export default Test;