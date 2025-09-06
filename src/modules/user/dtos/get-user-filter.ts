import { Provider } from 'src/@types';

export class GetUserFilter {
  id?: string;
  email?: string;
  providerId?: string;
  provider?: Provider;
  username?: string;
}
