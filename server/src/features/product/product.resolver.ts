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
    console.log('input', input);

    return await this.productService.addProduct(input);
  }

  @Mutation(() => Product)
  async editProduct(@Args('input') input: EditProductInput) {
    return await this.productService.addProduct(input);
  }

  @Mutation(() => ResMessage)
  async deleteProduct(@Args('input') input: IdInput) {
    return await this.productService.deleteProduct(input);
  }

  //   @Query(() => Product)
  //   async logout(@editProduct() context: Ctx) {
  //     return await this.productService.logout(context);
  //   }

  //   @Query(() => DecodedUser || null)
  //   async profile(@Context() context: Ctx) {
  //     console.log('context', context.req.user);

  //     if (!context.req.user) return null;

  //     const { id, username, email, roles } = context.req.user;

  //     return {
  //       id,
  //       username,
  //       email,
  //       roles,
  //     };
  //   }
}
