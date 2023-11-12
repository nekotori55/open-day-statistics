import React, {useMemo, useState} from "react";
import {AgGridReact} from "ag-grid-react";


const LeadersTable = ({rowData}) => {
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [columnDefs, setColumnDefs] = useState([
        {field: 'region', headerName: 'Регион'},
        {field: 'count', headerName: 'Количество', sortable: true, sort: 'desc'},
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
                // paginationPageSize={2}
                paginationAutoPageSize={true}
            />
        </div>
    );
};


export default LeadersTable;
