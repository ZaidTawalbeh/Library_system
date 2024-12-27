import { Component, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { BooksService } from '../../books.service';
import { IMGPATH } from 'src';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent {
  constructor(private toastr: ToastrService) {}

  booksService = inject(BooksService);
  searchTerm = '';
  categoryFilter: string | null = null;
  LibraryFilter: string | null = null;
  IMGPATH = IMGPATH;
  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.allBooks],
    queryFn: () => this.booksService.getAllBooks(),
  }));
  categoriesQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.allBooks],
    queryFn: () => this.booksService.getAllBooks(),
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

  deleteMutation = injectMutation((client) => ({
    mutationFn: async (id: number) => await this.booksService.deleteBook(id), // Update the author by ID
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.allBooks] });
      this.toastr.success('Book Deleted successfully');
    },
  }));

  async onDeleteBook(id: number) {
    await this.deleteMutation.mutateAsync(id);
  }

  get BooksData() {
    // console.log(
    //   this.query
    //     .data()
    //     ?.filter((book) =>
    //       book.bookname
    //         ?.toLocaleLowerCase()
    //         .includes(this.searchTerm.toLocaleLowerCase())
    //     )
    // );
    return this.query
      .data()
      ?.filter((book) =>
        book.bookname
          ?.toLocaleLowerCase()
          .includes(this.searchTerm.toLocaleLowerCase())
      );
  }
}
