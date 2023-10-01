const API_URL: string = "https://dummyjson.com/users";

interface IData {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}

interface IUser {
  id: 30;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: { color: string; type: string };
  domain: string;
  ip: string;
  address: IAddress;
  macAddress: string;
  university: string;
  bank: IBank;
  company: ICompany;
  ein: string;
  ssn: string;
  userAgent: string;
}

interface IAddress {
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  postalCode: string;
  state: string;
}

interface IBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface ICompany {
  address: {
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
    postalCode: string;
    state: string;
  };
  department: string;
  name: string;
  title: string;
}

function isObject(obj: unknown): obj is {} {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj)
}

function isSuccess(response: unknown): response is IData {
  if (isObject(response)) {
    return "users" in response && "total" in response;
  } else {
    return false;
  }
}

function isUser(user: unknown): user is IUser {
  if (isObject(user)) {
    return 'id' in user && 'userAgent' in user;
  }
  return false;
}

async function getUsers(urlString: string): Promise<unknown> {
    const response = await fetch(urlString);
    const data: unknown = await response.json();
    return data;
}

function processUser(user: unknown): void {
  if (isUser(user)) {
    console.log(`Пользователь с идентификационным номером ${user.id} имеет такой логин ${user.username}`);
  }
}

async function main(): Promise<void> {
  try {
    const responseData: unknown = await getUsers(API_URL);
    if (isSuccess(responseData)) {
      responseData.users.map(user => processUser(user))
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

main();
