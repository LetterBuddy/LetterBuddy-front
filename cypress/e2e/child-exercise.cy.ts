describe('Child Exercise Flow', () => {
  beforeEach(() => {
    // Mock child auth
    cy.intercept('POST', '/accounts/login/', {
      statusCode: 200,
      body: {
        access: 'mock_token',
        refresh: 'mock_refresh',
        role: 'CHILD'
      }
    }).as('login')

    // Mock exercise fetch with different responses
    let isFirstExercise = true;
    cy.intercept('POST', '/exercises/', (req) => {
      const response = isFirstExercise ? {
        id: 'hello123',
        requested_text: 'Hello',
        level: 'words',
        category: null
      } : {
        id: 'world123',
        requested_text: 'World',
        level: 'words',
        category: null
      };
      
      isFirstExercise = false;
      req.reply({
        statusCode: 200,
        body: response
      });
    }).as('getExercise')

    // Mock skip exercise
    cy.intercept('DELETE', '/exercises/hello123/', {
      statusCode: 204
    }).as('skipExercise')

    // Mock exercise submission
    cy.intercept('PUT', '/exercises/hello123/submit/', (req) => {
      // Verify that we're sending an image file
      expect(req.headers['content-type']).to.include('multipart/form-data')
      
      req.reply({
        statusCode: 200,
        body: {
          submitted_image: 'mock_image_url',
          submitted_text: 'Hello',
          score: 0.85
        }
      })
    }).as('submitExercise')

    // Login as child
    cy.visit('/auth?signup=false')
    cy.get('input[name="username"]').type('testchild')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.wait('@login')
    
    // Wait for navigation to exercise page
    cy.url().should('include', '/exercise')
  })

  it('should skip exercise and get new one', () => {    
    // Skip current exercise
    cy.get('[aria-label="skip-button"]').click()
    cy.wait('@skipExercise')
    
    // Should get new exercise with 'World'
    cy.wait('@getExercise')
    cy.contains('World').should('be.visible')
  })

  it('should submit exercise with image', () => {
    // Initial exercise should be visible
    cy.contains('Hello', { timeout: 10000 }).should('be.visible')
    
    // Upload image for exercise
    cy.get('input[type="file"]').first().selectFile({
      contents: Cypress.Buffer.from('fake image data'),
      fileName: 'test.png',
      mimeType: 'image/png'
    }, { force: true })
    
    // Wait for submission and verify response
    cy.wait('@submitExercise')
    
    cy.contains('Score: 85').should('be.visible')
    // Should show preview image
    cy.get('img[alt="Uploaded preview"]').should('be.visible')
  })
})
