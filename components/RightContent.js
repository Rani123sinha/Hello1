import React from 'react';
import { NavLink } from "react-router-dom";


const RightContent = () => <div style={{ height: '70vh', width: '60vw',float: 'left' }} className="right-bar">
    
   <div className="fields">
        <label>Username</label>
        <select>
            <option>General</option>
            <option>Admin</option>
        </select>
    </div>
    <div className="fields">
        <label>Password</label>
        <input type="text" />
        <br /><br /><NavLink activeClassName="active" to="/Home"><input type="submit" value="Log In" data-test="submit" /></NavLink>
    </div>
    
  </div>
        

export default RightContent;
