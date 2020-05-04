export interface IMockUser {
  id: number
  email: string
  name: string
}

export const MockUserDatabase: Array<IMockUser> = [
  {
    id: 1,
    email: 'John.Doe@example.com',
    name: 'John Doe',
  },
  {
    id: 2,
    email: 'Jarrad.Shah@example.com',
    name: 'Jarrad Shah',
  },
  {
    id: 3,
    email: 'Ari.Woolley@example.com',
    name: 'Ari Woolley',
  },
  {
    id: 4,
    email: 'Jack.Norton@example.com',
    name: 'Jack Norton',
  },
  {
    id: 5,
    email: 'Cecily.Portillo@example.com',
    name: 'Cecily Portillo',
  },
]

export function findUser(id: number): IMockUser | undefined {
  return MockUserDatabase.filter((u) => {
    return u.id === id
  })[0]
}
