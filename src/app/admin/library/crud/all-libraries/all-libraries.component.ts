import { Component, inject } from '@angular/core';
import { LibraryService } from '../../library.service';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { IMGPATH } from 'src';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-libraries',
  templateUrl: './all-libraries.component.html',
  styleUrls: ['./all-libraries.component.css'],
})
export class AllLibrariesComponent {
  constructor(private toastr: ToastrService) {}
  libraryService = inject(LibraryService);
  queryClient = injectQueryClient();
  searchTerm: string = '';
  IMGPATH = IMGPATH;
  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.libraries],
    queryFn: async () => {
      const data = await this.libraryService.getAllLibraries();
      return data;
    },
  }));

  deleteMutation = injectMutation((client) => ({
    mutationFn: async (id: number) =>
      await this.libraryService.deleteLibrary(id), // Update the author by ID
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.libraries] });
      this.toastr.success('Library Deleted successfully');
    },
  }));

  async onDeleteLibrary(id: number) {
    await this.deleteMutation.mutateAsync(id);
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

  get LibrariesData() {
    // Filter the libraries based on the searchTerm
    return this.query
      .data()
      ?.filter((library: any) =>
        library.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }
}
