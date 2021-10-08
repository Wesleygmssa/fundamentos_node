import { CategoriesRepository } from "../src/repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/***
 * [x] - Definir o tipo de retorno
 * [x] - Alterar o retorno de erro
 * [x] - Acessar o respositorio
 */

class CreateCategoryService {
  private categoriesRepository: CategoriesRepository;

  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  //Hacker do java script
  // constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ description, name }: IRequest) {
    // const categoriesRepository = new CategoriesRepository();
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
      // return response.status(400).json({ error: "Category already exists" });
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
