describe('Adult Viewing Child Submissions', () => {
  beforeEach(() => {
    // Mock login response for adult user
    cy.intercept('POST', '/accounts/login/', {
      statusCode: 200,
      body: {
        access: 'fake-access-token',
        refresh: 'fake-refresh-token',
        role: 'ADULT',
        first_name: 'Test',
        last_name: 'Parent'
      }
    }).as('loginRequest')

    // Mock children data
    cy.intercept('GET', '/accounts/child/', {
      statusCode: 200,
      body: [{
        id: 'child123',
        first_name: 'Test',
        last_name: 'Child',
        username: 'testchild'
      }]
    }).as('getChildren')

    // Mock submissions data
    cy.intercept('GET', '/exercises/child123/submissions/', (req) => {
      console.log('Submissions request URL:', req.url);
      req.reply({
        statusCode: 200,
        body: [{
          id: 'submission123',
          submission_date: '2025-05-16T19:30:39.000Z',
          requested_text: 'Hello',
          level: 'letters',
          score: 0.85
        }]  
      });
    }).as('getSubmissions')

    // Mock single submission with image
    cy.intercept('GET', '/exercises/submission123/', {
      statusCode: 200,
      body: {
        submitted_image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
      }
    }).as('getSubmission')

    // Start from login
    cy.visit('/auth?signup=false')
    cy.get('input[placeholder="User Name"]').type('testparent')
    cy.get('input[placeholder="Password"]').type('testpass123')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest')
  })

  it('should navigate to submissions table and view a submission', () => {
    cy.url().should('include', '/accounts')
    cy.wait('@getChildren')

    // Click on table icon
    cy.get('[data-testid="icon-table-export"]').click()

    // Should navigate to table page
    cy.url().should('include', '/table')
    
    // Wait for submissions and verify response
    cy.wait('@getSubmissions').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
      expect(interception.response?.body).to.be.an('array');
      expect(interception.response?.body[0]).to.have.property('id', 'submission123');
    });

    // Wait for table to be visible
    cy.get('table').should('be.visible')
    cy.contains('Hello').should('be.visible')
    cy.contains('85%').should('be.visible')

    // Click view button
    cy.get('[data-testid="view-submission-button-submission123"]')
      .should('be.visible')
      .click()
    cy.wait('@getSubmission')

    // Modal should show the mock image
    cy.get('[data-testid="submission-modal"]').should('be.visible')
    cy.get('[data-testid="submission-image"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'data:image/png;base64')
  })
})
