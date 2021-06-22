import axios from 'axios';
import React, { Component } from 'react';
// import React from 'react'
import './Devices.css';
import { Row, Col, Card } from 'antd';
import { Collapse } from 'antd';
import { HubConnection } from '@aspnet/signalr';
import * as SignalR from '@aspnet/signalr';
// import { HubConnection } from '@aspnet/signalr-client';


const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

class Sample extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            currentIndex: 0,
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
        }
    }
                                                                             
    handleclick() {
        axios.get("https://spotfire.azurewebsites.net/api/GetDeviceData? ").then(res => { this.setState({ ...this.state, data: res.data }) })
        {console.log(this.state.data)}
    }

    componentWillMount() { 
        axios.get('https://spotfire.azurewebsites.net/api/SignalRConnection?').then((res)=>{
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
         axios.get("https://spotfire.azurewebsites.net/api/GetDeviceData?").then(res => { this.setState({ ...this.state, data: res.data }) })
         
        //  this.setState({site_id:data3.site_id,  
        //    device_id:data3.device_id,
        //    alarm:data3.alarm,
        //  trouble_count:data3.Trouble_count,
        //     description:data3.Description,
        // maintainence_alert:data3.Maintainence_alert,
        //    raM_Usage:data3.RAM_Usage
        //   });
       
     });
    } ) ;
       
       this.handleclick() }
   
    render() {
        return <div class='main-container'>
            {console.log(this.state.data)}

           
            {/* <h5 style={{height:40,width:1200,backgroundColor:'blue',fontSize:20,color:'white',marginLeft:50}}>DEVICE</h5> */}
        <div className="fields" style={{backgroundColor:'whitesmoke'}}>
        {/* <Collapse style={{margin:"1px",backgroundColor:'whitesmoke',boxShadow: "4px 2px #888888"}} defaultActiveKey={['1']} onChange={callback}>
    <Panel style={{fontWeight:"bold",backgroundColor:'whitesmoke'}} header="Site" key="1" >
    
    {this.state.data.length ? <div id='SITE'style={{fontStyle:'Fantasy'}}><h4 > Site Name : {this.state.data[this.state.currentIndex].name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Site Location : {this.state.data[this.state.currentIndex].location}</h4></div> : null}
    </Panel>
                  
  </Collapse> */}
     </div>

     <div>
        <div class="button1">
                <button style={{float: "left",marginLeft:100,borderRadius:10}} > previous Site</button>
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            </div>
            
            <div class="button2">
                <button style={{float: "right",borderRadius:10}} > Next Site </button>
            </div>
        </div>      
                    
          
            
            {/* <div id='Location'><h4>Site Location:Mumbai</h4></div> */}
         
            <Row style={{marginTop: '60px'}}>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Card style={{height:450 ,border:"1px solid #ccc",boxShadow: "8px 4px #888888",borderRadius:10,marginTop:5}} title="General Details" bordered={false}>
                    Device Id : {this.state.data.length ? this.state.data[this.state.currentIndex].device_id : null}<br/>
                    Description : {this.state.data.length ? this.state.data[this.state.currentIndex].description : null}<br/>
                    SWE version :  <br/>
                    Last Seen :  <br/>
                    </Card>
                </Col>
                <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Card style={{height:450 ,border:"1px solid #ccc",boxShadow: "8px 4px #888888",borderRadius:10,marginTop:5}} title="Technical Details" bordered={false}>
                    IP Address : <br/>
                    RAM Address : <br/>
                    Ram Usage :  {this.state.data.length ? this.state.data[this.state.currentIndex].raM_Usage : null}<br/>
                    </Card>
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Card style={{height:450 ,border:"1px solid #ccc",boxShadow: "8px 4px #888888",borderRadius:10,marginTop:5}} title="Alerts" bordered={false}>
                    Maintance Alert :  {this.state.data.length ? this.state.data[this.state.currentIndex]. maintainence_alert : null}<br/>
                    Real Time Alert :  <br/>
        
                    Trouble Count :{this.state.data.length ? this.state.data[this.state.currentIndex].trouble_count: null}
    
                    </Card>
                </Col>
            </Row>

           
            
            <div class="button1">
                <button style={{float: "left",marginTop: 15,marginLeft:100,borderRadius:10}} type='text' onClick={() => this.setState({ ...this.state, currentIndex: this.state.currentIndex - 1 })}> previous Device</button>
                
            </div>
            
            <div class="button2">
                <button style={{float: "right",marginTop: 15,borderRadius:10}} type='text' onClick={() => this.setState({ ...this.state, currentIndex: this.state.currentIndex + 1 })} > Next Device </button>
            </div>

            <div style={{textAlign:"center",fontSize:15,marginTop: 11 }}>Site Count:{this.state.currentIndex+1}/6</div>
        </div>

    }
}


export default Sample;