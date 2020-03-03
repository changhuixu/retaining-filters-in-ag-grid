import { Injectable } from '@angular/core';
import {
  TextFilterModel,
  DateFilterModel,
  NumberFilterModel
} from 'ag-grid-community';
import { ICombinedSimpleModel } from 'ag-grid-community/dist/lib/filter/provided/simpleFilter';

interface UsersGridFilters {
  username?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  first?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  last?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  dob?: DateFilterModel | ICombinedSimpleModel<DateFilterModel>;
  gender?: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  seniority?: NumberFilterModel | ICombinedSimpleModel<NumberFilterModel>;
}

interface UsersGridFiltersParams {
  username?: string;
  first?: string;
  last?: string;
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
      first: JSON.parse(decodeURIComponent(params.first || null)),
      last: JSON.parse(decodeURIComponent(params.last || null)),
      dob: JSON.parse(decodeURIComponent(params.dob || null)),
      gender: JSON.parse(decodeURIComponent(params.gender || null)),
      seniority: JSON.parse(decodeURIComponent(params.seniority || null))
    };
  }

  convertFilterToQueryParams(): UsersGridFiltersParams {
    if (!this.filters || !Object.keys(this.filters).length) {
      return {
        username: null,
        first: null,
        last: null,
        dob: null,
        gender: null,
        seniority: null
      };
    }
    return <UsersGridFiltersParams>{
      username: encodeURIComponent(JSON.stringify(this.filters.username || null)),
      first: encodeURIComponent(JSON.stringify(this.filters.first || null)),
      last: encodeURIComponent(JSON.stringify(this.filters.last || null)),
      dob: encodeURIComponent(JSON.stringify(this.filters.dob || null)),
      gender: encodeURIComponent(JSON.stringify(this.filters.gender || null)),
      seniority: encodeURIComponent(JSON.stringify(this.filters.seniority || null))
    };
  }
}
