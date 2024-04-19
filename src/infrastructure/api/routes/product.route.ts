import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
	const usecase = new CreateProductUseCase(new ProductRepository());

	try {
		const productDto = {
			name: req.body.name,
			price: req.body.price
		};

		const output = await usecase.execute(productDto);

		res.status(201).send(output);
	} catch (err) {
		res.status(400).send(err);
	}
});

productRoute.get("/", async (req: Request, res: Response) => {
	const usecase = new ListProductUseCase(new ProductRepository());

	try {
		const output = await usecase.execute({});

		res.status(200).send(output);
	} catch (err) {
		res.status(400).send(err);
	}
});