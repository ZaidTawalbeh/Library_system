import { Component, inject } from '@angular/core';
import { AboutusService } from '../../aboutus.service';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { IMGPATH } from 'src';

@Component({
  selector: 'app-get-about-us',
  templateUrl: './get-about-us.component.html',
  styleUrls: ['./get-about-us.component.css'],
})
export class GetAboutUsComponent {
  aboutusService = inject(AboutusService);
  queryClient = injectQueryClient();

  IMGPATH = IMGPATH;

  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.aboutus],
    queryFn: () => this.aboutusService.getAboutUs(),
  }));

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
