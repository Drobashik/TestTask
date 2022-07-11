import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingHandler } from '../shared/loading-handler';
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
  isLoading: boolean = false;
  loadingHandler = new LoadingHandler();


  imageUrl: string = './assets/img.png'

  users: IUser[] = [];

  ngOnInit(): void {
    this.loadingHandler.beginLoading()
    this.userService.getData(this.userService.page, this.userService.count).subscribe(data => {
      this.users = data.users
      this.loadingHandler.endLoading()
    })
  }

  getMoreUsers() {
    this.loadingHandler.beginLoading()
    this.userService.getMorePages().subscribe(data => {
      console.log(data);
      this.loadingHandler.endLoading()
      data.users.forEach(e => {
        this.users.push(e);
      })
    },
    error => {
      this.isEnd = true;
      this.loadingHandler.endLoading()
      console.log(error)
    })
  }

}
