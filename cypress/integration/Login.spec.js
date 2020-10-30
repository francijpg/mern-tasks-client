/// <reference types="cypress" />

describe("<Login /> - ", () => {
  const alertMsg1 = "El usuario no existe"; //"Todos los campos son obligatorios";
  const alertMsg2 = "El usuario no existe";
  const alertMsg3 = "Password Incorrecto";

  it("<Login /> - Validación, Alertas y Autenticar Usuario", () => {
    cy.visit("/");

    cy.get("[data-cy=submit-login]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", alertMsg1);

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    // Probar con un usuario que no existe
    cy.get("[data-cy=email-input]").type("email@email.com");
    cy.get("[data-cy=password-input]").type("123");

    cy.get("[data-cy=submit-login]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", alertMsg2);

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    // Probando un password incorrecto
    cy.get("[data-cy=email-input]").clear().type("usuario@usuario.com");
    cy.get("[data-cy=password-input]").clear().type("123");

    cy.get("[data-cy=submit-login]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", alertMsg3);

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    // Autenticar usuario
    cy.get("[data-cy=email-input]").clear().type("usuario@usuario.com");
    cy.get("[data-cy=password-input]").clear().type("123456");
    cy.get("[data-cy=submit-login]").click();

    // Desde el dashboard
    cy.get("[data-cy=selecciona]")
      .should("exist")
      .invoke("text")
      .should("equal", "Selecciona un proyecto");

    cy.get("[data-cy=cerrar-sesion]").click();
  });
});
