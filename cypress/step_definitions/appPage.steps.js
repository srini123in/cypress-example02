import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const pageTitle = 'OOS: Crew applications'
const sreachNameInputBoxId = '#name'
const sreachCityInputBoxId = '#city'
const searchSubmitBtnType = '[type="submit"]'
const nameTxtPosition = 1
const cityTxtPosition = 2
let totalCrewCardsBeforeSearch = 0
let totalCrewCardsAfterSearch = 0
let searchName = ''
let currentStatus = ''
const getLengthOfChildEle = (ele) => {return Cypress.$(ele).children().length}

const verifySearchWordOnThePageCrewList = (name, city, toCheckFor) => {
    let len = getLengthOfChildEle('.App-container .App-column')
    let lenchild
    let isSearchNameVisible = 0

    for(let outerLoop = 0; outerLoop < len; outerLoop++){
        lenchild = getLengthOfChildEle(`.App-container > :nth-child(${outerLoop+1}) > :nth-child(1)`)
        totalCrewCardsAfterSearch = totalCrewCardsAfterSearch + lenchild
        if(lenchild > 1){
            isSearchNameVisible = 1
        }
        for(let innerLoop = 0; innerLoop < lenchild -1; innerLoop++){
            if(lenchild >= 1){
                if(toCheckFor === 'crewName'){
                    cy.get(`.App-container > :nth-child(${outerLoop+1}) > :nth-child(1) > :nth-child(${innerLoop+2}) > .CrewMember-info > .CrewMemeber-name > :nth-child(${nameTxtPosition})`)
                    .then((ele) => {
                        expect(ele.text()).to.include(name) 
                    })
                }else if(toCheckFor === 'cityName'){
                    cy.get(`.App-container > :nth-child(${outerLoop+1}) > :nth-child(1) > :nth-child(${innerLoop+2}) > .CrewMember-info > .CrewMemeber-name > :nth-child(${cityTxtPosition})`)
                    .then((ele) => {
                        expect(ele.text()).to.include(name)
                    })
                }else if(toCheckFor === 'nameAndCity'){
                    cy.get(`.App-container > :nth-child(${outerLoop+1}) > :nth-child(1) > :nth-child(${innerLoop+2}) > .CrewMember-info > .CrewMemeber-name > :nth-child(${nameTxtPosition})`)
                    .then((ele) => {
                        expect(ele.text()).to.include(name)
                    })  
                    cy.get(`.App-container > :nth-child(${outerLoop+1}) > :nth-child(1) > :nth-child(${innerLoop+2}) > .CrewMember-info > .CrewMemeber-name > :nth-child(${cityTxtPosition})`)
                    .then((ele) => {
                        expect(ele.text()).to.include(city)
                    })  
                }        
            }
        }      
    }
    return isSearchNameVisible
}
const countCrewCards = (searchType) => {
    let len = getLengthOfChildEle('.App-container .App-column')
    let lenchild
    let totalCrewCards = 0

    for(let outerLoop = 0; outerLoop < len; outerLoop++){
        lenchild = getLengthOfChildEle(`.App-container > :nth-child(${outerLoop+1}) > :nth-child(1)`)
        if(searchType === 'before'){
            totalCrewCardsBeforeSearch = totalCrewCardsBeforeSearch + lenchild 
            totalCrewCards =  totalCrewCardsBeforeSearch
        }else if(searchType === 'after'){
            totalCrewCardsAfterSearch = totalCrewCardsAfterSearch + lenchild
            totalCrewCards = totalCrewCardsAfterSearch
        } 
    }
    cy.log('totalCrewCards ', totalCrewCards)
    return totalCrewCards
}
const findTheCrewStatus = (name) => {
    cy.contains(name).parents('.CrewMember-container').siblings('h2')
    .then((statusTxt) => {
        cy.log('status: ', statusTxt.text())
        currentStatus = statusTxt.text();
    })
}
const moveForwardCrewStatus = (name) => {
    cy.contains(name).parents('.CrewMember-container').find('.CrewMember-up').click()
    .then(() => {
        cy.contains(name).parents('.CrewMember-container').siblings('h2')
        .then((eleTxt) => {
            cy.log('Crew status: ', eleTxt.text())
        })
        
    })
}
const moveReverseCrewStatus = (name) => {
    cy.contains(name).parents('.CrewMember-container').find('.CrewMember-toolbar > :nth-child(1)').click()
        .then(() => {
            cy.contains(name).parents('.CrewMember-container').siblings('h2')
            .then((eleTxt) => {
                cy.log('Crew status: ', eleTxt.text())
            })
    })
}

