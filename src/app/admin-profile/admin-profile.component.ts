import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { AdminProfileService } from './admin-profile.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { QUERYKEYS } from '../queries';
import { User } from 'src/types';
import { IMGPATH } from 'src';
interface EditUserType extends Omit<User, 'userid'> {
  img?: File;
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  adminForm: FormGroup;
  image: File | null = null;
  id: number = -1;
  router: Router;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    router: Router,
    private toastr: ToastrService
  ) {
    this.adminForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.router = router;
  }

  adminService = inject(AdminProfileService);
  queryClient = injectQueryClient();
  IMGPATH = IMGPATH;
  // Query to fetch the admin data by ID
  adminQuery = injectQuery(() => ({
    queryKey: [
      QUERYKEYS.Admin,
      +(this.route.snapshot.paramMap.get('id') ?? -1),
    ],
    queryFn: async () => {
      const admin = await this.adminService.getUserbyId(
        this.route.snapshot.paramMap.get('id') ?? '-1'
      );
      if (admin) this.adminForm.patchValue(admin);
      console.log(admin);
      return admin;
    },
  }));

  mutation = injectMutation((client) => ({
    mutationFn: (updatedAdmin: EditUserType) =>
      this.adminService.updateUser({
        ...updatedAdmin,
        img: this.image ?? undefined,
        userid: +(this.route.snapshot.paramMap.get('id') ?? -1),
      }),
    onSuccess: () => {
      client.refetchQueries({ queryKey: [QUERYKEYS.Admin] });
      this.toastr.success('Admin edited successfully');
      setTimeout(() => {
        this.router.navigate(['/admin/profile']);
      }, 200); // Delaying the navigation slightly to ensure mutation is fully complete
    },
  }));

  ngOnInit() {
    this.id = +(this.route.snapshot.paramMap.get('id') ?? -1);
    if (!this.route.snapshot.paramMap.get('id')) {
      this.toastr.error('No ID provided');
      return;
    }
    this.fillData();
  }

  fillData() {
    const data = this.adminQuery.data()!;
    if (data) {
      this.adminForm.patchValue(data);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
    }
  }

  onEditAdmin() {
    if (this.adminForm.valid) {
      this.mutation.mutate(this.adminForm.value);
    } else {
      console.log(this.route.snapshot.paramMap.get('id'));
      console.log('Form is invalid');
      this.toastr.error('Invalid Form');
    }
  }
}
