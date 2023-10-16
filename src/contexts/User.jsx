export const authProvider = {
  isAuthenticated: false,
  username: null,
  async signin(username) {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = true;
    authProvider.username = username;
    console.log(authProvider)
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = false;
    authProvider.username = "";
    console.log(authProvider)
  },
};