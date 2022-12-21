import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';
import { EditProductInput, ProductInput } from './product.input';
import { IdInput } from 'src/types/input.type';
import { ResMessage } from 'src/types/object.type';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('product') private productModel: Model<ProductDocument>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find({}).limit(10);
    return products || [];
  }

  async addProduct(input: ProductInput): Promise<Product> {
    console.log('input', input);

    const newProduct = await new this.productModel(input).save();
    console.log('newProduct', newProduct);

    return newProduct;
  }

  async editProduct(input: EditProductInput): Promise<Product> {
    const { id, ...rest } = input;

    const editedProduct = await this.productModel.findByIdAndUpdate(id, rest, {
      new: true,
    });
    return editedProduct;
  }

  async deleteProduct(input: IdInput): Promise<ResMessage> {
    const { id } = input;

    await this.productModel.findByIdAndDelete(id);

    return { message: 'Deleted' };
  }
}
