import { User } from '@/types'
import Cookies from 'universal-cookie';
import { proxy } from 'valtio'

export const store = proxy<{user: User, count: number}>({
  user: {} as User,
  count: 1,
})