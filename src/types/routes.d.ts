export interface AppRoute {
  path?: string;
  label: string;
  children?: AppRoute[];
}
