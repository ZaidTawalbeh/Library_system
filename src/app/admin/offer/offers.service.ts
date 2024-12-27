import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { APIURL } from 'src';
import { Offer } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private http = inject(HttpClient);

  // Create a new offer
  async createOffer(createOffer: Offer) {
    try {
      const res = await lastValueFrom(
        this.http.post(`${APIURL}Offers/AddOffers`, createOffer)
      );
      return res;
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  }

  // Get all offers
  async getAllOffers(): Promise<Offer[]> {
    try {
      const response = await lastValueFrom(
        this.http.get<Offer[]>(`${APIURL}Offers/GetAllOffers`)
      );
      return response;
    } catch (error) {
      console.error('Error fetching all offers:', error);
      throw error;
    }
  }

  // Delete an offer by ID
  async deleteOffer(id: number) {
    try {
      await lastValueFrom(
        this.http.delete(`${APIURL}Offers/RemoveOffers/${id}`)
      );
    } catch (error) {
      console.error('Error deleting offer:', error);
      throw error;
    }
  }
}
