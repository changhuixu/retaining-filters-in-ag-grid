import { Injectable } from '@angular/core';
import {
  TextFilterModel,
  DateFilterModel,
  NumberFilterModel
} from 'ag-grid-community';
import { ICombinedSimpleModel } from 'ag-grid-community/dist/lib/filter/provided/simpleFilter';

interface UsersListFilters {
  username: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  first: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  last: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  dob: DateFilterModel | ICombinedSimpleModel<DateFilterModel>;
  gender: TextFilterModel | ICombinedSimpleModel<TextFilterModel>;
  seniority: NumberFilterModel | ICombinedSimpleModel<NumberFilterModel>;
}

@Injectable({
  providedIn: 'root'
})
export class UsersListFilterService {
  filters: UsersListFilters;
  readonly storageKey = 'UsersListFilters';
  constructor() {}

  getFiltersFromRouteParams(params: {
    username?: string;
    first?: string;
    last?: string;
    dob?: string;
    gender?: string;
    seniority?: string;
  }): UsersListFilters {
    return null;
  }

  parseFilterFromString(s: string) {}
}
