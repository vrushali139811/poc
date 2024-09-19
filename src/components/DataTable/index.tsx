import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { ColumnDef } from '@tanstack/react-table';

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
            <table >
                <thead >
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} >
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
                                <td key={cell.id} style={{color:"white"}}>
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