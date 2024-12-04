describe('Search Component', () => {
    const searchText = 'Cypress Testing';

    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('renders with an empty search field and no clear button visible', () => {
        cy.get('input[type="text"]').should('have.value', '');

        cy.get('button').should('not.be.visible');
    });

    it('allows the user to type in the search input field', () => {
        cy.get('input[type="text"]').type(searchText);

        cy.get('input[type="text"]').should('have.value', searchText);
    });

    it('displays the clear button when there is text in the search input', () => {
        cy.get('input[type="text"]').type(searchText);

        cy.get('button').should('be.visible');

        cy.get('button').find('i').should('have.class', 'bi-x-lg');
    });

    it('clears the search input when the clear button is clicked', () => {
        cy.get('input[type="text"]').type(searchText);

        cy.get('button').click();

        cy.get('input[type="text"]').should('have.value', '');

        cy.get('button').should('not.be.visible');
    });

    it('does not display the clear button when there is no text in the search input', () => {
        cy.get('input[type="text"]').clear();
        cy.get('button').should('not.be.visible');
    });

    it('calls onSearch with correct arguments when typing in the input', () => {
        const spy = cy.spy().as('onSearchSpy');
        cy.mount(
            <Search
                searchCriteria={{searchText: '', category: ''}}
                onSearch={spy}
            />,
        );

        cy.get('input[type="text"]').type(searchText);

        cy.get('@onSearchSpy').should('have.been.calledWith', {
            searchText: searchText,
            category: '',
        });
    });
});
