import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/user/user.module';
import { decodeAccessToken } from './utils/jwt.utils';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './features/user/user.model';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configruration';
import { ProductModule } from './features/product/product.module';
import { ProductSchema } from './features/product/product.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),

    MongooseModule.forRoot(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),

    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'product', schema: ProductSchema },
    ]),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      cors: { origin: true },

      context: ({ req, res }) => {
        console.log('req', req.body);

        if (!req.headers?.authorization) {
          req.user = null;
        } else {
          const accessToken = req.headers?.authorization.split(' ')[1];
          req.user = accessToken ? decodeAccessToken(accessToken) : null;
        }
        return { req, res };
      },
    }),
    UsersModule,
    ProductModule,
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
