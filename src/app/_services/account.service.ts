import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    private apiUrl: string;
    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
        this.apiUrl = environment.apiUrl;
    }
    public get userValue() {
        return this.userSubject.value;
    }
    hasRole(role: string) {
        const user = this.userValue;
        return user;
        // return user && user.roles && user.roles.includes(role);
    }

    login(username: string, password: string): Observable<User> {
        const url = `${this.apiUrl}/smsplatform/auth/generateToken`;

        return this.http.post<User>(url, { username, password })
            .pipe(
                map(user => {
                    // Store user details and JWT token in session storage to keep the user logged in between page refreshes
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                    return user;
                })
            );
    }

    logout() {
        // remove user from local storage and set current user to null
        sessionStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    sessionStorage.setItem('user', JSON.stringify(user));
                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}