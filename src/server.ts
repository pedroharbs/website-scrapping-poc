import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { z } from "zod";
import fs from "fs";
import path from "path";
import fastifyStatic from '@fastify/static';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Register fastify-static plugin for serving static files
// app.register(fastifyStatic, {
//   root: path.join(__dirname, "../output_sites"),
//   prefix: '/static/', // Prefix for serving static files
// });

// Route to serve index.html by default
app.register(async (app) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:website",
    {
      schema: {
        params: z.object({
          website: z.string(),
        }),
        response: {
          200: z.any(),
        },
      },
    },
    async (request, reply) => {
      const { website } = request.params;
      const websitePath = path.join(__dirname, "../output_sites", website);

      if (!fs.existsSync(websitePath)) {
        return reply.status(404).send("Website not found");
      }

      const indexPath = path.join(websitePath, "index.html");
      if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, "utf8");

        return reply.status(200).type('text/html').send(indexContent);
      } else {
        return reply.status(404).send("Website exists but index.html not found");
      }
    }
  );

  // Serve static files within website directory
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:website/*",
    {
      schema: {
        params: z.object({
          website: z.string(),
          '*': z.string(), // Add '*' property to the params object
        }),
        response: {
          200: z.any(),
        },
      },
    },
    async (request, reply) => {
      const { website, '*' : filePath } = request.params; // Destructure the '*' property
      const websitePath = path.join(__dirname, "../output_sites", website, filePath);

      if (!fs.existsSync(websitePath)) {
        return reply.status(404).send("File not found");
      }

      const fileContent = fs.readFileSync(websitePath);
      const fileType = path.extname(websitePath);

      switch (fileType) {
        case '.html':
          reply.type('text/html');
          break;
        case '.css':
          reply.type('text/css');
          break;
        case '.js':
          reply.type('application/javascript');
          break;
        case '.png':
          reply.type('image/png');
          break;
        case '.jpg':
        case '.jpeg':
          reply.type('image/jpeg');
          break;
        case '.gif':
          reply.type('image/gif');
          break;
        // Add more MIME types as needed
        default:
          reply.type('application/octet-stream');
      }

      return reply.send(fileContent);
    }
  );
});

const host = '0.0.0.0';
const port = 9005;
app.listen({ host, port }).then(() => {
  console.log(`HTTP Server running at http://${host}:${port} !`);
});
