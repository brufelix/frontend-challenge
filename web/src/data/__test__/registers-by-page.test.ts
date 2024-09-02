import { registersByPage } from '../registers-by-page'; // substitua './seuArquivo' pelo caminho correto do seu arquivo

describe('registersByPage', () => {
  it('should have the correct number of elements', () => {
    expect(registersByPage).toHaveLength(3);
  });

  it('should contain the correct values and labels', () => {
    const expectedValues = [
      { value: 5, label: 5 },
      { value: 10, label: 10 },
      { value: 20, label: 20 },
    ];

    expect(registersByPage).toEqual(expectedValues);
  });

  it('should have unique values and labels', () => {
    const uniqueCheck = new Set(registersByPage.map(register => register.value)).size === registersByPage.length;
    expect(uniqueCheck).toBe(true);
  });
});
