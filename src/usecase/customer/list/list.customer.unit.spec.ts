import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
	"John Doe",
	new Address("Street 1", 123, "City 1", "Zipcode 1")
);

const customer2 = CustomerFactory.createWithAddress(
	"Jane Doe",
	new Address("Street 2", 1234, "City 2", "Zipcode 2")
);

const MockRepository = () => {
	return {
		findById: jest.fn(),
		findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
		create: jest.fn(),
		update: jest.fn()
	};
};

describe("Unit test - List customers", () => {
	it("should list customers", async () => {
		const customerRepository = MockRepository();
		const usecase = new ListCustomerUseCase(customerRepository);
		const output = await usecase.execute({});

		expect(output.customers.length).toBe(2);
		expect(output.customers[0].id).toEqual(customer1.id);
		expect(output.customers[0].name).toEqual(customer1.name);
		expect(output.customers[0].address.street).toEqual(customer1.address.street);
		expect(output.customers[1].id).toEqual(customer2.id);
		expect(output.customers[1].name).toEqual(customer2.name);
		expect(output.customers[1].address.street).toEqual(customer2.address.street);
	});
});