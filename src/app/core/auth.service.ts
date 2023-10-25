
import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';


export class AuthService {


  constructor(private user: User) { }

  getLoggin(){
    return this.user.email === null ? false : true;
  }

}
