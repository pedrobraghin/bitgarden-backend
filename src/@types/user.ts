export class User {
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
}

export class ProviderProfile {
  id: string;
  displayName: string;
  emails: { value: string }[];
  photos?: { value: string }[];
  provider: string;
}

export class PublicUser {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
}
