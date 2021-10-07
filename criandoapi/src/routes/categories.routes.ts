import {Router} from 'express';
import { Category } from '../model/Category';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/", (request, response)=>{
  const {name, description} = request.body;


  const category = new Category() // estanciando a class Category

  Object.assign(category, {name, description, created_at: new Date()}) // passando os valores para o objeto});

  // category.name = name;
  // category.description = description;
  // category.created_at = new Date();

 
  categories.push(category);

  return response.status(201).json(category);
});

export {categoriesRoutes};