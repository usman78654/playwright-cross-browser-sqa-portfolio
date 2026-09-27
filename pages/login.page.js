class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.submit = page.getByTestId('login-button');
    this.error = page.getByTestId('error');
  }

  async open() {
    await this.page.goto('/');
  }

  async login(user) {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.submit.click();
  }
}

module.exports = { LoginPage };
