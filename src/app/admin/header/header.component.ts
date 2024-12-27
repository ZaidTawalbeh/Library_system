import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { IMGPATH } from 'src';
import { QUERYKEYS } from 'src/app/queries';
import { AdminhomeService } from '../adminHome/adminhome.service';
import { AdminProfileService } from 'src/app/admin-profile/admin-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminProfileService
  ) {}
  IMGPATH = IMGPATH;
  id = localStorage.getItem('userid')
  // Query to fetch the admin data by ID
  adminQuery = injectQuery(() => {
    const id = localStorage.getItem('userid');
    console.log(id);
    return {
      queryKey: [QUERYKEYS.Admin, id],
      queryFn: async () => {
        const admin = await this.adminService.getUserbyId(id!);
        return admin;
      },
    };
  });

  get adminData() {
    return this.adminQuery.data()!;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}