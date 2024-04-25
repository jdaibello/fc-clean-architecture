import Notification from "./notification";

describe("Unit tests for notifications", () => {
	it("should create customer errors", () => {
		const notification = new Notification();

		const error = {
			message: "error message",
			context: "customer"
		};

		notification.addError(error);

		expect(notification.messages("customer")).toBe("customer: error message");

		const error2 = {
			message: "error message 2",
			context: "customer"
		};

		notification.addError(error2);

		expect(notification.messages("customer")).toBe("customer: error message, customer: error message 2");

		const error3 = {
			message: "error message 3",
			context: "order",
		};

		notification.addError(error3);

		expect(notification.messages()).toBe(
			"customer: error message, customer: error message 2, order: error message 3"
		);
	});

	it("should check if customer notification has at least one error", () => {
		const notification = new Notification();

		const error ={
			context: "customer",
			message: "ID is required"
		};

		notification.addError(error);

		expect(notification.hasErrors()).toBe(true);
	});

	it("should get all customer error props", () => {
		const notification = new Notification();

		const error = {
			context: "customer",
			message: "ID is required",
		};

		notification.addError(error);

		expect(notification.getErrors()).toEqual([error]);
	});

	it("should create product errors", () => {
		const notification = new Notification();

		const error = {
			message: "error message",
			context: "product",
		};

		notification.addError(error);

		expect(notification.messages("product")).toBe("product: error message");

		const error2 = {
			message: "error message 2",
			context: "product",
		};

		notification.addError(error2);

		expect(notification.messages("product")).toBe(
			"product: error message, product: error message 2"
		);

		const error3 = {
			message: "error message 3",
			context: "order",
		};

		notification.addError(error3);

		expect(notification.messages()).toBe(
			"product: error message, product: error message 2, order: error message 3"
		);
	});

	it("should check if product notification has at least one error", () => {
		const notification = new Notification();

		const error = {
			context: "product",
			message: "ID is required",
		};

		notification.addError(error);

		expect(notification.hasErrors()).toBe(true);
	});

	it("should get all product error props", () => {
		const notification = new Notification();

		const error = {
			context: "product",
			message: "ID is required",
		};

		notification.addError(error);

		expect(notification.getErrors()).toEqual([error]);
	});
});