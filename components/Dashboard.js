import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import img1 from '../assets/img/bell.png'
import img2 from '../assets/img/product.png'
import img3 from '../assets/img/fleet.png'

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            persons: [],
            test: 0
        };
    }
    /*http://localhost:7071/api/Function1*/
    // https://sheetdb.io/api/v1/1hcj379qkq9h5
    componentDidMount() {
        axios.get("https://spotfire.azurewebsites.net/api/GetSite?")
            .then((res) => {
            const persons = res.data;
            const test = res.data.length;
            console.log(">Test>", test);
            this.setState({ persons, test });
        });
    }
    render() {
        return (

            <div id="rani">
                <div id="heading">
                    
                    <p>Free prototype plan (registered device 0/3)</p>
                </div>

                <div class="top">
                    <div id="first"><img class="PICTURE" src={img3} alt="fleet" /><p class="iconcontent">FLEET SECURITY</p></div>
                    <div id="second"><img class="PICTURE" src={img2} alt="product" /><p class="iconcontent">PRODUCT FLEET</p>


                        
                        <div class="Fleet"> <p id="TEST1" >{this.state.test} </p> </div>
                        <div class="Fleet"> <p id="TEST2">FLEET</p></div>
                    </div>


                    <div id="third"><img class="PICTURE" src={img1} alt="bell" /><p class="iconcontent">LIVE ALERTS</p></div>
                </div>
                <div class="bottom">
                    <div id="fourth"><p>NOTIFICATION</p></div>
                    <div id="fifth"><p>SOFTWARE STATUS</p></div>
                    <div id="sixth"><p>DEVICE REGISTRATION</p></div>
                </div>


            </div>


        )
    }
}
export default Dashboard;
