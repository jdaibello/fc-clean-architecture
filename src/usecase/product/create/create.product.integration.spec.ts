import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/model/product.model";
import { v4 as uuid } from "uuid";

describe("Integration Test - Create product use case", () => {
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

	it("should create a product", async () => {
		const productRepository = new ProductRepository();
		const usecase = new CreateProductUseCase(productRepository);

		const input = {
			name: "Geladeira",
			price: 1999.99
		};

		const product = new Product(uuid(), input.name, input.price);

		await productRepository.create(product);

		const output = {
			id: expect.any(String),
			name: "Geladeira",
			price: 1999.99,
		};

		const result = await usecase.execute(input);

		expect(result).toEqual(output);
	});
});