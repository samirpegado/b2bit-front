import LoginPage from "../../src/pages/LoginPage"

describe('<LoginPage />', () => {
  it('checa os elementos do componente', () => {
    cy.mount(<LoginPage />);

    // verifica se os inputs de email, password e o botao de sign in estao visiveis
    cy.get('label').contains('E-mail').should('be.visible');
    cy.get('label').contains('Password').should('be.visible');
    cy.get('button[type="submit"]').contains('Sign in').should('be.visible');

    // aciona o botao de sign in com os inputs em branco e verifica se a mensagem do form validation é exibida
    cy.get('button[type="submit"]').click();    
    cy.contains('Este campo é obrigatório.').should('be.visible');
  })
})