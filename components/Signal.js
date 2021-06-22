import React, { Component } from 'react';
import { HubConnection } from '@aspnet/signalr';
import * as SignalR from '@aspnet/signalr';
// import { HubConnection } from '@aspnet/signalr-client';
import axios from 'axios';
class Signal extends Component {
  constructor() {
      super();
      this.state = {
        data1: [],
        site_id: '',
        device_id: '',
        alarm: '',
        trouble_count: '',
        description: '',
        maintainence_alert:'',
        raM_Usage:'',
        url:'',
        accessToken:'',
        hubConnection: null
      };
    }
  
  componentDidMount() {
    axios.get('https://spotfire.azurewebsites.net/api/SignalRConnection1?').then((res)=>{
     const data2=res.data;
     this.setState({url:data2.url});
     this.setState({accessToken:data2.accessToken});
     const options ={
         accessTokenFactory:() => this.state.accessToken
     };
      var con= new SignalR.HubConnectionBuilder()
      .withUrl(this.state.url,options)
      .configureLogging(SignalR.LogLevel.Information)
      .build();
      con.start().catch(error => console.error(error.toString()));
      con.on('notify' , data =>{
          console.log(data);
          let data3=JSON.parse(data);
          this.setState({site_id:data3.site_id,  
            device_id:data3.device_id,
            alarm:data3.alarm,
          trouble_count:data3.trouble_count,
             description:data3.description,
         maintainence_alert:data3.maintainence_alert,
            raM_Usage:data3.raM_Usage
           });
        
      });
     } ) ;
    }
  
  render() {
    return (
    <div>
      <p>SITE ID: {this.state.site_id}</p>
      <p>DEVICE ID: {this.state.device_id}</p>
      <p>alarm: {this.state.alarm}</p>
      <p>trouble_count: {this.state.trouble_count}</p>
      <p>description: {this.state.description}</p>
      <p>maintainence : {this.state.maintainence_alert}</p>
      <p>RAM_Usage: {this.state.raM_Usage}</p>


      </div>
    )
}
}

export default Signal;



