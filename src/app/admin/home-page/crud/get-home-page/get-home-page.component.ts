import { Component, inject } from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { HomePageService } from '../../home-page.service';
import { IMGPATH } from 'src';

@Component({
  selector: 'app-get-home-page',
  templateUrl: './get-home-page.component.html',
  styleUrls: ['./get-home-page.component.css'],
})
export class GetHomePageComponent {
  homePageService = inject(HomePageService);
  queryClient = injectQueryClient();
  IMGPATH = IMGPATH;

  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.homepage],
    queryFn: () => this.homePageService.getHomePage(),
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

  get homePageData() {
    return this.query.data();
  }
}
