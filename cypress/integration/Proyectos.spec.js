/// <reference types="cypress" />

describe("Administrador", () => {
  it("<Login /> - Administración", () => {
    cy.visit("/");

    // Llenar el formulario
    cy.get("[data-cy=email-input]").clear().type("usuario@usuario.com");
    cy.get("[data-cy=password-input]").clear().type("123456");
    cy.get("[data-cy=submit-login]").click();
  });

  it("<Proyectos /> - Validar Proyectos", () => {
    cy.get("[data-cy=boton-nuevo-proyecto]").click();
    cy.get("[data-cy=submit-nuevo-proyecto]").click();

    // Validación
    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "El nombre del Proyecto es obligatorio");

    cy.get("[data-cy=alerta]").should("have.class", "mensaje error");
  });

  it("<Proyectos /> - Creación de Proyectos", () => {
    cy.get("[data-cy=input-nuevo-proyecto]").type("Tienda Virtual");
    cy.get("[data-cy=submit-nuevo-proyecto]").click();

    // Seleccionar el proyecto
    cy.get("[data-cy=listado-proyectos] li:nth-child(1) button").click();
  });

  it("<Proyectos /> - Validación y Creación", () => {
    cy.get("[data-cy=submit-tarea]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "El nombre de la tarea es obligatorio");

    cy.get("[data-cy=alerta]").should("have.class", "mensaje error");

    // Creación de tareas
    cy.get("[data-cy=input-tarea]").type("Definir Diseño");
    cy.get("[data-cy=submit-tarea]").click();

    cy.get("[data-cy=input-tarea]").type("Definir Tipografía");
    cy.get("[data-cy=submit-tarea]").click();

    cy.get("[data-cy=input-tarea]").type("Definir Colores");
    cy.get("[data-cy=submit-tarea]").click();
  });

  it("<Tarea /> - Completar, Descompletar, Editar y Eliminar", () => {
    // Selecciona la primera tarea y la marca como completa
    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=tarea-incompleta]").click();
    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=tarea-completa]").should(
      "have.class",
      "completo"
    );

    // Selecciona la primera tarea y la desmarca como completa
    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=tarea-completa]").click();
    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=tarea-incompleta]").should(
      "have.class",
      "incompleto"
    );

    // // Editar tarea
    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=btn-editar]").click();

    cy.get("[data-cy=input-tarea]").clear().type("TAREA ACTUALIZADA");
    cy.get("[data-cy=submit-tarea]").click();

    // Eliminar tarea
    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=btn-eliminar]").click();
    cy.get("[data-cy=tarea]:nth-child(1)")
      .invoke("text")
      .should("not.equal", "TAREA ACTUALIZADA");
  });
});
