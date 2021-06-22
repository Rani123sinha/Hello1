import react from 'react';
import React, { Component } from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';



class Grid extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            
           columnDefs: [
               {headerName: 'site_id',field:'site_id',sortable: true, filter: true,checkboxselection:true },
               {headerName: 'name',field:'name',sortable: true ,filter: true},
               {headerName: 'location',field:'location',sortable: true ,filter: true},
               {headerName: 'devices',field:'devices',sortable: true ,filter: true},
               {headerName: 'lastServicedDate',field:'lastServicedDate',sortable: true ,filter: true},
               {headerName: 'serviceDueDate',field:'serviceDueDate',sortable: true ,filter: true},
               {headerName: 'contact',field:'contact',sortable: true ,filter: true}
           ],
           
           rowData:null,
        };
    }
     componentDidMount(){
         fetch('https://spotfire.azurewebsites.net/api/GetSite?')
         .then(res => res.json())
         .then(rowData => this.setState({rowData}))
         .catch(err =>console.log(err));

     }
     
     

    render(){
        {console.log(this.state.rowData)}
        return(

            
            <div
            className="ag-theme-balham"
            style={{
                width: '100%',
                height:'100vh'
                
            }}
            >
                <AgGridReact
                columnDefs={this.setState.columnDefs}
                rowData={this.state.rowData}
                
                >
                    <AgGridColumn field="site_id" sortable={true}  filter="agNumberColumnFilter" CheckboxSelectionAgGridColumn={true}  resizable={true}></AgGridColumn>
                    <AgGridColumn field="name" sortable={true} filter="agTextColumnFilter" resizable={true}></AgGridColumn>
                    <AgGridColumn field="location" sortable={true} filter="agTextColumnFilter" resizable={true}></AgGridColumn>
                    <AgGridColumn field="devices" sortable={true}  filter="agNumberColumnFilter" resizable={true}></AgGridColumn>
                    <AgGridColumn field="lastServicedDate" sortable={true} filter={true} resizable={true}></AgGridColumn>
                    <AgGridColumn field="serviceDueDate" sortable={true} filter={true} resizable={true}></AgGridColumn>
                    <AgGridColumn field="contact" sortable={true}  filter={true} resizable={true}></AgGridColumn>
                </AgGridReact>
            </div>
            
        )
    }
}
export default Grid;
