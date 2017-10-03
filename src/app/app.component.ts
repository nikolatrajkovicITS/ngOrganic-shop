import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { 
    authService.user$.subscribe(user => {               // Every time when user logs in/out this observable authService.user$ it's going emit any value
      if (user) {                                      // If they logout we dont have the user object , that's why we have this "IF" statemant here
        userService.save(user);              // Every time when user logs in we try to save them in db 

        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  }
}
