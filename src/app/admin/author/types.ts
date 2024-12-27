export type CreateAuthorType = {
  authorname: string;
  bio: string;
  image: File;
};

export type EditAuthorType = Partial<CreateAuthorType> & { authorid: number };
