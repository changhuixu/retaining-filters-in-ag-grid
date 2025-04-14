import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GridApi,
  GridOptions,
  FilterChangedEvent,
  PaginationChangedEvent,
  GridReadyEvent,
} from 'ag-grid-community';
import {
  dateColumnDef,
  UserDetailButtonRendererComponent,
  UsersService,
} from '../../shared';
import { UsersGridService } from '../services/users-grid.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  standalone: false,
})
export class UsersListComponent implements OnInit {
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
        valueGetter: (params: any) =>
          params.data.first + ' ' + params.data.last,
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
    columnTypes: {
      dateColumn: dateColumnDef,
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

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
    this.gridApi.autoSizeAllColumns(); // will resize all visible columns
    this.gridApi.sizeColumnsToFit(); // will resize all columns to fit visible.
    const filters = this.gridService.getFiltersFromQueryParams(
      this.route.snapshot.queryParams
    );
    filters && this.gridApi.setFilterModel(filters);
    setTimeout(
      () => this.gridApi.paginationGoToPage(this.gridService.currentPageNumber),
      100
    ); // https://github.com/ag-grid/ag-grid/issues/6343
  }

  @HostListener('window:resize')
  onResize() {
    this.gridApi?.sizeColumnsToFit();
  }
}
