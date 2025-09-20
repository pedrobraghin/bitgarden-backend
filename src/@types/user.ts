export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  provider: string;
  providerId: string;
  avatarUrl?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ProviderProfile = {
  id: string;
  displayName: string;
  emails: { value: string }[];
  photos?: { value: string }[];
  provider: string;
};

export type PublicUser = {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  email: string;
  provider: string;
};