const verifyCrewStatus = (name, updateStatus) => {  
    cy.contains(name)
        .then(() => {
            cy.contains(name).parents('.CrewMember-container').siblings('h2')
            .then((eleTxt) => {
                expect(updateStatus).to.eql(eleTxt.text())
                cy.log('Crew status: ', eleTxt.text())
            })
    })
}

const updateCrewStatus = (name, updateStatus) => {
    if(updateStatus != currentStatus){
        if(currentStatus === 'Applied'){
            if(updateStatus === 'Interviewing'){
                moveForwardCrewStatus(name)
            }else if(updateStatus === 'Hired'){
                moveForwardCrewStatus(name)
                moveForwardCrewStatus(name)
            }
        }else if(currentStatus === 'Interviewing'){
            if(updateStatus === 'Applied'){
                moveReverseCrewStatus(name)
            }else if(updateStatus === 'Hired'){
                moveForwardCrewStatus(name)
            }
        }else if(currentStatus === 'Hired'){
            if(updateStatus === 'Interviewing'){
                moveReverseCrewStatus(name)
            }else if(updateStatus === 'Applied'){
                moveReverseCrewStatus(name)
                moveReverseCrewStatus(name)
            }
        }
    }
}

Given('User launches the app page', () => {
    cy.visit('/')
    cy.title().should('eq', pageTitle)
})
When('enter the crew {} in the search box and submit', (name) => {
    searchName = name
    cy.get(sreachNameInputBoxId).type(name)
    cy.get(searchSubmitBtnType).click()
})
When('enter the city {} in the search box and submit', (city) => {
    cy.get(sreachCityInputBoxId).type(city)
    cy.get(searchSubmitBtnType).click()
})
When('enter the crew {} and city {} in the search boxes and submit', (name, city) => {
    cy.get(sreachNameInputBoxId).type(name)
    cy.get(sreachCityInputBoxId).type(city)
    cy.get(searchSubmitBtnType).click()
})
Then('user able to see the crews {} on the page container list', (name) => {
    expect(verifySearchWordOnThePageCrewList(name, 'crewName')).to.eql(1, `Search word ${name} should display on the page`)
})
Then('user see no crews {} on the page container list', (name) => {
    expect(verifySearchWordOnThePageCrewList(name, 'crewName')).to.eql(0, `Search list should be empty`)
})
Then('user able to see the city {} on the page container list', (city) => {
    expect(verifySearchWordOnThePageCrewList(city, 'cityName')).to.eql(1, `Search word ${city} should display on the page`)
})
Then('user see no city {} on the page container list', (city) => {
    expect(verifySearchWordOnThePageCrewList(city, 'cityName')).to.eql(0, `Search list should be empty`)
})
Then('user able to see the crew {} and city {} on the page container list', (name, city) => {
    expect(verifySearchWordOnThePageCrewList(name, city, 'nameAndCity')).to.eql(1, `Search word ${name} and ${city} should display on the page`)
})
Then('user cleared the search list and able see all crew cards', () => {
    cy.contains('button', 'Clear').click()
    .then(() => {
        expect(countCrewCards('before')).to.greaterThan(totalCrewCardsAfterSearch, `Search list should be cleared`)
    })
    
})
Then('user check the crew {} status on the list', (name) => {
    findTheCrewStatus(name)
})
Then('user update the crew {} status to {}', (name, status) => {
    updateCrewStatus(name, status)
})
Then('user verify the crew {} status {} are correct', (name, status) => {
    verifyCrewStatus(name, status)
})

