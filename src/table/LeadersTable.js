import React, {useMemo, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import "./LeadersTable.css"


const LeadersTable = ({rowData}) => {
    const gridStyle = useMemo(() => ({height: '100%', width: '80%'}), []);
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Регион',
            field: 'name',
            flex: 1,
            cellClass: "leader-table-cell",
        },
        {
            headerName: 'Количество',
            field: 'count',
            flex: 1,
            sort: 'desc',
            cellClass: "leader-table-cell",
        },
    ]);

    const getRowId = useMemo(() => {
        return (params) => params.data.id;
    }, []);

    return (
        <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
                rowClass="leader-table-row"
                rowData={rowData}
                columnDefs={columnDefs}
                rowSelection={'single'}
                animateRows={true}
                getRowId={getRowId}
                enableCellChangeFlash={true}
                pagination={true}
                suppressPaginationPanel={true}
                paginationPageSize={5}
            />
        </div>
    );
};


export default LeadersTable;
