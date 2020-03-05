import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GridApi,
  GridOptions,
  ColumnApi,
  FilterChangedEvent
} from 'ag-grid-community';
import { AgGridColumn } from 'ag-grid-angular';
import {
  UserDetailButtonRendererComponent,
  UsersService
} from 'src/app/shared';
import { UsersGridFilterService } from '../services/users-grid-filter.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  private gridApi: GridApi;
  private gridColumnApi;
  gridOptions = <GridOptions>{
    columnDefs: [
      {
        headerName: '',
        field: 'uuid',
        width: 100,
        minWidth: 70,
        filter: false,
        suppressMenu: true,
        cellRendererFramework: UserDetailButtonRendererComponent
      },
      {
        headerName: 'User Name',
        field: 'username',
        minWidth: 150
      },
      {
        headerName: 'Display Name',
        colId: 'name',
        valueGetter: params => params.data.first + ' ' + params.data.last,
        width: 200,
        minWidth: 160
      },
      {
        headerName: 'DOB',
        field: 'dob',
        width: 150,
        minWidth: 150,
        type: 'dateColumn'
      },
      { headerName: 'Gender', field: 'gender', width: 150, minWidth: 120 },
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
    onFilterChanged: event => this.filterChanged(event),
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

  constructor(
    private readonly svc: UsersService,
    private readonly filterService: UsersGridFilterService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.svc.getAllUsers().subscribe(x => {
      this.rowData = x;
    });
  }

  filterChanged(event: FilterChangedEvent) {
    const filterModel = event.api.getFilterModel();
    this.filterService.persistFilters(filterModel);
    const params = this.filterService.getQueryParamsFromFilters();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  clearAllFilters() {
    this.gridApi.setFilterModel(null);
  }

  onGridReady(params: { api: GridApi; columnApi: ColumnApi; type: string }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.autoSizeAll(); // will resize all visible columns
    this.gridApi.sizeColumnsToFit(); // will resize all columns to fit visible.
    const filters = this.filterService.getFiltersFromQueryParams(
      this.route.snapshot.queryParams
    );
    filters && this.gridApi.setFilterModel(filters);
  }

  @HostListener('window:resize')
  onResize() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  private autoSizeAll() {
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(c => allColumnIds.push(c.colId));
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }
}
