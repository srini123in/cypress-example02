import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import {loginPage} from '../pages/login.page'
import {productPage} from '../pages/product.page'
import {basketPage} from '../pages/basket.page'

Given('User launches the shopping website', () => {
  loginPage.launchWebSite()
})
Given('login to the website using {string}', (userName) => {
  loginPage.userLogin(userName)
})
When('user select the sort filter to {}', (filterName) => {
  productPage.selectSortFilter(filterName)
})
Then('add to cart {} items which has {} price value', (itemNum, filterType) => {
  productPage.addToCartAnItem(itemNum)
})
Then('user able to see the added item in the cart', () => {
  basketPage.verifyTheBasketItems()
})
Then('user decide to remove {} item which has {} price', (itemNum, priceType) => {
  basketPage.removeBasketItem(itemNum, priceType)
})
Then('checkout the item added in the basket', () => {
  basketPage.clickCheckoutBtn()
})
