describe('Drag and Drop Test', () => {
  it('Should drag and drop a block', () => {
   
    cy.visit('http://localhost:3000/')

    const sourceCard = cy.get('#card');
    const sourceBun = cy.get('#bun');
    const targetBlock = cy.get('#constructor');

    sourceCard.trigger('dragstart');
    targetBlock.trigger('dragover').trigger('drop');
    sourceBun.trigger('dragstart');
    targetBlock.trigger('dragover').trigger('drop');

    cy.get('#orderBtn').click();        


  });
});