class UserHelper {
  static getNameFromProfile (user, profile) {
    if (profile) {
      if (profile.firstName || profile.lastName) {
        return (profile.firstName + ' ' + profile.lastName).trim()
      }
    }
    return user.email
  }
}

export default UserHelper