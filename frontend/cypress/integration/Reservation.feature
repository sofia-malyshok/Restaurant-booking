Feature: Manage reservations

    Scenario: User can create reservation after login
        Given Log in to the application
        When Click book table button
        And Select the number of guests equals '8'
        And Select booking date
        And Select booking time
        And Move to the next step
        And Select a table '11'
        And Move to the next step
        And Move to the next step
        Then See confirmation of reservation
    
    Scenario: User can create reservation without being logged in
        Given User opens aplication
        When Click book table button
        And Select the number of guests equals '8'
        And Select booking date 
        And Select booking time
        And Move to the next step
        And Select a table '12'
        And Move to the next step
        And Provide an email
        And Provide a password
        And Click login button
        And Move to the next step
        Then See confirmation of reservation

    Scenario: User can not book a table which is not availible
        Given User opens aplication
        When Click book table button
        And Select the number of guests equals '8'
        And Select booking date 
        And Select booking time
        Then User can not move forward and see message about no availible tables
    
    Scenario: User can see a list of reservation jusy after log in
        Given Log in to the application
        When Click my bookings button
        Then List of user`s reservation is visible and have length '5'
    
    Scenario: User can delete his/her reservation
        Given Log in to the application
        When Click my bookings button
        And Click delete reservation for '4' reservation on reservations list
        And Confirm deletion
        Then List of user`s reservation is visible and have length '4'