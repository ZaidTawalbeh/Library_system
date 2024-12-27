import { Component, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { LibraryService } from './library.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent {
  libraryService = inject(LibraryService);
  queryClient = injectQueryClient();
  searchQuery: string = '';
  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.libraries],
    queryFn: async () => {
      const data = await this.libraryService.getAllLibraries();
      if (this.searchQuery !== '')
        return data.filter((lib) =>
          lib.name
            ?.toLocaleLowerCase()
            ?.includes(this.searchQuery.toLowerCase())
        );
      else return data;
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

  get LibrariesData() {
    return this.query.data();
  }
}
