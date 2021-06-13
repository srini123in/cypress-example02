let instance = null
export class TestData {
  constructor() {
    if (!instance) {
      instance = this
    }
    this.productPriceArray = []
    this.basketPriceArray = []
    this.itemNameArray = []
    this.map = new Map()


    return instance
  }
}
export const testData = new TestData()
