import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, map } from "rxjs";
import { ILink, IUser } from "./users";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private url: string = 'https://frontend-test-assignment-api.abz.agency/api/v1/users'
    public count: number = 6;
    public page: number = 1;

    constructor(private http: HttpClient) {}
    
    getData(page: number, count: number): Observable<ILink> {
        return this.http.get<ILink>(`${this.url}?page=${page}&count=${count}`)
    }

    getMorePages(): Observable<ILink> {
        this.page++;
        return this.getData(this.page, this.count);
    }

    addUser(user: IUser) {
        this.http.post(this.url, user,)
    }
}