import { Component, inject } from '@angular/core';
import { HomePageService } from '../../home-page.service';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { EditHomePageType } from '../../types';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-home-page',
  templateUrl: './edit-home-page.component.html',
  styleUrls: ['./edit-home-page.component.css'],
})
export class EditHomePageComponent {
  homePageService = inject(HomePageService);
  queryClient = injectQueryClient();
  selectedFileLogo: File | null = null;
  selectedFileMain: File | null = null;
  router: Router;
  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.homepage],
    queryFn: () => this.homePageService.getHomePage(),
  }));
  constructor(router: Router, private toastr: ToastrService) {
    this.router = router;
  }

  mutation = injectMutation((client) => ({
    mutationFn: (homePage: EditHomePageType) =>
      this.homePageService.editHomePage(
        homePage,
        this.selectedFileLogo,
        this.selectedFileMain
      ),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.homepage] });
      this.toastr.success('Home page information updated');
      this.router.navigate(['/admin/homepage']);
    },
  }));

  onEditHomePage(homePage: EditHomePageType) {
    this.mutation.mutate({
      id: homePage.id,
      p_COPYRIGTH: homePage.p_COPYRIGTH,
      p_FOOTER: homePage.p_FOOTER,
      p_WELCOME: homePage.p_WELCOME,
    });
  }

  onFileSelected(event: Event, type: 'logo' | 'main') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (type === 'logo') {
        this.selectedFileLogo = input.files[0];
      } else {
        this.selectedFileMain = input.files[0];
      }
    }
  }

  get isLoading() {
    return this.query.isLoading();
  }

  get isError() {
    return this.query.isError();
  }

  get errorMessage() {
    return this.query.error || 'An error occurred while fetching data.';
  }

  get homePageData() {
    return this.query.data()!;
  }
}
