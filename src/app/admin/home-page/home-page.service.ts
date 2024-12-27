import { Injectable } from '@angular/core';
import { HomePage } from 'src/types';
import { APIURL } from 'src';
import { EditHomePageType } from './types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private readonly http: HttpClient) {}

  async getHomePage(): Promise<HomePage> {
    try {
      const response = await firstValueFrom(
        this.http.get<HomePage[]>(`${APIURL}HomePage/GetAllHome`)
      );
      const [data] = response;
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching home page:', error);
      throw error;
    }
  }

  async editHomePage(
    editHomePage: EditHomePageType,
    logoImageFile: File | null,
    mainImageFile: File | null
  ) {
    try {
      console.log(editHomePage);
      // Update the HomePage details
      await firstValueFrom(
        this.http.put(`${APIURL}HomePage/update`, editHomePage)
      );

      // Upload logo image if provided
      if (logoImageFile) {
        const formDataLogo = new FormData();
        formDataLogo.append('imageFile', logoImageFile!);
        await firstValueFrom(
          this.http.put(
            `${APIURL}HomePage/upload-logo/${editHomePage.id}`,
            formDataLogo
          )
        );
      }

      // Upload main image if provided
      if (mainImageFile) {
        const formDataMain = new FormData();
        formDataMain.append('imageFile', mainImageFile!);
        await firstValueFrom(
          this.http.put(
            `${APIURL}HomePage/upload-main/${editHomePage.id}`,
            formDataMain
          )
        );
      }
    } catch (error) {
      console.error('Error updating HomePage entry:', error);
      throw error;
    }
  }
}
