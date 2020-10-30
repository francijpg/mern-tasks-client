/// <reference types="cypress" />

describe("<Formularios />", () => {
  it("<Login /> - Verificar pantalla de inicio", () => {
    const titleLogin = "Iniciar Sesión";

    cy.visit("/");

    // Tipo de prueba no recomendada
    // cy.contains("h1", "Iniciar Sesión");

    // Tipo de prueba recomendada
    cy.get("[data-cy=titulo").invoke("text").should("equal", titleLogin);

    // Revisar que el formulario exista
    cy.get("[data-cy=form-login]").should("exist");

    // Revisar los 2 inputs
    cy.get("[data-cy=email-input]").should("exist");
    cy.get("[data-cy=password-input]").should("exist");

    cy.get("[data-cy=submit-login]")
      .should("exist")
      .should("have.value", titleLogin)
      .should("have.class", "btn-primario")
      .and("have.class", "btn");

    cy.get("[data-cy=nueva-cuenta]")
      .should("exist")
      .should("have.prop", "tagName")
      .should("eq", "A");

    cy.get("[data-cy=nueva-cuenta]")
      .should("have.attr", "href")
      .should("eq", "/nueva-cuenta");

    cy.visit("/nueva-cuenta");
  });

  it("<NuevaCuenta /> - Verificar componente de nueva cuenta", () => {
    cy.get("[data-cy=titulo]")
      .should("exist")
      .invoke("text")
      .should("equal", "Obtener una cuenta");

    // Validar existencia de elementos
    cy.get("[data-cy=nueva-cuenta]").should("exist");

    cy.get("[data-cy=nombre-input]").should("exist");
    cy.get("[data-cy=email-input]").should("exist");
    cy.get("[data-cy=password-input]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "password");
    cy.get("[data-cy=repetir-password-input]").should("exist");

    cy.get("[data-cy=submit-nueva-cuenta]")
      .should("exist")
      .should("have.class", "btn-primario")
      .should("have.value", "Registrarme")
      .should("not.have.value", "Crear Nueva Cuenta");

    // Validar acción de enlace
    cy.get("[data-cy=enlance-login]")
      .should("exist")
      .should("have.attr", "href")
      .should("eq", "/");

    cy.visit("/");
  });
});
