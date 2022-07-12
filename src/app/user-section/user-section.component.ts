import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoadingHandler } from '../shared/loading-handler';
import { IUser } from '../shared/users';
import { UserService } from '../shared/users.service';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss']
})
export class UserSectionComponent implements OnInit,OnChanges {

  constructor(private userService: UserService) { }

  isEnd: boolean = false;
  loadingHandler = new LoadingHandler();


  imageUrl: string = './assets/img.png'

  @Input() userId: number
  users: IUser[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.userId) return
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.users.splice(5, Infinity)
        this.users.unshift(user)
      },
    })
  }

  ngOnInit(): void {
    this.loadingHandler.beginLoading()
    this.userService.getUsersData(this.userService.page, this.userService.count).subscribe(data => {
      this.users = data.users
      this.loadingHandler.endLoading()
    })
  }

  getMoreUsers() {
    this.loadingHandler.beginLoading()
    this.userService.getMorePages().subscribe({
      next: (data) => {
        this.loadingHandler.endLoading()
        data.users.forEach(e => {
          this.users.push(e);
        })
      },
      error: () => {
        this.isEnd = true;
        this.loadingHandler.endLoading()
      }
    })
  }

}
