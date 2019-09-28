import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService, User } from 'src/app/shared';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User>;
  constructor(private route: ActivatedRoute, private svc: UsersService) {}

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
}
