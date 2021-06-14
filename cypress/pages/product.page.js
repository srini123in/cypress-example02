import {testData} from '../support/testData'

const sortFilterDropEle = '[data-test=product_sort_container]'
const inventoryListEles = '.inventory_list'
const itemPriceEle = '.inventory_item_price'
const basketBadgeEle = '.shopping_cart_badge'
const itemNameEle = '.inventory_item_name'
const itemDescEle = '.inventory_item_description'
export class ProductPage {
  selectSortFilter(filterName){
    if(filterName != 'No Filter'){
      cy.get(sortFilterDropEle).select(filterName)
    }
  }
  addToCartAnItem(itemNum){
    let displayPrice
    testData.productPriceArray = []
    testData.basketPriceArray = []
    testData.itemNameArray = []
    cy.get(inventoryListEles).children()
    .each((ele) => {
      cy.get(ele).find(itemNameEle)
      .then((txt) => {
        testData.itemNameArray.push(txt.text())
      })
      cy.get(ele).find(itemPriceEle)
      .then((txt) => {
        displayPrice = txt.text().replace('$','')
        testData.productPriceArray.push(displayPrice)
      })   
    })
    .then(() => {
      for(let i = 0; i < itemNum; i++){
        testData.basketPriceArray.push(testData.productPriceArray[i])
        this.addToCart('$'+testData.productPriceArray[i], testData.itemNameArray[i], i+1)
      }
    })
  }
  addToCart(price, itemName, count){
    cy.contains(itemNameEle, itemName).parents(itemDescEle).find(itemPriceEle).contains(price).siblings('button').click()
    .then(() => {
      cy.contains(basketBadgeEle, count).should('be.visible')
    })
  }

}
export const productPage = new ProductPage()