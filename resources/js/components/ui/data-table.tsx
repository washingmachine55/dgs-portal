import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        columnResizeMode: 'onChange',
        defaultColumn: {
            size: 20, //starting column size
            minSize: 20, //enforced during column resizing
            maxSize: 500, //enforced during column resizing
        },
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={{
                                            width: `${header.getSize()}px`,
                                        }}
                                        className="pl-3 font-black"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="py-4 pl-7"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

// export function DataTableSmall<TData, TValue>({
//     columns,
//     data,
// }: DataTableProps<TData, TValue>) {
//     // eslint-disable-next-line react-hooks/incompatible-library
//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//     });
//     const rows = table.getRowModel().rows;

//     return (
//         <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {rows.length ? (
//                 rows.map((row) => (
//                     <Card
//                         key={row.id}
//                         className="transition-all hover:shadow-lg"
//                     >
//                         <CardHeader>
//                             {row.getVisibleCells().map((cell, index) => {
//                                 // Use the first cell as title, second as description for better UX
//                                 if (index === 0) {
//                                     return (
//                                         <CardTitle key={cell.id}>
//                                             {flexRender(
//                                                 cell.column.columnDef.cell,
//                                                 cell.getContext(),
//                                             )}
//                                         </CardTitle>
//                                     );
//                                 } else if (index === 1) {
//                                     return (
//                                         <CardDescription key={cell.id}>
//                                             {flexRender(
//                                                 cell.column.columnDef.cell,
//                                                 cell.getContext(),
//                                             )}
//                                         </CardDescription>
//                                     );
//                                 }
//                                 return null;
//                             })}
//                         </CardHeader>

//                         <CardContent className="text-sm text-muted-foreground">
//                             {row
//                                 .getVisibleCells()
//                                 .slice(2)
//                                 .map((cell) => (
//                                     <div
//                                         key={cell.id}
//                                         className="flex justify-between border-b py-1 last:border-0"
//                                     >
//                                         <span className="font-medium">
//                                             {flexRender(
//                                                 cell.column.columnDef.header,
//                                                 cell.getContext(),
//                                             )}
//                                         </span>
//                                         <span>
//                                             {flexRender(
//                                                 cell.column.columnDef.cell,
//                                                 cell.getContext(),
//                                             )}
//                                         </span>
//                                     </div>
//                                 ))}
//                         </CardContent>

//                         <CardFooter className="justify-end text-xs text-muted-foreground">
//                             ID: {row.id}
//                         </CardFooter>
//                     </Card>
//                 ))
//             ) : (
//                 <div className="col-span-full w-full py-10 text-center text-muted-foreground">
//                     No results found.
//                 </div>
//             )}
//         </div>
//     );
// }

export function DataTableSmall<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const rows = table.getRowModel().rows;

    return (
        <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {rows.length ? (
                rows.map((row) => (
                    <Card
                        key={row.id}
                        className="transition-all hover:shadow-lg"
                    >
                        <CardHeader>
                            {row.getVisibleCells().map((cell, index) => {
                                if (index === 0) {
                                    return (
                                        <CardTitle key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </CardTitle>
                                    );
                                } else if (index === 1) {
                                    return (
                                        <CardDescription key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </CardDescription>
                                    );
                                }
                                return null;
                            })}
                        </CardHeader>

                        <CardContent className="text-sm text-muted-foreground">
                            {row
                                .getVisibleCells()
                                .slice(2)
                                .map((cell) => (
                                    <div
                                        key={cell.id}
                                        className="flex justify-between border-b py-1 last:border-0"
                                    >
                                            <span className="font-bold pr-4">
                                                {typeof cell.column.columnDef
                                                    .header === 'string'
                                                    ? cell.column.columnDef.header
                                                    : cell.column.columnDef.meta
                                                        ?.label || ''}
                                            </span>
                                            <span className="align-self-center place-content-center items-center text-right overflow-hidden whitespace-pre min-w-32 max-w-52 block">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </span>
                                    </div>
                                ))}
                        </CardContent>
{/*
                        <CardFooter className="justify-end text-xs text-muted-foreground">
                            ID: {row.original.id}
                            ID: {row.id}
                        </CardFooter> */}
                    </Card>
                ))
            ) : (
                <div className="col-span-full w-full py-10 text-center text-muted-foreground">
                    No results found.
                </div>
            )}
        </div>
    );
}
