import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {delay} from "rxjs/operators";

interface IProps  {
  username: string;
  password: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuth = false;

  login({username, password}: IProps) {
    console.log({username, password});

    if(username === 'admin' && password === '123456') {
      this.isAuth = true;
    }

    return of(this.isAuth).pipe();
  }

  logout() {
    this.isAuth = false;
    return of(this.isAuth).pipe(delay(1000));
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.isAuth).pipe(delay(1000));
  }
}
