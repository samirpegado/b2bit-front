import UserCard from '../../src/components/UserCard';
import type { UserProfile } from '../../src/models/User';

describe('checa os elementos do componente', () => {

  //mockuser para teste
  const mockUserData: UserProfile = {
    name: 'Samir Gomes',
    email: 'sgomes@teste.com',
  };

  it('monta com dados do mockUserData', () => {
    cy.mount(<UserCard userData={mockUserData} />);

    //checa se os textos predefinidos, os dados do mockuser, e a imagem do perfil estao visiveis
    cy.get('p').contains('Your Name').should('be.visible');
    cy.get('div').contains('Samir Gomes').should('be.visible');
    cy.get('div').contains('Profile picture').should('be.visible');    
    cy.get('p').contains('Your E-mail').should('be.visible');
    cy.get('div').contains('sgomes@teste.com').should('be.visible');
    cy.get('img').should('have.attr', 'srcset', 'assets/profile_img.png');
  }); 
});
