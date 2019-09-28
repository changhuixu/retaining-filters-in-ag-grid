export interface User {
  id: { name: string; value: string };
  name: { title: string; first: string; last: string };
  dob: { date: Date; age: number };
  email: string;
  gender: string;
  location: {
    city: string;
    coordinates: { latitude: string; longitude: string };
    country: string;
    postcode: number;
    state: string;
    street: { number: number; name: string };
    timezone: { description: string; offset: string };
  };
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  nat: string;
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: {
    age: number;
    date: Date;
  };
}
