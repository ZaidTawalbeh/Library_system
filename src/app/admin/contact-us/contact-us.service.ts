import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { APIURL } from 'src';
import { ContactUs } from 'src/types';
import { EditContactUsType } from './types';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private http = inject(HttpClient);

  async getContactUs(): Promise<ContactUs> {
    try {
      const data = await firstValueFrom(
        this.http.get<ContactUs>(`${APIURL}ContactUs`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching ContactUs:', error);
      throw error;
    }
  }

  async editContactUs(
    editContactUs: EditContactUsType,
    imageFile: File | null
  ) {
    try {
      // Update the ContactUs details
      await firstValueFrom(
        this.http.put(`${APIURL}ContactUs/update-contactus`, editContactUs)
      );

      // Upload image if provided
      if (imageFile) {
        const formData = new FormData();
        formData.append('imageFile', imageFile);
        await firstValueFrom(
          this.http.put(
            `${APIURL}ContactUs/upload-image/${editContactUs.contactusid}`,
            formData
          )
        );
      }
    } catch (error) {
      console.error('Error updating Contact Us entry:', error);
      throw error;
    }
  }
}
