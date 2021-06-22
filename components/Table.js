import React from 'react'
import { useTable, useFilters, useSortBy, useRowSelect } from 'react-table';
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

export default function Table(props) {

    const data = React.useMemo(() => props.userData, [])

    const defaultColumn = React.useMemo(
        () => ({
            Filter: TextFilter,
        }),
        []
    )

    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
          const defaultRef = React.useRef()
          const resolvedRef = ref || defaultRef
      
          React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
          }, [resolvedRef, indeterminate])
      
          return (
            <>
              <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
          )
        }
      )
      

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'ID',
            },
            {
                Header: 'Name',
                accessor: 'Name',

            },
            {
                Header: 'Location',
                accessor: 'Location',

            },
            {
                Header: 'Devices',
                accessor: 'Devices',

            },
            {
                Header: 'LastServicedDate',
                accessor: 'LastServicedDate',

            },
            {
                Header: 'ServiceDueDate',
                accessor: 'ServiceDueDate',

            },
            {
                Header: 'Contact',
                accessor: 'Contact',

            }
        ],
        []
    );
    const tableInstance = useTable({ columns, data, defaultColumn }, useFilters, useSortBy, useRowSelect , 
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
        );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
    
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = tableInstance;

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


    return (
        <Styles>
            <table {...getTableProps()}>
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
                    {rows.map(
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

            <pre>
        </pre>
            <br />
        </Styles>
    )
}








{/* <code>
{JSON.stringify(
    {
    selectedRowIds: selectedRowIds,
    'selectedFlatRows[].original': selectedFlatRows.map(
        d => d.original
    ),
    },
    null,
    2
)}
</code> */}