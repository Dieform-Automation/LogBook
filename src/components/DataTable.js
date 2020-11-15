import React from 'react';
import Proptypes from 'prop-types';
import { useTable } from 'react-table';

const DataTable = ({ columns, data }) => {
  const tableInstance = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        {/* Apply the table props */}
        <table className="min-w-full leading-normal" {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup, key) => (
                // Apply the header row props
                <tr key={key} {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column, key) => (
                      // Apply the header cell props
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        key={key}
                        {...column.getHeaderProps()}
                      >
                        {
                          // Render the header
                          column.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row, key) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr key={key} {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell, key) => {
                        // Apply the cell props
                        return (
                          <td
                            className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                            key={key}
                            {...cell.getCellProps()}
                          >
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  columns: Proptypes.array,
  data: Proptypes.array,
};

export default DataTable;
