import UserProfile from './UserProfile'

export interface User {
  id: string
  email: string
  profile?: UserProfile
  createdAt: string
  updatedAt: string

}

export default User
