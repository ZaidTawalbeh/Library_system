import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { APIURL } from 'src';
import { BorrowedBook } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class BorrowedBooksService {
  private http = inject(HttpClient);

  async getAllBorrowedBooks(): Promise<BorrowedBook[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<BorrowedBook[]>(`${APIURL}BorrowedBook/GetAllBorrowed`)
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching AllBorrowedBooks:', error);
      throw error;
    }
  }
  async getBorrowedBooksByUserId(userId: number): Promise<BorrowedBook[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<BorrowedBook[]>(
          `${APIURL}BorrowedBook/HistoryOfBorrowing/${userId}`
        )
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching AllBorrowedBooks:', error);
      throw error;
    }
  }

  async changeBorrowedBookStatus(book: BorrowedBook) {
    try {
      const data = await firstValueFrom(
        this.http.put(`${APIURL}BorrowedBook/change-status/${book.id}`, book)
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching AllBorrowedBooks:', error);
      throw error;
    }
  }
  async getReports(
    reportType?: string,
    reportYear?: string,
    reportMonth?: string
  ) {
    try {
      let url = `${APIURL}BorrowedBook/Report/`;
      const queryParams: string[] = [];

      if (reportType) queryParams.push(`report_type=${reportType}`);
      if (reportYear) queryParams.push(`report_year=${reportYear}`);
      if (reportMonth) queryParams.push(`report_month=${reportMonth}`);

      // Only add query parameters if there are any
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }

      const data = await lastValueFrom(this.http.get<BorrowedBook[]>(url));
      return data; // return data if you need to use it
    } catch (error) {
      // Handle the error here, e.g., log or display a message
      console.error(error);
      throw error;
    }
  }
}
