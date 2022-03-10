const { createOrderRequest } = require("./bubble_tea_order_service");
const bubbleTeaType = require("./bubble_tea_type");
const bubbleTeaMessenger = require("./bubble_tea_messenger");
jest.mock("./bubble_tea_messenger");
jest.mock("./simple_logger");

let dummyPaymentDetails;

beforeEach(() => {
  dummyPaymentDetails = {
    name: "Some person",
    address: "123 Some Street",
    debitCard: {
      digits: "123456",
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test.each([[bubbleTeaType.MATCHAMILKTEA], [bubbleTeaType.LYCHEEICETEA]])(
  "test successful order request for bubble %p",
  (teaType) => {
    // Arrange
    const bubbleTeaRequest = {
      paymentDetails: dummyPaymentDetails,
      bubbleTea: {
        type: teaType,
      },
    };

    // Act
    const orderRequest = createOrderRequest(bubbleTeaRequest);

    // Assert
    expect(orderRequest.name).toBe(dummyPaymentDetails.name);
    expect(orderRequest.digits).toBe(dummyPaymentDetails.debitCard.digits);
    expect(
      bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail
    ).toHaveBeenCalledWith(orderRequest);
    expect(
      bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail
    ).toHaveBeenCalledTimes(1);
  }
);
