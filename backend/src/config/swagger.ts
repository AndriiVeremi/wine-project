import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wine Project API',
      version: '1.0.0',
      description: 'API documentation for the Wine Project',
    },
    servers: [
      {
        url: '/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // Schemas
      },
    },
    tags: [
      { name: 'Users', description: 'User management and authentication' },
      { name: 'Wineries', description: 'Winery management' },
      { name: 'Wines', description: 'Wine catalog management' },
      { name: 'Reviews', description: 'Wine reviews and ratings' },
      { name: 'Grapes', description: 'Grape varieties information' },
      { name: 'Locations', description: 'Countries and regions information' },
      { name: 'Tours', description: 'Wine tours management' },
      { name: 'AI', description: 'AI Assistant for wine recommendations' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
