import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { APIURL } from 'src';
import { FeedBack } from 'src/types';
import { ReplyToFeedBackType } from './types';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private readonly http: HttpClient) {}

  async getAllFeedback(): Promise<FeedBack[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<FeedBack[]>(`${APIURL}Feedback/all-feedbacks`)
      );
      console.log(
        data.filter((d) => d.status.toLocaleLowerCase() === 'pending')
      );
      return data;
    } catch (error) {
      console.log('An error occurred while fetching the feedbacks');
      throw error;
    }
  }

  async getAllFeedbackById(id: number): Promise<FeedBack> {
    try {
      const data = await firstValueFrom(
        this.http.get<FeedBack>(`${APIURL}Feedback/${id}`)
      );
      return data;
    } catch (error) {
      console.log('An error occurred while fetching the feedback by ID');
      throw error;
    }
  }

  async replyToFeedBack(replyToFeedBack: ReplyToFeedBackType) {
    try {
      // Adding the title and the email
      const replyToFeedBackEdited = {
        ...replyToFeedBack,
        emailReplyTitle: 'Ketabi Feedback Reply',
        email: 'saedghazal000@gmail.com',
      };
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      const data = await firstValueFrom(
        this.http.put(
          `${APIURL}Feedback/reply-on-feedback`,
          replyToFeedBackEdited,
          { headers }
        )
      );
      return data;
    } catch (error) {
      console.log('An error occurred while replying to feedback');
      throw error;
    }
  }
}
