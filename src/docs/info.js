export const info = {
	definition: {
	  openapi: "3.0.3",
	  info: {
		title: "API Ecommerce Toys",
		version: "1.0.0",
		description:
		  "Documentacion API Ecommerce Toys realizada en el curso de Backend - Coderhouse",
		//     termsOfService: "http://swagger.io/terms/",
		//     contact:
		//       "apiteam@swagger.io",
		//     license:
		//       name: Apache 2.0
		//       url: http://www.apache.org/licenses/LICENSE-2.0.html
		//     version: 1.0.11
		//   externalDocs:
		//     description: Find out more about Swagger
		//     url: http://swagger.io
	  },
	  servers: [
		{
		  url: "http://localhost:8080",
		},
		// {
		//     url: 'http://localhost:8080'
		// }
	  ],
	},
	apis: ["./src/docs/*.yml"],
  };