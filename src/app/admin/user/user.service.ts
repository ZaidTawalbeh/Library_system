import { Injectable } from '@angular/core';
import { APIURL } from 'src';
import { User } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async getAllUsers(): Promise<User[]> {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const res = await fetch(APIURL + 'User/all-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token here
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log('an error occured while fetching the users');
      throw error;
    }
  }
}
