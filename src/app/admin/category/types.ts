export type CreateCategoryType = {
  categoryname: string;
  imageFile: File;
};

export type EditCategoryType = Partial<CreateCategoryType> & {
  categoryid: number;
  categoryname?: string;
  image?: File;
};
