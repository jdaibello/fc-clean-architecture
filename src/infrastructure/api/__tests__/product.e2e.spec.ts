import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E tests for product", () => {
	beforeEach(async () => {
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a product", async () => {
		const response = await request(app)
			.post("/product")
			.send({
				name: "PS5",
				price: 3500
			});

		expect(response.status).toBe(201);
		expect(response.body.name).toBe("PS5");
		expect(response.body.price).toBe(3500);
	});

	it("should not create a product", async () => {
		const response = await request(app).post("/product").send({
			name: "PS5",
		});

		expect(response.status).toBe(400);
	});

	it("should list all products", async () => {
		const product1 = await request(app)
			.post("/product")
			.send({
				name: "PS5",
				price: 3500
			});

		expect(product1.status).toBe(201);

		const product2 = await request(app)
			.post("/product")
			.send({
				name: "Smart TV 4K",
				price: 2500
			});

		expect(product2.status).toBe(201);

		const response = await request(app).get("/product").send();

		expect(response.status).toBe(200);
		expect(response.body.products.length).toBe(2);
		expect(response.body.products[0].name).toBe("PS5");
		expect(response.body.products[0].price).toBe(3500);
		expect(response.body.products[1].name).toBe("Smart TV 4K");
		expect(response.body.products[1].price).toBe(2500);
	});
});
