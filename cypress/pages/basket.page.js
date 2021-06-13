import {testData} from '../support/testData'

const itemPriceEle = '.inventory_item_price'
const basketBadgeEle = '.shopping_cart_badge'
const checkoutBtnEle = '[data-test=checkout]'
const basketPageTitle = 'Your Cart'
const checkoutCompletePageTitle = 'Checkout: Your Information'
export class BasketPage {

  verifyTheBasketItems(){
    cy.get('.shopping_cart_link').click()
    cy.contains('.title', basketPageTitle).should('be.visible')
    for(let i = 0; i < testData.basketPriceArray.length; i++){
      cy.contains(itemPriceEle, `$${testData.basketPriceArray[i]}`).should('be.visible')
    }
  }
  removeBasketItem(itemNum, priceType){
    for(let i = 0; i < itemNum; i++){
      if(priceType === 'lowest'){
        testData.basketPriceArray.sort(function(a, b){return a-b;})
        this.removeFromCart(`$${testData.basketPriceArray[i]}`, testData.basketPriceArray.length - (i+1))
      }else if(priceType === 'highest'){
        testData.basketPriceArray.sort(function(a, b){return b-a;})
        this.removeFromCart(`$${testData.basketPriceArray[i]}`, testData.basketPriceArray.length - (i+1))
      }
    }
  }
  removeFromCart(price, count){
    cy.contains(itemPriceEle, price).siblings('button').click()
    .then(() => {
      cy.contains(basketBadgeEle, count).should('be.visible')
    })
  }
  clickCheckoutBtn(){
    cy.get(checkoutBtnEle).click()
    .then(() => {
      cy.contains('.title', checkoutCompletePageTitle)
    })
  }
}
export const basketPage = new BasketPage()