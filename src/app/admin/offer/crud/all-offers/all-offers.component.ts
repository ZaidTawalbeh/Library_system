import { Component, inject } from '@angular/core';
import { OffersService } from '../../offers.service'; // Adjust the import path
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { LibraryService } from 'src/app/admin/library/library.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css'],
})
export class AllOffersComponent {
  constructor(private toastr: ToastrService) {}
  offersService = inject(OffersService);
  librariesService = inject(LibraryService);
  searchTerm = '';

  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.alloffers],
    queryFn: () => this.offersService.getAllOffers(),
  }));

  libraryQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.libraries],
    queryFn: async () => await this.librariesService.getAllLibraries(),
  }));

  mutation = injectMutation((client) => ({
    mutationFn: (id: number) => this.offersService.deleteOffer(id), // Update for deleting offer
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.alloffers] });
      this.toastr.success('Offer Deleted successfully');
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

  get offersData() {
    return this.query.data()
      ?.filter((offer) => this.searchTerm!==""? offer.offerpercentage===+this.searchTerm:true )

  }

  // Method to get the library name by ID
  getLibraryName(libraryId: number): string {
    const library = this.libraryQuery
      .data()
      ?.find((l) => l.libraryid === libraryId);
    return library?.name ?? 'Unknown Library'; // Adjust according to your data structure
  }

  async onDeleteOffer(id: number) {
    await this.mutation.mutateAsync(id);
  }
}
