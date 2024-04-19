import { Sequelize } from "sequelize-typescript";
import ListProductUseCase from "./list.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/model/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { OutputListProductDto } from "./list.product.dto";

describe("Integration Test - List product use case", () => {
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

	it("should list products", async () => {
		const productRepository = new ProductRepository();
		const usecase = new ListProductUseCase(productRepository);

		const product1 = ProductFactory.create("Alexa", 250);
		const product2 = ProductFactory.create("Smart TV 4K", 2900);

		await productRepository.create(product1);
		await productRepository.create(product2);

		const result = await usecase.execute({});
		const products = await productRepository.findAll();

		expect(result).toEqual(OutputMapper.toOutput(products));
	});
});

class OutputMapper {
	static toOutput(products: Product[]): OutputListProductDto {
		return {
			products: products.map((product) => ({
				id: product.id,
				name: product.name,
				price: product.price,
			})),
		};
	}
}