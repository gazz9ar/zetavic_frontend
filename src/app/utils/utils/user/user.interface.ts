export interface User {
  id: number;
  email: string,
  password?: string,
  firstName: string;
  lastName: string;
  address?: Address
};

export interface Address {
  zipcode: string;
  street: string;
  city: string;
  houseNumber: string;
  houseNumberAddition: string;
};

export interface GooglePayload {
  token: string;
}

interface GoogleUser {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}