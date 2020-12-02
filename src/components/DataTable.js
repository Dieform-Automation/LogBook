import React from 'react';
import PropTypes from 'prop-types';
import {
  useAsyncDebounce,
  useExpanded,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

import DownChevron from '../assets/chevron-down.svg';
import Search from '../assets/search.svg';

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  return (
    <div className="flex space-x-2 items-center">
      <Search className="h-6 w-6" />
      <input
        className="form-input"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} records...`}
      />
    </div>
  );
};

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array,
  globalFilter: PropTypes.any,
  setGlobalFilter: PropTypes.func,
};

const DataTable = ({ columns, data, renderRowSubComponent }) => {
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    useExpanded,
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
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  return (
    <div className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-4 overflow-x-auto space-y-4">
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        {/* Apply the table props */}
        <table
          className="table-auto text-center min-w-full leading-normal"
          {...getTableProps()}
        >
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
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-xs font-semibold text-gray-100 uppercase tracking-wider"
                        key={key}
                        // Add the sorting props to control sorting
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {
                          // Render the header
                          column.render('Header')
                        }
                        {/* Add a sort direction indicator */}
                        <span>
                          {' '}
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <DownChevron className="transform rotate-180 inline w-4 h-4" />
                            ) : (
                              <DownChevron className="inline w-4 h-4" />
                            )
                          ) : (
                            ''
                          )}
                        </span>
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
                  <React.Fragment key={key}>
                    {/* Apply the row props */}
                    <tr {...row.getRowProps()}>
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
                    {row.isExpanded ? (
                      <tr>
                        <td className="text-left" colSpan={visibleColumns.length}>
                          {/*
                            Inside it, call our renderRowSubComponent function. In reality,
                            you could pass whatever you want as props to
                            a component like this, including the entire
                            table instance. But for this example, we'll just
                            pass the row
                          */}
                          {renderRowSubComponent({ row })}
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
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
            {[10, 20, 30, 40, 50].map((pageSize) => (
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
  columns: PropTypes.array,
  data: PropTypes.array,
  renderRowSubComponent: PropTypes.func,
};

export default DataTable;
