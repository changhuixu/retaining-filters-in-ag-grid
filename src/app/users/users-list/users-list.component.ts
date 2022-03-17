import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GridApi,
  GridOptions,
  ColumnApi,
  FilterChangedEvent,
  PaginationChangedEvent,
} from 'ag-grid-community';
import { AgGridColumn } from 'ag-grid-angular';
import { UserDetailButtonRendererComponent, UsersService } from '../../shared';
import { UsersGridService } from '../services/users-grid.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  gridOptions = <GridOptions>{
    columnDefs: [
      {
        headerName: '',
        field: 'uuid',
        width: 100,
        minWidth: 70,
        filter: false,
        suppressMenu: true,
        cellRenderer: UserDetailButtonRendererComponent,
      },
      {
        headerName: 'User Name',
        field: 'username',
        minWidth: 150,
      },
      {
        headerName: 'Display Name',
        colId: 'name',
        valueGetter: (params) => params.data.first + ' ' + params.data.last,
        width: 200,
        minWidth: 160,
      },
      {
        headerName: 'DOB',
        field: 'dob',
        width: 150,
        minWidth: 150,
        type: 'dateColumn',
      },
      { headerName: 'Gender', field: 'gender', width: 150, minWidth: 120 },
      {
        headerName: 'Seniority',
        field: 'seniority',
        width: 120,
        minWidth: 120,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
    ] as AgGridColumn[],
    getRowId: (row) => row.data.uuid,
    onFilterChanged: (event) => this.filterChanged(event),
    suppressDragLeaveHidesColumns: true,
    animateRows: true,
    pagination: true,
    paginationAutoPageSize: true,
    onPaginationChanged: (event) => this.paginationChanged(event),
    cacheQuickFilter: true,
    defaultColDef: {
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    columnTypes: {
      dateColumn: {
        filter: 'agDateColumnFilter',
        cellRenderer: (cell: any) => {
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
          },
        },
      },
    },
  };
  rowData: any;
  loading = false;

  constructor(
    private readonly svc: UsersService,
    private readonly gridService: UsersGridService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.svc
      .getAllUsers()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((x) => {
        this.rowData = x;
      });
  }

  filterChanged(event: FilterChangedEvent) {
    const filterModel = event.api.getFilterModel();
    this.gridService.persistFilters(filterModel);
    const params = this.gridService.getQueryParamsFromFilters();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  clearAllFilters() {
    this.gridApi.setFilterModel(null);
  }
  paginationChanged(event: PaginationChangedEvent) {
    if (event.newPage) {
      const n = event.api.paginationGetCurrentPage();
      this.gridService.persistCurrentPageNumber(n);
    }
  }

  onGridReady(params: { api: GridApi; columnApi: ColumnApi; type: string }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.autoSizeAll(); // will resize all visible columns
    this.gridApi.sizeColumnsToFit(); // will resize all columns to fit visible.
    const filters = this.gridService.getFiltersFromQueryParams(
      this.route.snapshot.queryParams
    );
    filters && this.gridApi.setFilterModel(filters);
    this.gridApi.paginationGoToPage(this.gridService.currentPageNumber);
  }

  @HostListener('window:resize')
  onResize() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  private autoSizeAll() {
    const allColumnIds: any[] = [];
    this.gridColumnApi
      ?.getAllColumns()
      ?.forEach((c) => allColumnIds.push(c.getColId()));
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }
}
