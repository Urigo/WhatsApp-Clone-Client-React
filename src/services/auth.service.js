export default {
  storeAuthHeader(auth: string) {
    localStorage.setItem('Authorization', auth);
  }

  getAuthHeader(): string {
    return localStorage.getItem('Authorization');
  }

  storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
}
