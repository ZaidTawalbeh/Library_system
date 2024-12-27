import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { APIURL } from 'src';
import { AboutUsType, EditAboutUsType } from './types';

@Injectable({
  providedIn: 'root',
})
export class AboutusService {
  private http = inject(HttpClient);

  // Fetch the About Us information
  async getAboutUs(): Promise<AboutUsType> {
    try {
      const data = await firstValueFrom(
        this.http.get<AboutUsType>(`${APIURL}AboutUs`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching About Us:', error);
      throw error; // Rethrow or handle the error appropriately
    }
  }

  // Edit the About Us information

  async editAboutUs(editAboutUs: EditAboutUsType): Promise<EditAboutUsType> {
    try {
      // Create a FormData object
      console.log(editAboutUs);

      // Make the first PUT request and log the response
      const res = await firstValueFrom(
        this.http.put<EditAboutUsType>(
          `${APIURL}AboutUs/update-aboutus`,
          editAboutUs
        )
      );
      console.log('Response from update-aboutus:', res); // Log the response

      if (editAboutUs.aboutUsImageFile) {
        const imageFormData = new FormData();
        imageFormData.append('imageFile', editAboutUs.aboutUsImageFile);

        const imageRes = await firstValueFrom(
          this.http.put<EditAboutUsType>(
            `${APIURL}AboutUs/upload-image/${editAboutUs.aboutusid}`,
            imageFormData
          )
        );
        console.log('Response from upload-image:', imageRes); // Log the response
      }

      return res; // Return the initial response
    } catch (error) {
      console.error('Error updating About Us entry:', error);
      throw error; // Rethrow or handle the error appropriately
    }
  }
}
