export enum UserType {
  client='client',
  provider='provider',
  market='market',
}

export interface UserTypeData {
  id: UserType;
  type: UserType;
}
