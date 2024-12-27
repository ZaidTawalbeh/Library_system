import { Component, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { BooksService } from './books.service';
import { CreateBookType, EditBookType } from './types';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  aboutusService = inject(BooksService);
  queryClient = injectQueryClient();

  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.allBooks],
    queryFn: () => this.aboutusService.getAllBooks(),
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

  get BooksData() {
    return this.query.data();
  }
}
