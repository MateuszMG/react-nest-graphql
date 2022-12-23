import { EditProductInput, ProductInput } from './product.input';
import { IdInput } from 'src/types/input.type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';
import { pubSub, triggerNames } from 'src/config/PubSub';
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

  async editProduct(input: EditProductInput): Promise<ResMessage> {
    const { id, ...rest } = input;

    await this.productModel.findByIdAndUpdate(id, rest, { new: true });

    return { message: 'Updated' };
  }

  async deleteProduct(input: IdInput): Promise<ResMessage> {
    const { id } = input;

    await this.productModel.findByIdAndDelete(id);

    return { message: 'Deleted' };
  }

  async changeActiveProduct(input: IdInput): Promise<ResMessage> {
    const { id } = input;

    const product = await this.productModel.findById(id);
    await this.productModel.findByIdAndUpdate(id, { active: !product.active });

    return { message: 'Changed' };
  }

  async getHighlightedProduct(): Promise<Product> {
    const randomProduct = async () => {
      const products = await this.productModel.find({}).limit(50);

      if (products?.length)
        return products[(Math.random() * products.length).toFixed()];

      const defaultProduct: ProductInput = {
        title: `title -- ${Date.now()}`,
        description: `description -- ${Date.now()}`,
        image: `image -- ${Date.now()}`,
        price: +Date.now().toString().slice(-4),
        quantity: +Date.now().toString().slice(-4),
        active: true,
      };

      return await this.addProduct(defaultProduct);
    };

    setTimeout(() => {
      this.getHighlightedProduct();
      pubSub.publish(triggerNames.highlightedProductUpdated, {
        highlightedProductUpdated: randomProduct(),
      });
    }, 5000);

    return randomProduct();
  }
}
