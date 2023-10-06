const API_URL: string = "https://dummyjson.com/users/";

interface IData {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}

interface IUser {
  id: number;
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

// type-guard который в качестве аргумента может получить any или unknown, не понимаю чем хуже unknown
function isSuccess(response: any): response is IData {
  return "users" in response && "total" in response;
}

// type-guard который в качестве аргумента может получить any или unknown, не понимаю чем хуже unknown
function isUser(user: any): user is IUser {
  return "id" in user && "userAgent" in user;
}

// функция, возвращает  Promise<unknown> т.к. мы не можем быть на 100% уверенны, что получим список пользователей 
async function getUsers(urlString: string): Promise<unknown> {
  const response = await fetch(urlString);
  if (!response.ok) {
    throw new Error(`Error status: ${response.status}`);
  }
  /* unknown потому, что если будет ошибка в адресе запроса, то сюда может прилететь или 
  список юзеров или например один юзер, или вообще сообщении что запрос некоректный */
  const data: unknown = await response.json();
  return data;
}

function processUser(user: IUser): void {
    console.log(
      `Пользователь с идентификационным номером ${user.id} имеет такой логин ${user.username}`
    );
}

async function main(): Promise<void> {
  try {
    const responseData: unknown = await getUsers(API_URL);
    if (isSuccess(responseData)) {
      responseData.users.forEach((user) =>  {
        if (isUser(user)) {
          processUser(user)
        }
      });
    } else {
      throw new Error("Не удалось получить список пользователей, проверьте запрос!")
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

main();
