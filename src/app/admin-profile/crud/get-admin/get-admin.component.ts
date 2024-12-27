import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminProfileService } from '../../admin-profile.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { IMGPATH } from 'src';

@Component({
  selector: 'app-get-admin',
  templateUrl: './get-admin.component.html',
  styleUrls: ['./get-admin.component.css'],
})
export class GetAdminComponent {
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminProfileService // Service to fetch admin profile data
  ) {}
  IMGPATH = IMGPATH;
  adminQuery = injectQuery(() => ({
    queryKey: [
      QUERYKEYS.Admin,
      +(this.route.snapshot.paramMap.get('id') ?? -1),
    ],
    queryFn: async () => {
      const admin = await this.adminService.getUserbyId(
        this.route.snapshot.paramMap.get('id') ?? '-1'
      );
      return admin;
    },
  }));

  get adminData() {
    return this.adminQuery.data()!;
  }
}
