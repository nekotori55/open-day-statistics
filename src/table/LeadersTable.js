import React, {useMemo, useState} from "react";
import {AgGridReact} from "ag-grid-react";


const LeadersTable = ({rowData}) => {
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Регион',
            field: 'region',
            flex: 1,
            cellStyle: {textAlign: 'left'},
        },
        {
            headerName: 'Количество',
            field: 'count',
            flex: 1,
            sort: 'desc',
            cellStyle: {textAlign: 'left'},
        },
    ]);

    const getRowId = useMemo(() => {
        return (params) => params.data.id;
    }, []);

    return (
        <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
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
