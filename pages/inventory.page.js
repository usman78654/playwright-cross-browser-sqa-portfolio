class InventoryPage {
  constructor(page) {
    this.page = page;
    this.list = page.getByTestId('inventory-list');
    this.items = page.getByTestId('inventory-item');
    this.names = page.getByTestId('inventory-item-name');
    this.prices = page.getByTestId('inventory-item-price');
    this.sort = page.getByTestId('product-sort-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
  }

  async addProduct(name) {
    const slug = name.toLowerCase().replaceAll(' ', '-');
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
