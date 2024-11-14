import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({});
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const errorsForResponse: {
          message: string | undefined;
          field: string;
        }[] = [];

        errors.forEach((e: ValidationError) => {
          const constraintsKeys = Object.keys(e.constraints || {}) as string[];
          if (!isNil(e.constraints)) {
            constraintsKeys.forEach((key) => {
              errorsForResponse.push({
                message: e.constraints![key],
                field: e.property,
              });
            });
          }
        });

        throw new BadRequestException(errorsForResponse);
      },
    }),
  );

  await app.listen(9000);

}
bootstrap();
