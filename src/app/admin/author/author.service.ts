import { Injectable, inject } from '@angular/core';
import { CreateAuthorType, EditAuthorType } from './types';
import { APIURL } from 'src';
import { Author } from 'src/types';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private http = inject(HttpClient);

  // Create a new author
  async createAuthor(createAuthor: CreateAuthorType) {
    try {
      const { id } = await lastValueFrom(
        this.http.post<{ id: number }>(`${APIURL}Author/add-author`, {
          ...createAuthor,
          image: null, // Adjust this if needed to include an actual image file
        })
      );

      const formData = new FormData();
      formData.append('imageFile', createAuthor.image);

      const imgRes = await lastValueFrom(
        this.http.put(`${APIURL}Author/upload-image/${id}`, formData)
      );

      return imgRes;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  }

  // Get all authors
  async getAllAuthors(): Promise<Author[]> {
    try {
      const response = await lastValueFrom(
        this.http.get<Author[]>(`${APIURL}Author/authors`)
      );
      return response;
    } catch (error) {
      console.error('Error fetching all authors:', error);
      throw error;
    }
  }

  // Get an author by ID
  async getAuthorById(id: number): Promise<Author | null> {
    try {
      const response = await lastValueFrom(
        this.http.get<Author>(`${APIURL}Author/${id}`)
      );
      return response;
    } catch (error) {
      console.error('Error fetching author by ID:', error);
      throw error;
    }
  }

  // Edit an existing author
  async editAuthor(editAuthor: EditAuthorType) {
    try {
      console.log(editAuthor);

      const token = localStorage.getItem('token');

      const response = await fetch(`${APIURL}Author/update-author`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...editAuthor, image: null }),
      });

      if (editAuthor.image) {
        const formData = new FormData();
        console.log(token);
        formData.append('imageFile', editAuthor.image);
        await fetch(`${APIURL}Author/upload-image/${editAuthor.authorid}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      return response;
    } catch (error) {
      console.error('Error updating author:', error);
      throw error;
    }
  }

  // Delete an author by ID
  async deleteAuthor(id: number) {
    try {
      const response = await firstValueFrom(
        this.http.delete(`${APIURL}Author/${id}`)
      );

      return response;
    } catch (error) {
      console.error('Error deleting author:', error);
      throw error;
    }
  }
}
