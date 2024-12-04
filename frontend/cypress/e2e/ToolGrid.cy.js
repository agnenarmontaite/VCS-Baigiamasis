describe('ToolGrid Component', () => {
    const mockTools = [
        {
            _id: '1',
            name: 'Cypress Testing Tool',
            description: {
                'Prekės tipas': 'Automation',
            },
        },
        {
            _id: '2',
            name: 'React Developer Tool',
            description: {
                'Prekės tipas': 'Web Development',
            },
        },
        {
            _id: '3',
            name: 'Node.js Tool',
            description: {
                'Prekės tipas': 'Backend',
            },
        },
    ];

    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3000/tools', {
            statusCode: 200,
            body: {tools: mockTools},
        }).as('getTools');

        cy.visit('http://localhost:5173/');
    });

    it('displays loading state and fetches products from API', () => {
        cy.wait('@getTools');

        cy.get('.tool-card').should('have.length', mockTools.length);
    });

    it('displays all products initially when no search criteria are provided', () => {
        cy.wait('@getTools');

        cy.get('.tool-card').should('have.length', mockTools.length);

        cy.get('.tool-card').first().contains('Cypress Testing Tool');
        cy.get('.tool-card').first().contains('Automation');
    });

    it('filters products by searchText', () => {
        cy.wait('@getTools');
        cy.get('input[type="text"]').type('Cypress Testing');

        cy.get('.tool-card').should('have.length', 1);

        cy.get('.tool-card').first().contains('Cypress Testing Tool');
    });

    it('filters products by category', () => {
        cy.wait('@getTools');
        cy.get('select[name="category"]').select('Automation');

        cy.get('.tool-card').should('have.length', 1);

        cy.get('.tool-card').first().contains('Cypress Testing Tool');
    });

    it('filters products by both searchText and category', () => {
        cy.wait('@getTools');
        cy.get('input[type="text"]').type('Cypress');
        cy.get('select[name="category"]').select('Automation');

        cy.get('.tool-card').should('have.length', 1);

        cy.get('.tool-card').first().contains('Cypress Testing Tool');
    });

    it('displays a message when no results match the search criteria', () => {
        cy.wait('@getTools');
        cy.get('input[type="text"]').type('Nonexistent Product');

        cy.get('.tool-card').should('have.length', 0);

        cy.get('h2').contains('Found 0 results');
    });

    it('shows the correct number of results when search criteria match', () => {
        cy.wait('@getTools');
        cy.get('input[type="text"]').type('Tool');
        cy.get('select[name="category"]').select('Web Development');

        cy.get('.tool-card').should('have.length', 1);
    });
});
