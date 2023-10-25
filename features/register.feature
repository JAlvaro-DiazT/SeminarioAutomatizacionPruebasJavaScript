Feature: User Registration
  As a new user
  I want to create an account
  So that I can access the website's features

  Scenario: Successful registration
    Given The user is on the registration page
    When The user enters his full name "", username "" and password ""
    Then The user should then see the message "Operación completada"

  Scenario: Register a user that already exists
    Given The user is on the registration page
    When The user enters his full name "alvaro diaz", username "alvaro" and password "diaz"
    Then The user should then see the message "Existing registration"