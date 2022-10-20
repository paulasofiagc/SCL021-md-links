const {
  routeExists,
  checkAbsolutePath,
  transformToAbsolute,
  isDirectory,
} = require("../src/functionbase.js");
describe('test in routeExists', () => {
  it('should return "true" for README.md', () => {
    //Arreglo
      const route = 'README.md'

      //acto
      const result = routeExists(route);
      
      //Assert
      expect(result).toBe(true);
  });
  it('should return "false" for README.md', () => {
      const route = 'FAKEFILE.md'

      const result = routeExists(route);

      expect(result).toBe(false);
  });
});
describe('test in absolutePath', () => {
  it('should return "true" for "E:\Desktop\SCL021-md-links\README.md"', () => {
    const route = "E:\\Desktop\\SCL021-md-links\\README.md"

    const result = checkAbsolutePath(route);

    expect(result).toBe(true);
  });

  it('should return "false" for README.md', () => {
    const route = 'README.md'

    const result = checkAbsolutePath(route);

    expect(result).toBe(false);
  });
});
describe('test in transformToAbsolute', () => {
  it('should return "E:\\Desktop\\SCL021-md-links\\README.md" for README.md', () => {
      const route = 'README.md'

      const result = transformToAbsolute(route);

      expect(result).toBe("E:\\Desktop\\SCL021-md-links\\README.md");
  });
  it('should return "E:\\Desktop\\SCL021-md-links\\package.json" for package.json', () => {
    const route = 'package.json'

    const result = transformToAbsolute(route);

    expect(result).toBe("E:\\Desktop\\SCL021-md-links\\package.json");
});
});