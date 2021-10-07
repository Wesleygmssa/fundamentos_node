import { Category } from "../model/Category";

// DTO => Data Transfer Object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository{
  private categories: Category[];

  constructor(){
    this.categories = []
  }

  create({name, description}: ICreateCategoryDTO): void{
    const category = new Category() // estanciando a class Category


     // category.name = name;
    // category.description = description;
    // category.created_at = new Date();

    Object.assign(category, {
        name, 
        description, 
        created_at: new Date()
      }) // passando os valores para o objeto});

      this.categories.push(category);

  }
}

export {CategoriesRepository}