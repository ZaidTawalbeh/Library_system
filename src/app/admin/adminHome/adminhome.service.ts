import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { APIURL } from 'src';
import { PaidFee } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class AdminhomeService {
  private http = inject(HttpClient);
  constructor() {}

  async getTotalFees(): Promise<PaidFee[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<PaidFee[]>(`${APIURL}PaidFees/GetAllFees`)
      );
      return data.map((fee) => {
        const dateString = fee.returningdate;
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hours = hours % 12 || 12; // Convert '0' hour to '12' for AM

        const time = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
        return {
          feeamount: fee.feeamount,
          returningdate: time, // formatted as "hh:mm AM/PM"
        };
      }) as unknown as PaidFee[];
    } catch (error) {
      console.error('Error fetching  Paid fees:', error);
      throw error; // Rethrow or handle the error appropriately
    }
  }

  async getLibrariesSales(): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get(`${APIURL}BorrowedBook/LibrarySales`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching LibrariesSales', error);
      throw error;
    }
  }

  async getTotalIncome(): Promise<number> {
    try {
      const data = await firstValueFrom(
        this.http.get<number>(`${APIURL}BorrowedBook/TotalIncome`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching  Paid fees:', error);
      throw error; // Rethrow or handle the error appropriately
    }
  }

  async getCountOfBorrowing(): Promise<number> {
    try {
      const data = await firstValueFrom(
        this.http.get<number>(`${APIURL}BorrowedBook/count`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching  Count of Borrowing Book:', error);
      throw error; // Rethrow or handle the error appropriately
    }
  }
  async getCountOfRegisterUser(): Promise<number> {
    try {
      const data = await firstValueFrom(
        this.http.get<number>(`${APIURL}User/countOfUser`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching  Count of Register User:', error);
      throw error; // Rethrow or handle the error appropriately
    }
  }
  async getCountOfLibrary(): Promise<number> {
    try {
      const data = await firstValueFrom(
        this.http.get<number>(`${APIURL}Library/count`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching  Count of Library :', error);
      throw error; // Rethrow or handle the error appropriately
    }
  }

  calculateMonthlyIncome(paidFees: PaidFee[]): Record<string, number> {
    return paidFees.reduce((monthlyIncome, fee) => {
      const date = new Date(fee.createdat);
      // Extract the year and month from the createdat date
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}`;

      // Initialize the month's income if not already set
      if (!monthlyIncome[yearMonth]) {
        monthlyIncome[yearMonth] = 0;
      }

      // Add the feeamount to the respective month, if feeamount is valid
      monthlyIncome[yearMonth] += fee.feeamount ?? 0;

      return monthlyIncome;
    }, {} as Record<string, number>);
  }

  async getMonthlyChart(month:number,year:number): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get(`${APIURL}BorrowedBook/monthly-chart?month=${month}&year=${year}`)
      );
      console.log(data);
      return data;
     
    } catch (error) {
      console.error('Error fetching AllBorrowed', error);
      throw error;
    }
  }
}
