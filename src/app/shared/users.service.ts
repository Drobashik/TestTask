import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, map } from "rxjs";
import { ILink, IToken, IUser } from "./users";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private url: string = 'https://frontend-test-assignment-api.abz.agency/api/v1/'
    private token: string;

    public count: number = 6;
    public page: number = 1;

    constructor(private http: HttpClient) {}

    getToken() {
        return this.http.get<IToken>(`${this.url}token`).subscribe(data => {
            console.log(data.token);
            this.token = data.token;
        })
    }

    getUserById(id: number) {
        return this.http.get<ILink>(`${this.url}users/${id}`).pipe(
            map(response => {
                return response.user
            })
        )
    }
    
    getUsersData(page: number, count: number): Observable<ILink> {
        return this.http.get<ILink>(`${this.url}users/?page=${page}&count=${count}`)
    }

    getMorePages(): Observable<ILink> {
        this.page++;
        return this.getUsersData(this.page, this.count);
    }

    addUser(user: FormData) {
        return this.http.post<IUser>(`${this.url}users`, user, {
            headers: new HttpHeaders({
                'Token': this.token
            })
        })
    }
}