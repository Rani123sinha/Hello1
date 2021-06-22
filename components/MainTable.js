import React, { Component } from 'react'
import { Popover, Button } from 'antd';
//import Table from './Table';
import axios from 'axios';
import './Maintable.css';
import { useTable, useSortBy, useFilters } from 'react-table'
import styled from 'styled-components'

const Styles = styled.div`
  
  display: block;
    width: 100%;

  
  .tableWrap {
    display: block;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    width: 125%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`




export default function MainTable() {

    const [users, setUsers] = React.useState([]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'device_id',
            },

            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Location',
                accessor: 'location',
            },
            {
                Header: 'Devices',
                accessor: 'devices',
            },
            {
                Header: 'LastServicedDate',
                accessor: 'lastServicedDate',
            },
            {
                Header: 'ServiceDueDate',
                accessor: 'serviceDueDate',
            },
            {
                Header: 'Contact',
                accessor: 'contact',
            }
        ],
        []
    );


    const getUsers = () => {

        //https://sheetdb.io/api/v1/fn8jzbulx1b7x

        axios.get('https://spotfire.azurewebsites.net/api/GetSite?')
            .then(res => { setUsers(res.data); console.log(res.data) })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        getUsers()
    }, []);

     

    function handleAddRows(row) {
        // let stateArr = users
        // stateArr.push(row);
        // setUsers(stateArr)
        row.Device_id = Number(row.Device_id);
        row.Devices = Number(row.Devices);
        axios.post('https://spotfire.azurewebsites.net/api/CreateSite?', row).then(res => {
            window.location.reload();
            console.log(res)
        }).catch(err => { alert("something went wrong!") });
    }
    


    function Table({ columns, data }) {

        const defaultColumn = React.useMemo(
            () => ({
                Filter: TextFilter,
            }),
            []
        )

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable(
            {
                columns,
                data,
                defaultColumn
            },
            useFilters,
            useSortBy,
        )

        function TextFilter({
            column: { filterValue, preFilteredRows, setFilter, Header },
        }) {
            const count = preFilteredRows.length

            return (
                <input
                    value={filterValue || ''}
                    onChange={e => {
                        setFilter(e.target.value || undefined)
                    }}
                    placeholder={`Search by ${Header}`}
                />
            )
        }


        const firstPageRows = rows

        return (
            <>
                <table border= "1" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    // Add the sorting props to control sorting. For this example
                                    // we can add them into the header props
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        {
                                            (column.Header) === 'ID' || (column.Header) === 'Location' || (column.Header) === 'ServiceDueDate' ?
                                                <div>{column.canFilter ? column.render('Filter') : null}</div> :
                                                null
                                        }
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' ⌄'
                                                    : ' ⌃'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {firstPageRows.map(
                            (row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            )
                                        })}
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
                <br />
            </>
        )
    }



    let addRowObject = {};

    let content = (
        <>
            <input type="text" placeholder="ID" onChange={(e) => addRowObject.Device_id = (e.target.value)}></input><br />
            <input type="text" placeholder="Name" onChange={(e) => addRowObject.Name = (e.target.value)}></input><br />
            <input type="text" placeholder="Location" onChange={(e) => addRowObject.Location = (e.target.value)}></input><br />
            <input type="text" placeholder="Devices" onChange={(e) => addRowObject.Devices = (e.target.value)}></input><br />
            <input type="text" placeholder="LastSerivcedDate" onChange={(e) => addRowObject.LastServicedDate = (e.target.value)}></input><br />
            <input type="text" placeholder="ServiceDueDate" onChange={(e) => addRowObject.ServiceDueDate = (e.target.value)}></input><br />
            <input type="text" placeholder="Contact" onChange={(e) => addRowObject.Contact = (e.target.value)}></input><br />
            <Button onClick={() => { handleAddRows(addRowObject) }}>Add</Button>

        </>
    );

    return (
        <div>
            <Popover placement="rightTop" title={'Add row'} content={content} trigger="click">
                <Button>Add Site</Button>
            </Popover>
            <Table columns={columns} data={users} />

            {/* {users.map(object => {
                return <ul><li>{object.Name}</li><li>{object.ID}</li><li>{object.Location}</li></ul>;
            })} */}
        </div>
    )
}
