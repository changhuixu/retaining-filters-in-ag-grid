import { Injectable } from '@angular/core';
import {
  DateFilterModel,
  ICombinedSimpleModel,
  NumberFilterModel,
  TextFilterModel,
} from 'ag-grid-community';

interface UsersGridFilters {
  username?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  name?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  dob?: DateFilterModel | ICombinedSimpleModel<DateFilterModel>;
  gender?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  seniority?: NumberFilterModel | ICombinedSimpleModel<NumberFilterModel>;
}

export interface UsersGridFiltersParams {
  username?: string | null;
  name?: string | null;
  dob?: string | null;
  gender?: string | null;
  seniority?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UsersGridService {
  filters: UsersGridFilters | null = null;
  currentPageNumber: number = 0;

  constructor() {}

  persistCurrentPageNumber(n: number) {
    this.currentPageNumber = n;
  }

  persistFilters(filters: UsersGridFilters) {
    this.filters = filters;
  }

  getFiltersFromQueryParams(params: UsersGridFiltersParams): UsersGridFilters | null {
    if (!params || !Object.keys(params).length) {
      return null;
    }
    return {
      username: JSON.parse(decodeURIComponent(params.username ?? '')),
      name: JSON.parse(decodeURIComponent(params.name ?? '')),
      dob: JSON.parse(decodeURIComponent(params.dob ?? '')),
      gender: JSON.parse(decodeURIComponent(params.gender ?? '')),
      seniority: JSON.parse(decodeURIComponent(params.seniority ?? '')),
    };
  }

  getQueryParamsFromFilters(): UsersGridFiltersParams {
    if (!this.filters || !Object.keys(this.filters).length) {
      return {
        username: null,
        name: null,
        dob: null,
        gender: null,
        seniority: null,
      };
    }
    return <UsersGridFiltersParams>{
      username: encodeURIComponent(JSON.stringify(this.filters.username || null)),
      name: encodeURIComponent(JSON.stringify(this.filters.name || null)),
      dob: encodeURIComponent(JSON.stringify(this.filters.dob || null)),
      gender: encodeURIComponent(JSON.stringify(this.filters.gender || null)),
      seniority: encodeURIComponent(JSON.stringify(this.filters.seniority || null)),
    };
  }
}
