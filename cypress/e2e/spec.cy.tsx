describe('checa elementos básicos', () => {
  it('passes', () => {
    //acessa a página
    cy.visit('http://localhost:5173/')

    //checa se os campos email e password existem
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password').should('exist')

    //insere o email de login e confirma 
    cy.get('input[type="email"]').type('cliente@youdrive.com')
    cy.get('input[type="email"]').should('have.value', 'cliente@youdrive.com')

    //insere uma senha errada confirma 
    cy.get('input[type="password"]').type('pass')
    cy.get('input[type="password"]').should('have.value', 'pass')

    cy.intercept('POST', 'https://api.homologation.cliqdrive.com.br/auth/login/').as('login')

    // Pressionar o botão submit
    cy.get('button[type="submit"]').click()
    
    //checa se o login falhou (status code != 200)
    cy.wait('@login').its('response.statusCode').should('not.eq', 200)

    //recarrega a pagina 
    cy.reload();

    //insere o email correto e confirma 
    cy.get('input[type="email"]').type('cliente@youdrive.com')
    cy.get('input[type="email"]').should('have.value', 'cliente@youdrive.com')

    //insere a senha correta e confirma 
    cy.get('input[type="password"]').type('password')
    cy.get('input[type="password"]').should('have.value', 'password')

    cy.intercept('POST', 'https://api.homologation.cliqdrive.com.br/auth/login/').as('login')

    // Pressionar o botão submit
    cy.get('button[type="submit"]').click()
    
    //checa se o login teve sucesso (status code == 200)
    cy.wait('@login').its('response.statusCode').should('eq', 200)

    cy.intercept('GET', 'https://api.homologation.cliqdrive.com.br/auth/profile/').as('profile')

    //checa se obteve os dados do perfil na requisicao (status code == 200)
    cy.wait('@profile').its('response.statusCode').should('eq', 200)

    //aciona o botao de logout

    cy.get('.logout').click()

    //verifica se retornou para a pagina de login
    cy.url().should('eq', 'http://localhost:5173/login') 
  })
})