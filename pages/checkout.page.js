class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkout = page.getByTestId('checkout');
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continue = page.getByTestId('continue');
    this.finish = page.getByTestId('finish');
    this.error = page.getByTestId('error');
    this.completeHeader = page.getByTestId('complete-header');
  }

  async enterCustomer(customer) {
    await this.firstName.fill(customer.firstName);
    await this.lastName.fill(customer.lastName);
    await this.postalCode.fill(customer.postalCode);
    await this.continue.click();
  }
}

module.exports = { CheckoutPage };
