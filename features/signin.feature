Feature: Login
  As a user
  I want to be able to log in to my account
  To access the website's features

  Scenario: Login with valid credentials
    Given The user is on the login page
    When The user enters their username "alvaro" and password "diaz"
    Then The user should see the Logout button and Menu button

  Scenario: Login with invalid credentials
    Given The user is on the login page
    When The user enters their username "user_invalidate" and password "key_incorrect"
    Then The user should see the fields username and key