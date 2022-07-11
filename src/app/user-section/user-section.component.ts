import { Component, OnInit } from '@angular/core';
import { IUser } from '../shared/users';
import { UserService } from '../shared/users.service';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss']
})
export class UserSectionComponent implements OnInit {

  constructor(private userService: UserService) { }

  isEnd: boolean = false;
  imageUrl: string = './assets/img.png'

  users: IUser[] = [];

  ngOnInit(): void {
    this.userService.getData(this.userService.page, this.userService.count).subscribe(data => {
      this.users = data.users
    })
  }

  getMoreUsers() {
    console.log(this.users);
    this.userService.getMorePages().subscribe(data => {
      data.users.forEach(e => {
        this.users.push(e)
      })
      if(this.users.length === 80) this.isEnd = true;
    },
    error => {
      console.log(error.error.message)
    })
  }

}
