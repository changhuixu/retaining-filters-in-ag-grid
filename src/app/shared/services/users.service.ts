import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto, User } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllUsers(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>('assets/userdtos.json');
  }

  getUser(uuid: string): Observable<User> {
    return this.httpClient
      .get<User[]>('assets/users.json')
      .pipe(map(x => x.find(u => u.login.uuid === uuid)));
  }

  private mapToUserDto(x: User): UserDto {
    return {
      uuid: x.login.uuid,
      username: x.login.username,
      first: x.name.first,
      last: x.name.last,
      dob: x.dob.date,
      gender: x.gender,
      seniority: x.registered.age
    } as UserDto;
  }
}
