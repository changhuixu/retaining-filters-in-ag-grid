import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

export interface UserDto {
  uuid: string;
  username: string;
  first: string;
  last: string;
  dob: Date;
  gender: string;
  seniority: number;
}
export interface User {
  id: { name: string; value: string };
  name: { title: string; first: string; last: string };
  dob: { date: Date; age: number };
  email: string;
  gender: string;
  location: {
    city: string;
    coordinates: { latitude: string; longitude: string };
    country: string;
    postcode: number;
    state: string;
    street: { number: number; name: string };
    timezone: { description: string; offset: string };
  };
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  nat: string;
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: {
    age: number;
    date: Date;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly httpClient = inject(HttpClient);

  getAllUsers(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>('userdtos.json').pipe(shareReplay(1));
  }

  getUser(uuid: string): Observable<User | null> {
    return this.httpClient
      .get<User[]>('users.json')
      .pipe(map((x) => x.find((u) => u.login.uuid === uuid) ?? null));
  }

  private mapToUserDto(x: User): UserDto {
    return {
      uuid: x.login.uuid,
      username: x.login.username,
      first: x.name.first,
      last: x.name.last,
      dob: x.dob.date,
      gender: x.gender,
      seniority: x.registered.age,
    } as UserDto;
  }
}
