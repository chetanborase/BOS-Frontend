import React from 'react';

const Table = (props) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = props.tableProps


    return (
        <table
            className={props.style?.table}
            {...getTableProps()}>
            <thead
                className={props.style?.headerRow}>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                className={props.style?.headerCell}
                                {...column.getHeaderProps()}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody
                className={props.style?.body}
                {...getTableBodyProps()}>
                {rows?.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}
                            className={props.style?.bodyRow}>

                            {row?.cells.map(cell => {
                                return <td
                                    className={props.style?.bodyCell}
                                    {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                    </td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
            {/* <tfoot>
      {footerGroups.map(footerGroup => (
        <tr {...footerGroup.getFooterGroupProps()}>
          {footerGroup.headers.map(column => (
            <td {...column.getFooterProps()}>{column.render('Footer')}</td>
          ))}
        </tr>
      ))}
    </tfoot> */}
        </table>
    );
}

export default Table;
