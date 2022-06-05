Feature: Login/Logout
    
    Scenario: User can log in to application
        Given User opens aplication
        When Click Login 
        And Provide an email
        And Provide a password
        And Click login button
        Then List of user`s reservation is visible and have length '3'

    Scenario: User can logout from the application
        Given Log in to the application
        And List of user`s reservation is visible and have length '3'
        When Click Logout
        Then See start screen 
    
    Scenario: User can register and login in application
        Given User opens aplication
        When Click Login
        And Click link to register
        And Fill all necessary fields in registration form
        And Click register button
        And Redirected to the log in page
        And Click login button
        Then See page without reservations