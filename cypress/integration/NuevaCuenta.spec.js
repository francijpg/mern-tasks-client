/// <reference types="cypress" />

describe("<NuevaCuenta />", () => {
  const alertMsg1 = "Todos los campos son obligatorios";
  const alertMsg2 = "El password debe ser de al menos 6 caracteres";
  const alertMsg3 = "Los passwords no son iguales";
  const alertMsg4 = "El usuario ya existe";

  it("<NuevaCuenta /> - Validación y Alertas", () => {
    cy.visit("/nueva-cuenta");

    cy.get("[data-cy=submit-nueva-cuenta]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", alertMsg1);

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    // Validando formulario de creación de cuenta
    cy.get("[data-cy=nombre-input]").type("Francisco");
    cy.get("[data-cy=email-input]").type("usuario@usuario.com");
    cy.get("[data-cy=password-input]").type("123");
    cy.get("[data-cy=repetir-password-input]").type("123");

    cy.get("[data-cy=submit-nueva-cuenta]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", alertMsg2);

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    cy.get("[data-cy=password-input]").clear().type("123456");
    cy.get("[data-cy=repetir-password-input]").clear().type("123455");

    cy.get("[data-cy=submit-nueva-cuenta]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", alertMsg3);

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    // Validando creación de cuenta y redireccionamiento exitoso
    cy.get("[data-cy=repetir-password-input]").clear().type("123456");
    cy.get("[data-cy=submit-nueva-cuenta]").click();
    cy.get("[data-cy=selecciona]")
      .should("exist")
      .invoke("text")
      .should("equal", "Selecciona un proyecto");

    cy.get("[data-cy=cerrar-sesion]").click();
  });

  it("<NuevaCuenta /> - Revisar usuarios duplicados", async () => {
    cy.visit("/nueva-cuenta");

    cy.get("[data-cy=nombre-input]").type("Francisco");
    cy.get("[data-cy=email-input]").type("usuario@usuario.com");
    cy.get("[data-cy=password-input]").type("123456");
    cy.get("[data-cy=repetir-password-input]").type("123456");

    cy.get("[data-cy=submit-nueva-cuenta]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", alertMsg4);

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");
  });
});
