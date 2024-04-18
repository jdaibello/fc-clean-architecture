import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
	name: "John",
	address: {
		street: "Street 1",
		number: 123,
		city: "City 1",
		zip: "Zipcode 1"
	}
};

const MockRepository = () => {
	return {
		findById: jest.fn(),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn()
	};
}

describe("Unit test - create customer use case", () => {
	it("should create a customer", async () => {
		const customerRepository = MockRepository();
		const usecase = new CreateCustomerUseCase(customerRepository);
		const output = await usecase.execute(input);

		expect(output).toEqual({
			id: expect.any(String),
			name: input.name,
			address: {
				street: input.address.street,
				number: input.address.number,
				city: input.address.city,
				zip: input.address.zip
			}
		});
	});

	it("shold thrown an error when name is missing", async () => {
		const customerRepository = MockRepository();
		const usecase = new CreateCustomerUseCase(customerRepository);

		input.name = "";

		await expect(usecase.execute(input)).rejects.toThrow("Name is required");
	});

	it("shold thrown an error when street is missing", async () => {
		const customerRepository = MockRepository();
		const usecase = new CreateCustomerUseCase(customerRepository);

		input.address.street = "";

		await expect(usecase.execute(input)).rejects.toThrow("Street is required");
	});
});