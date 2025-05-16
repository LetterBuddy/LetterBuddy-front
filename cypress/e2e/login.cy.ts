describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/auth?signup=false')
  })

  it('should display login form elements', () => {
    cy.get('input[placeholder="User Name"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button[type="submit"]').contains('Log In').should('be.visible')
  })

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Username is required').should('be.visible')
    cy.contains('Password is required (min 8 characters)').should('be.visible')
  })

  it('should show error for invalid credentials', () => {
    cy.get('input[placeholder="User Name"]').type('wronguser')
    cy.get('input[placeholder="Password"]').type('wrongpass123')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid username or password').should('be.visible')
  })

  it('should successfully login with valid credentials', () => {
    cy.intercept('POST', '/accounts/login/', {
      statusCode: 200,
      body: {
        access: 'fake-access-token',
        refresh: 'fake-refresh-token',
        role: 'ADULT',
        first_name: 'Test',
        last_name: 'User'
      }
    }).as('loginRequest')

    cy.get('input[placeholder="User Name"]').type('validuser')
    cy.get('input[placeholder="Password"]').type('validpass123')
    cy.get('button[type="submit"]').click()

    // Wait for the API call to complete
    cy.wait('@loginRequest')

    // Verify the request payload
    cy.get('@loginRequest').its('request.body').should('deep.equal', {
      username: 'validuser',
      password: 'validpass123'
    })

    // Verify localStorage tokens are set
    cy.window().its('localStorage').invoke('getItem', 'access_token')
      .should('eq', 'fake-access-token')
    cy.window().its('localStorage').invoke('getItem', 'refresh_token')
      .should('eq', 'fake-refresh-token')

    // Verify navigation to accounts page for adult users
    cy.url().should('include', '/accounts')
  })

  it('should navigate child users to exercise page', () => {
    cy.intercept('POST', '/accounts/login/', {
      statusCode: 200,
      body: {
        access: 'fake-access-token',
        refresh: 'fake-refresh-token',
        role: 'CHILD',
        first_name: 'Child',
        last_name: 'User'
      }
    }).as('loginRequest')

    cy.get('input[placeholder="User Name"]').type('childuser')
    cy.get('input[placeholder="Password"]').type('childpass123')
    cy.get('button[type="submit"]').click()

    // Wait for the API call to complete
    cy.wait('@loginRequest')

    cy.url().should('include', '/exercise')
  })

  it('should navigate adult users to accounts page', () => {
    cy.intercept('POST', '/accounts/login/', {
      statusCode: 200,
      body: {
        access: 'fake-access-token',
        refresh: 'fake-refresh-token',
        role: 'ADULT',
        first_name: 'Adult',
        last_name: 'User'
      }
    }).as('loginRequest')

    cy.get('input[placeholder="User Name"]').type('adultuser')
    cy.get('input[placeholder="Password"]').type('adultpass123')
    cy.get('button[type="submit"]').click()

    // Wait for the API call to complete
    cy.wait('@loginRequest')

    // Verify navigation to accounts page for adult users
    cy.url().should('include', '/accounts')
  })
})
