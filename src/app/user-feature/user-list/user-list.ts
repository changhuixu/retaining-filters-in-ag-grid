import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {
  FilterChangedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
  PaginationChangedEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import { Observable } from 'rxjs';
import { UsersGridService } from '../users-grid.service';
import { UserDto, UsersService } from '../users.service';
import { UserDetailButtonRenderer } from './user-detail-button-renderer';

@Component({
  selector: 'app-user-list',
  imports: [AgGridAngular, AsyncPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  host: {
    'window:resize': 'onResize()',
  },
})
export class UserList {
  private gridApi!: GridApi;
  gridOptions = <GridOptions>{
    columnDefs: [
      {
        headerName: '',
        field: 'uuid',
        width: 100,
        minWidth: 70,
        filter: false,
        suppressHeaderMenuButton: true,
        cellRenderer: UserDetailButtonRenderer,
      },
      {
        headerName: 'User Name',
        field: 'username',
        minWidth: 150,
      },
      {
        headerName: 'Display Name',
        colId: 'name',
        valueGetter: (params: any) => params.data.first + ' ' + params.data.last,
        width: 200,
        minWidth: 160,
      },
      {
        headerName: 'DOB',
        field: 'dob',
        width: 150,
        minWidth: 150,
        cellDataType: 'date',
        valueFormatter: (params: ValueFormatterParams) =>
          new Date(params.value).toLocaleDateString('en-us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
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
    ],
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
  };
  rowData$: Observable<UserDto[]>;
  loading = false;

  constructor(
    private readonly svc: UsersService,
    private readonly gridService: UsersGridService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.rowData$ = this.svc.getAllUsers();
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

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
    this.gridApi.autoSizeAllColumns(); // will resize all visible columns
    this.gridApi.sizeColumnsToFit(); // will resize all columns to fit visible.
    const filters = this.gridService.getFiltersFromQueryParams(this.route.snapshot.queryParams);
    filters && this.gridApi.setFilterModel(filters);
    setTimeout(() => this.gridApi.paginationGoToPage(this.gridService.currentPageNumber), 100); // https://github.com/ag-grid/ag-grid/issues/6343
  }

  onResize() {
    this.gridApi?.sizeColumnsToFit();
  }
}
