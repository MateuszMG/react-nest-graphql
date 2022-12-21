import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString, Min, MinLength } from 'class-validator';

@InputType()
export class ProductInput {
  @Field() @IsString() @MinLength(4) title: string;
  @Field() @IsString() @MinLength(4) description: string;
  @Field() @IsString() @MinLength(4) image: string;
  @Field() @IsNumber() @Min(1) price: number;
  @Field() @IsNumber() @Min(1) quantity: number;
  @Field() @IsBoolean() active: boolean;
}

@InputType()
export class EditProductInput extends ProductInput {
  @Field() @IsString() @MinLength(4) id: string;
}

// @InputType()
// export class GetProductInput  {
//   @Field() limit: number;
// }
