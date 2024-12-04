describe('Home Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('displays the TopCategories component when no search criteria are provided', () => {
        cy.get('main').contains('Most popular tools');
        cy.get('.top-categories').should('be.visible');

        it('renders ToolGrid when search criteria are entered', () => {
            cy.get('input[name="searchText"]').type('Cypress testing');
            cy.get('select[name="category"]').select('Automation');

            cy.get('form').submit();

            cy.get('.tool-grid').should('be.visible');
            cy.get('.tool-grid').contains('Cypress testing');
        });

        it('does not show TopCategories when search criteria are present', () => {
            cy.get('input[name="searchText"]').type('Cypress testing');
            cy.get('form').submit();

            cy.get('.top-categories').should('not.exist');
        });

        it('checks if search criteria are properly passed to ToolGrid', () => {
            const searchText = 'React';
            const category = 'JavaScript';

            cy.get('input[name="searchText"]').type(searchText);
            cy.get('select[name="category"]').select(category);

            cy.get('form').submit();

            cy.get('.tool-grid').should(
                'have.attr',
                'data-search-text',
                searchText,
            );
            cy.get('.tool-grid').should('have.attr', 'data-category', category);
        });
    });
});
