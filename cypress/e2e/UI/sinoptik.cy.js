// describe('Тест сайту Sinoptik - вибір Києва та перевірка респонсу', () => {
//   beforeEach(() => {
//     cy.intercept('GET', '**', (req) => {
//       if (!req.url.includes('sinoptik.ua')) {
//         req.reply({ statusCode: 200, body: '' }); // Blocks external requests
//       }
//     }).as('blockedExternal');
//   });

//   it('Перевіряє вибір першого міста в списку та код відповіді 200', () => {
//     cy.visit('https://ua.sinoptik.ua/');

//     // Вводимо "Київ" у поле пошуку
//     cy.get('[aria-label="Пошук населенного пункта"]').type('Київ').should('be.visible');

//     // Клікаємо на Київ
//     cy.contains('Київ, Столиця України').should('be.visible').click();

//     // Чекаємо, поки URL зміниться
//     cy.url().should('include', '/pohoda/kyiv').then((newUrl) => {
//       // Виконуємо запит на новий URL
//       cy.request(newUrl).then((response) => {
//         expect(response.status).to.eq(200);
//       });

//       for (let i = 1; i <= 7; i++) {

//         cy.get(a.tkK415TH:nth-child(${i})).should('be.visible').click();  // Клікаємо на вкладку
  
//         // Чекаємо, поки зміст вкладки оновиться
//         cy.wait(500);
//       }

//     });
//   });


// });

describe('Тест сайту Sinoptik - вибір Києва та перевірка респонсу', () => {
  beforeEach(() => {
    cy.intercept('GET', '**', (req) => {
      if (!req.url.includes('sinoptik.ua')) {
        req.reply({ statusCode: 200, body: '' }); // Блокуємо зовнішні запити
      }
    }).as('blockedExternal');
  });

  it('Перевіряє вибір першого міста в списку та код відповіді 200', () => {
    cy.visit('https://ua.sinoptik.ua/');

    // Вводимо "Київ" у поле пошуку
    cy.get('[aria-label="Пошук населенного пункта"]').type('Київ').should('be.visible');

    // Клікаємо на Київ
    cy.contains('Київ, Столиця України').should('be.visible').click();

    // Чекаємо, поки URL зміниться
    cy.url().should('include', '/pohoda/kyiv').then((newUrl) => {
      // Виконуємо запит на новий URL
      cy.request(newUrl).then((response) => {
        expect(response.status).to.eq(200);
      });

      // Перемикаємо по вкладках (1-7)
      const today = new Date();

    for (let i = 1; i <= 7; i++) {

      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString('uk-UA', { month: 'long' });
      const dayOfWeek = currentDate.toLocaleString('uk-UA', { weekday: 'long' });

      cy.get(`a.tkK415TH:nth-child(${i})`).should('be.visible').click();  // Клікаємо на вкладку

      // Чекаємо, поки зміст вкладки оновиться
      cy.wait(500);
      
      cy.get(`a.tkK415TH:nth-child(${i})`).should('contain.text', `${dayOfWeek}, ${day}, ${month}`);
      // cy.get(`p.xM6dxfW4`).should('contain.text', `${dayOfWeek}`);
      // cy.get(`p.RSWdP9mW`).should('contain.text', `${day}`);
      // cy.get(`p.yQxWb1P4`).should('contain.text', `${month}`);

    }
    });
  });
});
