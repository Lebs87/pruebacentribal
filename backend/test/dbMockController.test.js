const dbMockControlle = require('./dbMockcontroller');

describe('Pruebas para las solicitudes GET', () => {
  test('Obtiene la lista de artículos', async () => {
    const articles = dbMockControlle.getArticlesFromDB();
    
    expect(articles).toHaveLength(5); 
    expect(articles[0]).toHaveProperty('id', 11);
  });

});
