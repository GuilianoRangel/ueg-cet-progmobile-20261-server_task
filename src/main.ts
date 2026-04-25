import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação Global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos não definidos no DTO
      forbidNonWhitelisted: true, // Erro se enviar campos não definidos
      transform: true, // Converte tipos automaticamente
    }),
  );

  // Configuração Swagger
  const config = new DocumentBuilder()
    .setTitle('Gestão de Tarefas API')
    .setDescription(
      'API simples para gestão de tarefas com Clean Code e SRP. ' +
      '[Clique aqui para ver a especificação JSON](/api-json)',
    )
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Exportação do JSON da especificação (Clean Code: Mantendo a infra de doc centralizada)
  const fs = require('fs');
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplicação rodando em: ${await app.getUrl()}`);
  console.log(`Swagger disponível em: ${await app.getUrl()}/api`);
  console.log(`Especificação JSON exportada para: ./swagger-spec.json`);
  console.log(`Especificação JSON também disponível em: ${await app.getUrl()}/api-json`);
}
bootstrap();
