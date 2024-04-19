import CreateProductUseCase from "./create.product.usecase";

let input: any = {};

const MockRepository = () => {
	return {
		findById: jest.fn(),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn()
	};
}

describe("Unit test - create product use case", () => {
	beforeEach(() => {
		input = {
			name: "Geladeira",
			price: 1999.99,
		};
	});

	it("should create a product", async () => {
		const productRepository = MockRepository();
		const usecase = new CreateProductUseCase(productRepository);
		const output = await usecase.execute(input);

		expect(output).toEqual({
			id: expect.any(String),
			name: input.name,
			price: input.price
		});
	});

	it("should thrown an error when name is missing", async () => {
		const productRepository = MockRepository();
		const usecase = new CreateProductUseCase(productRepository);

		input.name = "";

		await expect(usecase.execute(input)).rejects.toThrow("Name is required");
	});

	it("should thrown an error when price is not greather than 0", async () => {
		const productRepository = MockRepository();
		const usecase = new CreateProductUseCase(productRepository);

		input.price = 0;

		await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than 0");
	});
});