import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIURL } from 'src';
import { Category, LibraryCategory } from 'src/types';
import { CreateCategoryType, EditCategoryType } from './types';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  async createCategory(createCategoryData: CreateCategoryType): Promise<any> {
    console.log('Creating category:', JSON.stringify(createCategoryData));
    try {
      const data = (await firstValueFrom(
        this.http.post(
          `${APIURL}Category/add-category`,
          { categoryname: createCategoryData.categoryname },
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          }
        )
      )) as { id: number };

      console.log('Category created successfully:', data);

      const formData = new FormData();
      formData.append('imageFile', createCategoryData.imageFile);

      const imgRes = await firstValueFrom(
        this.http.put(`${APIURL}Category/upload-image/${data.id}`, formData)
      );
      console.log(imgRes);

      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error; // or return an error response
    }
  }

  async getAllCategories(): Promise<Category[]> {
    return await firstValueFrom(
      this.http.get<Category[]>(`${APIURL}Category/categories`)
    );
  }

  async getAllLibrariesCategories(): Promise<LibraryCategory[]> {
    const data = await firstValueFrom(
      this.http.get<LibraryCategory[]>(`${APIURL}LibraryCategory/AllLibCat`)
    );
    console.log(data);
    return data;
  }

  async getCategoryById(id: number): Promise<Category> {
    return await firstValueFrom(
      this.http.get<Category>(`${APIURL}Category/${id}`)
    );
  }

  async deleteCategory(id: number) {
    this.http.delete<void>(`${APIURL}Category/${id}`).toPromise();
  }

  async editCategory(editCategory: EditCategoryType): Promise<any> {
    try {
      console.log('Editing category:', editCategory);
      if (editCategory.image) {
        const formData = new FormData();
        console.log(editCategory.image);
        formData.append('imageFile', editCategory.image!);
        const imgRes = await firstValueFrom(
          this.http.put(
            `${APIURL}Category/upload-image/${editCategory.categoryid}`,
            formData
          )
        );
        console.log(imgRes);
      }
      const res = await firstValueFrom(
        this.http.put<string>(`${APIURL}Category/update-category`, editCategory)
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}
