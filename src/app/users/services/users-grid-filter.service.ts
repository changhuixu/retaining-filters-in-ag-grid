import { Injectable } from '@angular/core';
import {
  TextFilterModel,
  DateFilterModel,
  NumberFilterModel
} from 'ag-grid-community';
import { ICombinedSimpleModel } from 'ag-grid-community/dist/lib/filter/provided/simpleFilter';

interface UsersGridFilters {
  username?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  name?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  dob?: DateFilterModel | ICombinedSimpleModel<DateFilterModel>;
  gender?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  seniority?: NumberFilterModel | ICombinedSimpleModel<NumberFilterModel>;
}

export interface UsersGridFiltersParams {
  username?: string;
  name?: string;
  dob?: string;
  gender?: string;
  seniority?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersGridFilterService {
  filters: UsersGridFilters;
  constructor() {}

  persistFilters(filters: UsersGridFilters) {
    this.filters = filters;
  }

  getFiltersFromQueryParams(params: UsersGridFiltersParams): UsersGridFilters {
    if (!params || !Object.keys(params).length) {
      return null;
    }
    return {
      username: JSON.parse(decodeURIComponent(params.username || null)),
      name: JSON.parse(decodeURIComponent(params.name || null)),
      dob: JSON.parse(decodeURIComponent(params.dob || null)),
      gender: JSON.parse(decodeURIComponent(params.gender || null)),
      seniority: JSON.parse(decodeURIComponent(params.seniority || null))
    };
  }

  convertFilterToQueryParams(): UsersGridFiltersParams {
    if (!this.filters || !Object.keys(this.filters).length) {
      return {
        username: null,
        name: null,
        dob: null,
        gender: null,
        seniority: null
      };
    }
    return <UsersGridFiltersParams>{
      username: encodeURIComponent(JSON.stringify(this.filters.username || null)),
      name: encodeURIComponent(JSON.stringify(this.filters.name || null)),
      dob: encodeURIComponent(JSON.stringify(this.filters.dob || null)),
      gender: encodeURIComponent(JSON.stringify(this.filters.gender || null)),
      seniority: encodeURIComponent(JSON.stringify(this.filters.seniority || null))
    };
  }
}
