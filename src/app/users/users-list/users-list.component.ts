import { Component, OnInit, HostListener } from '@angular/core';
import { GridApi, GridOptions, ColumnApi } from 'ag-grid-community';
import { AgGridColumn } from 'ag-grid-angular';
import {
  UserDetailButtonRendererComponent,
  UsersService
} from 'src/app/shared';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  columnDefs = [];
  private gridApi: GridApi;
  private gridColumnApi;
  gridOptions = <GridOptions>{
    columnDefs: [
      {
        headerName: '',
        field: 'uuid',
        width: 100,
        minWidth: 80,
        filter: false,
        suppressMenu: true,
        cellRendererFramework: UserDetailButtonRendererComponent
      },
      {
        headerName: 'User Name',
        field: 'username',
        minWidth: 150
      },
      { headerName: 'First', field: 'first', width: 200, minWidth: 200 },
      { headerName: 'Last', field: 'last', width: 200, minWidth: 200 },
      {
        headerName: 'DOB',
        field: 'dob',
        width: 150,
        minWidth: 150,
        type: 'dateColumn'
      },
      { headerName: 'Gender', field: 'gender', width: 150, minWidth: 150 },
      {
        headerName: 'Seniority',
        field: 'seniority',
        width: 120,
        minWidth: 120,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter'
      }
    ] as AgGridColumn[],
    getRowNodeId: row => row.uuid,
    suppressDragLeaveHidesColumns: true,
    animateRows: true,
    rowHeight: 34,
    floatingFilter: true,
    pagination: true,
    paginationAutoPageSize: true,
    cacheQuickFilter: true,
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true
    },
    columnTypes: {
      dateColumn: {
        filter: 'agDateColumnFilter',
        cellRenderer: cell => {
          let d = new Date(cell.value);
          return (
            (d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
            '/' +
            (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
            '/' +
            d.getFullYear()
          );
        },
        filterParams: {
          comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
            var dateParts = cellValue.split('-');
            var year = Number(dateParts[0]);
            var month = Number(dateParts[1]) - 1;
            var day = Number(dateParts[2].slice(0, 2));
            var cellDate = new Date(year, month, day);
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      }
    }
  };
  rowData: any;

  constructor(private readonly svc: UsersService) {}

  ngOnInit() {
    this.svc.getAllUsers().subscribe(x => {
      this.rowData = x;
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  onGridReady(params: { api: GridApi; columnApi: ColumnApi; type: string }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.autoSizeAll(); // will resize all visible columns
    this.gridApi.sizeColumnsToFit(); // will resize all columns to fit visible.
  }
  private autoSizeAll() {
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }
}
