import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
	"John",
	new Address("Street 1", 123, "City 1", "Zipcode 1")
);

const input = {
	id: customer.id,
	name: "John Updated",
	address: {
		street: "Street Updated",
		number: 1234,
		city: "City Updated",
		zip: "Zipcode Updated"
	}
};

const MockRepository = () => {
	return {
		findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	};
}

describe("Unit test - Update customer", () => {
	it("should update a customer", async () => {
		const customerRepository = MockRepository();
		const usecase = new UpdateCustomerUseCase(customerRepository);
		const output = await usecase.execute(input);

		expect(output).toEqual(input);
	});
});