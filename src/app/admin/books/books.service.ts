import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { APIURL } from 'src';
import { CreateBookResponse, CreateBookType, EditBookType } from './types';
import { Book } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  // Post Functions

  async createBook(createBook: CreateBookType): Promise<CreateBookResponse> {
    try {
      console.log(createBook);

      // Create the book
      const res = await lastValueFrom(
        this.http.post<CreateBookResponse>(
          `${APIURL}Book/add-book`,
          { ...createBook, image: '' },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
      );

      // Handle image upload if necessary
      const form = new FormData();
      form.append('imageFile', createBook.image);

      const imageRes = await lastValueFrom(
        this.http.put(`${APIURL}Book/upload-image/${res.id}`, form)
      );

      return res; // Ensure that you return the response with the id
    } catch (error) {
      console.error('Error creating book:', error);
      throw error; // Handle or rethrow the error
    }
  }

  // Get Functions
  async getAllBooks(): Promise<Book[]> {
    try {
      const data = await lastValueFrom(
        this.http.get<Book[]>(`${APIURL}Book/allInfo`)
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching AllBooks:', error);
      throw error;
    }
  }

  async getBookById(id: number): Promise<Book | null> {
    try {
      if (!id) return null;
      console.log(id);
      const data = await lastValueFrom(
        this.http.get<Book>(`${APIURL}Book/BookById/${id}`)
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching Book:', error);
      throw error;
    }
  }

  async getBookByName(name: string): Promise<Book> {
    try {
      const data = await lastValueFrom(
        this.http.get<Book>(`${APIURL}Book/SearchByBookName/${name}`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching Book:', error);
      throw error;
    }
  }

  async getBooksByCategory(id: number): Promise<Book[]> {
    try {
      const data = await lastValueFrom(
        this.http.get<Book[]>(`${APIURL}Book/FilterByCategory/${id}`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching Books by Category:', error);
      throw error;
    }
  }

  async getBooksByPage(pageNum: number): Promise<Book[]> {
    try {
      const data = await lastValueFrom(
        this.http.get<Book[]>(`${APIURL}Book/NumOfPages/${pageNum}`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching Books by Page:', error);
      throw error;
    }
  }

  async getBooksByLanguage(lang: string): Promise<Book[]> {
    try {
      const data = await lastValueFrom(
        this.http.get<Book[]>(`${APIURL}Book/Language/${lang}`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching Books by Language:', error);
      throw error;
    }
  }

  async getBooksByLibrary(id: string): Promise<Book[]> {
    try {
      const data = await lastValueFrom(
        this.http.get<Book[]>(`${APIURL}Book/Library/${id}`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching Books by Library:', error);
      throw error;
    }
  }

  // Delete Functions
  async deleteBook(id: number) {
    try {
      console.log(id);
      const data = await firstValueFrom(
        this.http.delete<Book[]>(`${APIURL}Book/DeleteBook/${id}`)
      );

      console.log(data);
    } catch (error) {
      console.error('Error deleting Book:', error);
      throw error;
    }
  }

  async editBook(id: number, editBook: EditBookType) {
    try {
      const response = await firstValueFrom(
        this.http.put<CreateBookResponse>(`${APIURL}Book/update-book`, {
          ...editBook,
          bookId: id,
        })
      );

      console.log(response);
      if (editBook.imageFile) {
        const form = new FormData();
        console.log('updating Image');
        form.append('imageFile', editBook.imageFile);
        console.log(id);
        console.log(editBook.image);
        const imageRes = await lastValueFrom(
          this.http.put(`${APIURL}Book/upload-image/${id}`, form)
        );
        console.log(imageRes);
      }
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }
}
