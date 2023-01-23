import User from '~/entities/User'
import UserProfile from '~/entities/UserProfile'
import { BaseResolver } from './BaseResolver'

export class UserResolver extends BaseResolver {
  public async users (): Promise<User[]> {
    return []
  }

  public user (id: string): User {
    return {
      id,
      email: 'jconnor@sky.net',
      createdAt: '2019-01-01T00:00:00.000Z',
      updatedAt: '2019-01-01T00:00:00.000Z'
    }
  }

  public userProfile (id: string): UserProfile {
    return {
      id,
      firstname: 'John',
      lastname: 'Connor'
    }
  }
}

export default UserResolver
