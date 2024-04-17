import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street 1", 123, "City 1", "Zipcode 1");

customer.changeAddress(address);

const MockRepository = () => {
	return {
		findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn()
	};
}

describe("Unit test - find customer use case", () => {
	it("should find a customer", async () => {
		const customerRepository = MockRepository();
		const usecase = new FindCustomerUseCase(customerRepository);

		const input = {
			id: "123"
		};

		const output = {
			id: "123",
			name: "John",
			address: {
				street: "Street 1",
				city: "City 1",
				number: 123,
				zip: "Zipcode 1"
			}
		};

		const result = await usecase.execute(input);

		expect(result).toEqual(output);
	});
});