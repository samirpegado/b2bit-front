import TopBar from "../../src/components/TopBar";


describe('<TopBar />', () => {
  it('checa os elementos do componente', () => {
    cy.mount(<TopBar logout={function (): void {
      throw new Error("Function not implemented.");
    } } />);

    // checa se o botao de logout esta visivel
    cy.get('.logout').contains('Logout').should('be.visible');

  
  })
})