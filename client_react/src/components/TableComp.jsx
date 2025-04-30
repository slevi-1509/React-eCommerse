import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import '../styles/table.css';

export const TableComp = ({ header, data, tableHeight, tableWidth }) => {
    const [tableData, setTableData] = useState ([])
    const [tableHeader, setTableHeader] = useState ([])
    const [lastCellIndex, setLastCellIndex] = useState ([]);
    
    useEffect (() => {
        const tableComp = () => {
            setTableData([...data]);
            setTableHeader([...header]);
            setLastCellIndex([0,true])
        }
        tableComp();
    }, [])

    const sortTable = (e, h) => {
        let tempArr = [];
        let indexArr = [];
        if (e.target.cellIndex==lastCellIndex[0]){
            setLastCellIndex([e.target.cellIndex,!lastCellIndex[1]]);
            indexArr = [e.target.cellIndex,!lastCellIndex[1]];
        } else {
            setLastCellIndex([e.target.cellIndex,true]);
            indexArr = [e.target.cellIndex,true];
        }
        if (indexArr[1]) {
            tempArr = tableData.sort(((a,b) => {
                if (a[h] < b[h]) {
                    return -1;
                }
                if (a[h] > b[h]) {
                    return 1;
                }
                return 0;
            }))
        } else {
            tempArr = tableData.sort(((a,b) => {
                if (a[h] < b[h]) {
                    return 1;
                }
                if (a[h] > b[h]) {
                    return -1;
                }
                return 0;
            }))
        }
        setTableData([...tempArr]);
    }

    return (
        <div>
            <Table className='tableContainer' style={{width: tableWidth}} striped bordered hover>
                <thead >
                    <tr>
                        {tableHeader.map((h, index) => {
                            return(
                                // <th>#</th>
                                <th style={{cursor:'pointer'}} key={index} onClick={(e)=>sortTable(e, h)} >{h}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody style={{maxHeight: tableHeight}}>
                    {tableData.map((tableRow, index1) => {
                        return (
                            <tr key={index1}>
                                {Object.values(tableRow).map((rowItem, index2) => {
                                    return <td key={index2}>{rowItem}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
        )                   
}