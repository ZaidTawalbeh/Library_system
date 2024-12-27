export type CreateBookType = {
  bookname: string;
  languages: string;
  numberofpages: number;
  releasedate: Date;
  descriptions: string;
  image: string;
  quantity: number;
  priceperday: number;
  authorid: number;
  categoryid: number;
  // libraryid: number;
};

export type EditBookType = Partial<CreateBookType> & {
  bookid: number;
  imageFile?: File;
};
export type UpdateBookType = {};

export type CreateBookResponse = {
  id: number;
};
