import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService, User } from 'src/app/shared';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  UsersGridService,
  UsersGridFiltersParams
} from '../services/users-grid.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, AfterViewInit {
  user$: Observable<User>;
  @ViewChild('btn') btn: ElementRef;
  filtersParams: UsersGridFiltersParams;
  constructor(
    private route: ActivatedRoute,
    private svc: UsersService,
    filterService: UsersGridService
  ) {
    this.filtersParams = filterService.getQueryParamsFromFilters();
  }

  ngOnInit() {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (Object.keys(params.keys).length === 0) {
          return null;
        }
        return this.svc.getUser(params.get('id'));
      })
    );
  }

  ngAfterViewInit() {
    this.btn.nativeElement.focus();
  }
}
