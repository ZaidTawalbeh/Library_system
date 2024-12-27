import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src';
import { Testimonial } from 'src/types';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  constructor(private http: HttpClient) {}

  async getAcceptedTestimonials(): Promise<Testimonial[]> {
    try {
      return await firstValueFrom(
        this.http.get<Testimonial[]>(
          `${APIURL}Testimonial/AcceptedTestimonials`
        )
      );
    } catch (error) {
      console.log('An error occurred while getting accepted testimonials');
      throw error;
    }
  }

  async getPendingTestimonials(): Promise<Testimonial[]> {
    try {
      return await firstValueFrom(
        this.http.get<Testimonial[]>(`${APIURL}Testimonial/PendingTestimonials`)
      );
    } catch (error) {
      console.log('An error occurred while getting pending testimonials');
      throw error;
    }
  }

  async acceptTestimonial(id: number): Promise<void> {
    try {
      await firstValueFrom(
        this.http.put<void>(
          `${APIURL}Testimonial/UpdateStatusToAccept/${id}`,
          {}
        )
      );
      console.log('Testimonial accepted');
    } catch (error) {
      console.log('An error occurred while updating testimonial status');
      throw error;
    }
  }

  async deleteTestimonial(id: number): Promise<void> {
    try {
      await firstValueFrom(
        this.http.delete<void>(`${APIURL}Testimonial/DeleteTestimonial/${id}`)
      );
    } catch (error) {
      console.log('An error occurred while deleting testimonial');
      throw error;
    }
  }
}
