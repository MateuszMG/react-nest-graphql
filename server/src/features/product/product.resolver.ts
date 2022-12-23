import { EditProductInput, ProductInput } from './product.input';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { IdInput } from 'src/types/input.type';
import { ResMessage } from 'src/types/object.type';
import { pubSub, triggerNames } from 'src/config/PubSub';

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

  @Query(() => Product)
  async getHighlightedProduct() {
    return await this.productService.getHighlightedProduct();
  }

  @Subscription(() => Product, {
    name: triggerNames.highlightedProductUpdated,
    defaultValue: null,
    nullable: true,
  })
  async highlightedProductUpdated() {
    return pubSub.asyncIterator(triggerNames.highlightedProductUpdated);
  }
}
