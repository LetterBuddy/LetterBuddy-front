describe('SignUp Form', () => {
  beforeEach(() => {
    cy.visit('/auth?signup=true')
  })

  it('should display sign up form elements', () => {
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="First Name"]').should('be.visible')
    cy.get('input[placeholder="Last Name"]').should('be.visible')
    cy.get('input[placeholder="User Name"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button[type="submit"]').contains('Sign Up').should('be.visible')
  })

  it('should display validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Email is required').should('be.visible')
    cy.contains('Username is required').should('be.visible')
    cy.contains('First name is required').should('be.visible')
    cy.contains('Last name is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')
  })

  it('should display validation error for short password', () => {
    cy.get('input[placeholder="Password"]').type('123')
    cy.get('button[type="submit"]').click()
    cy.contains('Password is required (min 8 characters)').should('be.visible')
  })

  it('should handle server-side validation errors', () => {
    cy.intercept('POST', '/accounts/adult/', {
      statusCode: 400,
      body: {
        username: ['Username already exists'],
        email: ['Email already registered']
      }
    }).as('signupRequest')

    cy.get('input[placeholder="Email"]').type('test@example.com')
    cy.get('input[placeholder="First Name"]').type('Test')
    cy.get('input[placeholder="Last Name"]').type('User')
    cy.get('input[placeholder="User Name"]').type('testuser')
    cy.get('input[placeholder="Password"]').type('password123')
    cy.get('button[type="submit"]').click()

    cy.wait('@signupRequest')
    cy.contains('Username already exists').should('be.visible')
    cy.contains('Email already registered').should('be.visible')
  })

  it('should successfully sign up with valid data', () => {
    cy.intercept('POST', '/accounts/adult/', {
      statusCode: 201,
      body: {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        first_name: 'Test',
        last_name: 'User'
      }
    }).as('signupRequest')

    cy.get('input[placeholder="Email"]').type('test@example.com')
    cy.get('input[placeholder="First Name"]').type('Test')
    cy.get('input[placeholder="Last Name"]').type('User')
    cy.get('input[placeholder="User Name"]').type('testuser')
    cy.get('input[placeholder="Password"]').type('password123')
    cy.get('button[type="submit"]').click()

    cy.wait('@signupRequest')

    // Verify the request payload
    cy.get('@signupRequest').its('request.body').should('deep.equal', {
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
      username: 'testuser',
      password: 'password123'
    })

    // After successful signup, user should be redirected to login
    cy.contains('Log In').should('be.visible')
  })

  it('should be able to switch to login form', () => {
    cy.contains('Already have an account?').should('be.visible')
    cy.contains('button', 'Log In').click()
    cy.contains('Log In').should('be.visible')
  })
})
