import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { APIURL } from 'src';
import { User } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class AdminProfileService {
  constructor(private http: HttpClient) {}

  async getUserbyId(id: string): Promise<User> {
    return await firstValueFrom(this.http.get<User>(`${APIURL}User/${id}`));
  }

  async updateUser(body: Partial<User> & { img?: File | null }): Promise<void> {
    const formData = new FormData();
    for (const key in body) {
      if (body[key as keyof typeof body] != null) {
        console.log(key, body);
        formData.append(key, body[key as keyof typeof body] as string);
      }
    }

    const data = await firstValueFrom(
      this.http.put(`${APIURL}User/update`, { ...body, img: null })
    );

    if (body.img) await this.uploadImage(body.userid!, body.img);
  }

  async uploadImage(userId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('profileImage', file);
    const res = await firstValueFrom(
      this.http.put(`${APIURL}User/upload-image/${userId}`, formData)
    );
    console.log(res);
  }
}
