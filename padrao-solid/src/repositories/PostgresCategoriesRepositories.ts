import { Category } from "../model/Category";
import { ICategoriesRepository } from "./IcategoriesRepository";

class PostegresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    return;
  }
  list(): Category[] {
    return null;
  }

  create(name: string, description: string): void {
    console.log(name, description);
  }
}

export { PostegresCategoriesRepository };
