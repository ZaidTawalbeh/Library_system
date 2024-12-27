import { Component, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { AuthorService } from '../../author.service';
import { IMGPATH } from 'src';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-all-authors',
  templateUrl: './all-authors.component.html',
  styleUrls: ['./all-authors.component.css'],
})
export class AllAuthorsComponent {
  authorsService = inject(AuthorService);
  searchTerm = '';
  categoryFilter: string | null = null;
  LibraryFilter: string | null = null;
  IMGPATH = IMGPATH;
  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.allauthors],
    queryFn: () => this.authorsService.getAllAuthors(),
  }));

  constructor(private toastr: ToastrService) {}

  mutation = injectMutation((client) => ({
    mutationFn: (id: number) => this.authorsService.deleteAuthor(id), // Update the author by ID
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.allauthors] });
      this.toastr.success('Author Deleted successfully');
    },
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

  get AuthorsData() {
    return this.query
      .data()
      ?.filter((author) =>
        author.authorname
          ?.toLocaleLowerCase()
          .includes(this.searchTerm.toLocaleLowerCase())
      );
  }

  async onDeleteAuthor(id: number) {
    await this.mutation.mutateAsync(id);
  }
}
