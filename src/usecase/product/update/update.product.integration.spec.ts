import { Sequelize } from "sequelize-typescript";
import UpdateProductUseCase from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/model/product.model";

describe("Integration Test - Update product use case", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should update a product", async () => {
		const productRepository = new ProductRepository();
		const usecase = new UpdateProductUseCase(productRepository);

		const product = new Product("123", "Relógio", 150);

		await productRepository.create(product);

		const input = {
			id: "123",
			name: "Relógio Updated",
			price: 200
		};

		const output = {
			id: "123",
			name: "Relógio Updated",
			price: 200,
		};

		const result = await usecase.execute(input);

		expect(result).toEqual(output);
	});
});