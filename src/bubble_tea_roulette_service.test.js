const getRandomBubbleTeaType = require("./bubble_tea_roulette_service");

test.each([
  [0.2, "JASMINEMILKTEA"],
  [0.6, "PEACHICETEA"],
])("should generate random bubble tea", (mockVal, tea) => {
  // Arrange
  // Stub to calls to Math.random to return specified value
  jest.spyOn(global.Math, "random").mockReturnValue(mockVal);

  // Act
  const bubbleTea = getRandomBubbleTeaType();

  // Assert
  expect(bubbleTea).toBe(tea);

  // Restore the default Math.random
  jest.spyOn(global.Math, "random").mockRestore();
});
