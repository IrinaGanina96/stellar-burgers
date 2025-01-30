import { setCookie, deleteCookie} from '../../src/utils/cookie';

describe('Проверяем доступность приложения', function() {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.visit('http://localhost:4000');
    });

    it('Добавление ингредиентов в конструктор', () => {
      const ingridientConstructor = cy.get(`[data-cy=ingredient_constructor${1}]`);
      const ingridientConstructor2 = cy.get(`[data-cy=ingredient_constructor${2}]`);
      ingridientConstructor.contains('Добавить').click();
      ingridientConstructor2.contains('Добавить').click();
      cy.get('[data-cy=burger-constructor]').contains('Краторная булка N-200i').should('exist');
      cy.get('[data-cy=burger-constructor]').contains('Биокотлета из марсианской Магнолии').should('exist');
    });
});

describe('Тесты модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('Открытие модального окна ингредиента', () => {
    const ingridientConstructor = cy.get(`[data-cy=ingredient_constructor${1}]`);
    ingridientConstructor.click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Краторная булка N-200i').should('exist');
  });

  it('Закрытие при клике на крестик', () => {
    const ingridientConstructor = cy.get(`[data-cy=ingredient_constructor${1}]`);
    const closeModal = '[data-cy=modal-close]';
    ingridientConstructor.click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(closeModal).click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Тесты создания заказа', () => {
  beforeEach(() => {
    setCookie('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshToken');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.intercept('POST', 'api/orders', { fixture: 'order' });
    cy.visit('http://localhost:4000');
  });

  it('Оформление заказа', () => {
    const ingridientConstructor = cy.get(`[data-cy=ingredient_constructor${1}]`);
    const ingridientConstructor2 = cy.get(`[data-cy=ingredient_constructor${2}]`);
    const closeModal = '[data-cy=modal-close]';
    ingridientConstructor.contains('Добавить').click();
    ingridientConstructor2.contains('Добавить').click();

    cy.get('[data-cy=order_button]').contains('Оформить заказ').should('exist').click();
    cy.get('[data-cy=order_number]').contains('67188').should('exist');
    cy.get(closeModal).click();
    cy.get('[data-cy=order_number]').should('not.exist');

    cy.get('[data-cy=burger-constructor]').contains('Краторная булка N-200i').should('not.exist');
    cy.get('[data-cy=burger-constructor]').contains('Биокотлета из марсианской Магнолии').should('not.exist');

  });
})

afterEach(() => {
  deleteCookie('accessToken');  
  localStorage.removeItem('refreshToken');
});
