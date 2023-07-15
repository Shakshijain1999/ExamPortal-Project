import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }


// generating token
public generateToken(loginData:any){
  return this.http.post(`${baseUrl}/generate-token`,loginData);
}

// function for login user: set token in LocalStorage
public loginUser(token:any){
  localStorage.setItem('token',token);
  return true;
}

// islogin: user is logged in or not
public isLoggedIn(){
  let tokenStr=localStorage.getItem('token')
  if(tokenStr==undefined || tokenStr=='' || tokenStr==null )
  {
    return false;
  }else{
    return true;
  }
}

// function for logout:remove token from local Stoarge
public logout()
{
  localStorage.removeItem('token');
  localStorage.removeItem("user");
  return true;
}

// get token from local Storage
public getToken(){
  return localStorage.getItem('token');
}

// set userdetail
public setUser(user:any){
 localStorage.setItem('user',JSON.stringify(user));    //stringify:Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
}

// get user
public getUser()
{
  let userStr=localStorage.getItem("user");
  if(userStr != null)
  {
    return JSON.parse(userStr);
  }else{
    this.logout();
    return null;
  }
}

//  get user role
public getUserRole()
{
  let user= this.getUser()
  return user.authorities[0].authority;
}

}
