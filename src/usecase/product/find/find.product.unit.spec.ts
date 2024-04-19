import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "PS5", 3500);

const MockRepository = () => {
	return {
		findById: jest.fn().mockReturnValue(Promise.resolve(product)),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn()
	};
};

describe("Unit test - find product use case", () => {
	it("should find a product", async () => {
		const productRepository = MockRepository();
		const usecase = new FindProductUseCase(productRepository);

		const input = {
			id: "123",
		};

		const output = {
			id: "123",
			name: "PS5",
			price: 3500,
		};

		const result = await usecase.execute(input);

		expect(result).toEqual(output);
	});

	it("should not find a product", async () => {
		const productRepository = MockRepository();

		productRepository.findById.mockImplementation(() => {
			throw new Error("Product not found");
		});

		const usecase = new FindProductUseCase(productRepository);

		const input = {
			id: "123",
		};

		expect(usecase.execute(input)).rejects.toThrow("Product not found");
	});
});
