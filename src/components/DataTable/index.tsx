import {
 
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { ColumnDef } from '@tanstack/react-table';
import styles from './dataTbale.module.scss'

export interface ITanStackDataTable {
    data: any[];
    columns: ColumnDef<any>[];
  
  }

const DataTable : React.FC<ITanStackDataTable> =({data,columns})=> {

   

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })
    return (
        <div>
            <table style={{ borderCollapse: 'collapse',borderSpacing:0, width: '100%',tableLayout:"fixed" }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} >
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className={styles.th}  style={{ borderCollapse:"collapse",outline: '1px solid rgba(255, 255, 255, 0.3)',textAlign:"left",padding:"2%"}}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} style={{color:"white",borderCollapse:"collapse",  outline: '1px solid rgba(255, 255, 255, 0.3)',overflowWrap:"break-word",whiteSpace:"normal",wordWrap:"break-word",padding:'2%'}}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                </table>
        </div>
    )
}

export default DataTable