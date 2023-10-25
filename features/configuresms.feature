Feature: Configure SMS
  As a user
  I want to be able to log in and be on the first page.
  To interact in the configure SMS

  Scenario: SMS-Builder :: Configure SMS

    Given The user is on the login page sms
    And The user enters their username "alvaro" and password "diaz" sms
    And The user is redirected to page 1
    When The user enters the name and description
    Then the user should be on the next page seeing the goal table