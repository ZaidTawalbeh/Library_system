export type CreateLibraryType = {
  name: string; // Equivalent to string Name
  email: string; // Equivalent to string Email
  phonenumber: string; // Equivalent to string Phonenumber
  longitude: string; // Equivalent to string Longitude
  latitude: string; // Equivalent to string? Latitude
  image: File;
};

export type EditLibraryType = Partial<CreateLibraryType> & {
  libraryid: number;
};

export type EditLibraryCategory = {
  libraryid: number;
  categoryid: number;
};
