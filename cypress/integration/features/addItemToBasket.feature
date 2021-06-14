@smoke
Feature: Add an item to the basket and checkout

    As a user,
    I want to look for the cheapest item and
    select two cheapest item to the basket then
    I go to the basket screen and choose for the lowest price item and
    do checkout

    Scenario Outline: Search by crew name and verify the name contain in the page list
        Given User launches the shopping website
        And login to the website using "standard_user"
        When user select the sort filter to <sortFilter>
        Then add to cart <addItemNumber> items which has <priceRangeToAddItem> price value
        And user able to see the added item in the cart
        Then user decide to remove <removeItemNumber> item which has <priceRangeToRemoveItem> price
        And checkout the item added in the basket

    Examples:
    |sortFilter         |addItemNumber|priceRangeToAddItem|removeItemNumber|priceRangeToRemoveItem|
    |Price (low to high)|2            |lowest             |1               |highest               |
    |Price (high to low)|4            |highest            |2               |highest               |
    |Price (low to high)|3            |lowest             |2               |lowest               |
    |No Filter          |3            |lowest             |2               |lowest               |
    
    
   

    