import { Component, inject } from '@angular/core';
import { AboutusService } from '../../aboutus.service';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { EditAboutUsType } from '../../types';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-about-us',
  templateUrl: './edit-about-us.component.html',
  styleUrls: ['./edit-about-us.component.css'],
})
export class EditAboutUsComponent {
  aboutusService = inject(AboutusService);
  queryClient = injectQueryClient();
  router: Router;
  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.aboutus],
    queryFn: () => this.aboutusService.getAboutUs(),
  }));
  constructor(router: Router, private toastr: ToastrService) {
    this.router = router;
  }

  mutation = injectMutation((client) => ({
    mutationFn: async (aboutUs: EditAboutUsType) =>
      await this.aboutusService.editAboutUs(aboutUs),
    onSuccess: () => {
      // Invalidate and refetch todos after a successful mutation
      client.invalidateQueries({ queryKey: [QUERYKEYS.aboutus] });
      this.toastr.success('About us Edited');
      this.router.navigate(['/admin/aboutus']);
    },
  }));

  onEditAboutUs(aboutUs: EditAboutUsType) {
    this.mutation.mutate(aboutUs);
  }

  get isLoading() {
    return this.query.isLoading();
  }

  get isError() {
    return this.query.isError();
  }

  get errorMessage() {
    console.log(this.query.error());
    return this.query.error || 'An error occurred while fetching data.';
  }

  get aboutUsData() {
    return this.query.data();
  }
}
