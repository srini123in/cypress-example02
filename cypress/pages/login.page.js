const userNameInputEle = '[data-test=username]'
const passwordInputEle = '[data-test=password]'
const loginBtnEle = '[data-test=login-button]'
const pageTitleEle = 'Swag Labs'

export class LoginPage {

  launchWebSite(){
    cy.visit('/')
    cy.title(pageTitleEle)
  }
  userLogin(userName){
    cy.get(userNameInputEle).type(userName)
    cy.get(passwordInputEle).type('secret_sauce')
    cy.get(loginBtnEle).click()
  }

}
export const loginPage = new LoginPage()