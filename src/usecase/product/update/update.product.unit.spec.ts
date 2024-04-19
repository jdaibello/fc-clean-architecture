import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("Relógio", 150);

const input = {
	id: product.id,
	name: "Relógio Updated",
	price: 200
};

const MockRepository = () => {
	return {
		findById: jest.fn().mockReturnValue(Promise.resolve(product)),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	};
}

describe("Unit test - Update product", () => {
	it("should update a product", async () => {
		const productRepository = MockRepository();
		const usecase = new UpdateProductUseCase(productRepository);
		const output = await usecase.execute(input);

		expect(output).toEqual(input);
	});
});