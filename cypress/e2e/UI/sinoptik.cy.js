const monthCases = {
  'січень': 'січня',
  'лютий': 'лютого',
  'березень': 'березня',
  'квітень': 'квітня',
  'травень': 'травня',
  'червень': 'червня',
  'липень': 'липня',
  'серпень': 'серпня',
  'вересень': 'вересня',
  'жовтень': 'жовтня',
  'листопад': 'листопада',
  'грудень': 'грудня'
}

describe('Тест сайту Sinoptik - вибір Києва та перевірка респонсу', () => {
  beforeEach(() => {
    cy.intercept('GET', '', (req) => {
      if (!req.url.includes('sinoptik.ua')) {
        req.reply({ statusCode: 200, body: '' }) // Блокуємо зовнішні запити
      }
    }).as('blockedExternal')
  });

  it('Перевіряє вибір першого міста в списку та код відповіді 200', () => {
    cy.visit('https://ua.sinoptik.ua/')

    // Вводимо "Київ" у поле пошуку
    cy.get('[aria-label="Пошук населенного пункта"]').type('Київ').should('be.visible')

    // Клікаємо на Київ
    cy.contains('Київ, Столиця України').should('be.visible').click()

    // Чекаємо, поки URL зміниться
    cy.url().should('include', '/pohoda/kyiv').then((newUrl) => {
      // Виконуємо запит на новий URL
      cy.request(newUrl).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    const currentDate = new Date()
    const startDate = new Date()

    for (let i = 1; i <= 7; i++) {
      if (i !== 1) currentDate.setDate(startDate.getDate() + (i - 1))

      const day = currentDate.getDate()
      const month = currentDate.toLocaleString('uk-UA', { month: 'long' })
      const dayOfWeek = currentDate.toLocaleString('uk-UA', { weekday: 'long' })

      const monthGenitive = monthCases[month]

      // Intercept the request before clicking
      // cy.intercept('GET', **/pohoda/kyiv/${day}).as('dayRequest')

      // Click and verify both URL change and status code
      cy.get(`a.tkK415TH:nth-child(${i})`).click()

      // Wait for both the request and URL change
      // cy.wait('@dayRequest').its('response.statusCode').should('eq', 200)

      // cy.url().should('include', /pohoda/kyiv/${day})

      cy.get(`a.tkK415TH:nth-child(${i})`).invoke('text').should((text) => {
        text = text.toLowerCase()
        expect(text).to.include(day.toString())
        expect(text).to.include(monthGenitive.toLowerCase()) // Use genitive form of the month
        expect(text).to.include(dayOfWeek.toLowerCase())
      })
    }
  })
})
