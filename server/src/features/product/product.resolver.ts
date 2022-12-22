import { EditProductInput, ProductInput } from './product.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { IdInput } from 'src/types/input.type';
import { ResMessage } from 'src/types/object.type';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Mutation(() => Product)
  async addProduct(@Args('input') input: ProductInput) {
    return await this.productService.addProduct(input);
  }

  @Mutation(() => ResMessage)
  async editProduct(@Args('input') input: EditProductInput) {
    return await this.productService.editProduct(input);
  }

  @Mutation(() => ResMessage)
  async deleteProduct(@Args('input') input: IdInput) {
    return await this.productService.deleteProduct(input);
  }

  @Mutation(() => ResMessage)
  async changeActiveProduct(@Args('input') input: IdInput) {
    return await this.productService.changeActiveProduct(input);
  }
}
