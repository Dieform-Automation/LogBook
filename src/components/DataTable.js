import React from 'react';
import Proptypes from 'prop-types';
import { usePagination, useTable } from 'react-table';

const DataTable = ({ columns, data }) => {
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
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
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider"
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
              page.map((row, key) => {
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
        <div className="py-1 bg-white flex justify-evenly items-center">
          <p>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </p>
          <div className="flex list-none rounded my-2">
            <button
              className="outline-none relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 rounded-l hover:bg-gray-200 disabled:opacity-50"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Prev
            </button>
            <button
              className="outline-none relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r hover:bg-gray-200 disabled:opacity-50"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
          </div>
          <select
            className="outline-none relative block p-1 leading-tight bg-white border border-gray-300 rounded"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20, 25].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  columns: Proptypes.array,
  data: Proptypes.array,
};

export default DataTable;
