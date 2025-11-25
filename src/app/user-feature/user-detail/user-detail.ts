import { AsyncPipe, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { UsersGridFiltersParams, UsersGridService } from '../users-grid.service';
import { User, UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail implements OnInit, AfterViewInit {
  user$!: Observable<User | null>;
  btn = viewChild<ElementRef>('btn');
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
          return of(null);
        }
        return this.svc.getUser(params.get('id') ?? '');
      })
    );
  }

  ngAfterViewInit() {
    this.btn()!.nativeElement.focus();
  }
}
