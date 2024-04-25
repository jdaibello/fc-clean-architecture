import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E tests for customer", () => {
	beforeEach(async () => {
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a customer", async () => {
		const response = await request(app)
			.post("/customer")
			.send({
				name: "John",
				address: {
					street: "Main Street",
					city: "New York",
					number: 123,
					zip: "12345"
				}
			});

			expect(response.status).toBe(201);
			expect(response.body.name).toBe("John");
			expect(response.body.address.street).toBe("Main Street");
			expect(response.body.address.city).toBe("New York");
			expect(response.body.address.number).toBe(123);
			expect(response.body.address.zip).toBe("12345");
	});

	it("should not create a customer", async () => {
		const response = await request(app)
			.post("/customer")
			.send({
				name: "John"
			});

		expect(response.status).toBe(400);
	});

	it("should list all customers", async () => {
		const customer1 = await request(app)
			.post("/customer")
			.send({
				name: "John",
				address: {
					street: "Main Street",
					city: "New York",
					number: 123,
					zip: "12345",
				},
			});

		expect(customer1.status).toBe(201);

		const customer2 = await request(app)
			.post("/customer")
			.send({
				name: "Jane",
				address: {
					street: "Second Street",
					city: "New York",
					number: 1234,
					zip: "12346",
				},
			});

		expect(customer2.status).toBe(201);

		const response = await request(app).get("/customer").send();

		expect(response.status).toBe(200);
		expect(response.body.customers.length).toBe(2);
		expect(response.body.customers[0].name).toBe("John");
		expect(response.body.customers[0].address.street).toBe("Main Street");
		expect(response.body.customers[1].name).toBe("Jane");
		expect(response.body.customers[1].address.street).toBe("Second Street");

		const listResponseXML = await request(app)
		.get("/customer")
		.set("Accept", "application/xml")
		.send();

		expect(listResponseXML.status).toBe(200);
		expect(listResponseXML.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
		expect(listResponseXML.text).toContain("<customers>");
		expect(listResponseXML.text).toContain("<customer>");
		expect(listResponseXML.text).toContain("<name>John</name>");
		expect(listResponseXML.text).toContain("<address>");
		expect(listResponseXML.text).toContain("<street>Main Street</street>");
		expect(listResponseXML.text).toContain("<city>New York</city>");
		expect(listResponseXML.text).toContain("<name>Jane</name>");
		expect(listResponseXML.text).toContain("<street>Second Street</street>");
		expect(listResponseXML.text).toContain("</address>");
		expect(listResponseXML.text).toContain("</customer>");
		expect(listResponseXML.text).toContain("</customers>");
	});
});