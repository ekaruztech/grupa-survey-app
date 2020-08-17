import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
// import overlayFactory from 'react-bootstrap-table2-overlay';
import isEmpty from 'lodash/isEmpty';

export default ({
  columns,
  data,
  onTableChange,
  pagination,
  csvExport = false,
  ...rest
}) => {
  const { ExportCSVButton } = CSVExport;
  const paginationOptions = {
    paginationSize: 5,
    pageStartIndex: 1,
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: false, // Hide the going to First and Last page button
    hideSizePerPage: true, // Hide the sizePerPage drop down always
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    showTotal: true,
  };
  if (pagination && !isEmpty(pagination)) {
    paginationOptions.sizePerPage = pagination.per_page || 10;
    paginationOptions.totalSize = pagination.total_count;
    paginationOptions.page = pagination.current;
  }

  const columnHeaderOpts = columns.map((column, index) => {
    return {
      ...column,
      key: index,
      style: {
        ...column.style,
        whiteSpace: (column.style && column.style.whiteSpace) || 'nowrap',
      },
    };
  });
  if (csvExport) {
    return (
      <ToolkitProvider
        keyField="_id"
        data={data}
        classes="bg-white"
        columns={columnHeaderOpts}
        exportCSV
        striped
        hover
        bootstrap4
        onTableChange={onTableChange}
        remote
        noDataIndication={() => <div>No data available to display</div>}
        pagination={
          pagination ? paginationFactory(paginationOptions) : undefined
        }
        {...rest}
      >
        {props => (
          <div>
            <ExportCSVButton
              {...props.csvProps}
              className="btn btn-sm btn-outline-info"
            >
              Export CSV!!
            </ExportCSVButton>
            <hr />
            <BootstrapTable {...props.baseProps} />
          </div>
        )}
      </ToolkitProvider>
    );
  }

  return (
    <BootstrapTable
      keyField="_id"
      data={data}
      classes="bg-white"
      columns={columnHeaderOpts}
      striped
      hover
      bootstrap4
      onTableChange={onTableChange}
      remote
      noDataIndication={() => <div>No data available</div>}
      pagination={pagination ? paginationFactory(paginationOptions) : undefined}
      {...rest}
    />
  );
};
