# fastify_image_crud

- Avatar image input component with VueJS, Inertia, and Tailwind CSS
- https://www.youtube.com/playlist?list=PLUMh5Fzy8HsluM8gWklbZMEmjpwt8HQdU

- https://vuetifyjs.com/en/components/avatars/

- https://medium.com/free-code-camp/how-to-build-a-flexible-image-uploader-component-using-vue-js-2-0-5ee7fc77516
- https://medium.com/@davidkasumovfrontend/file-uploading-using-nestjs-fastify-64703cd83d02
- https://github.com/fastify/fastify-multipart

- https://mp.weixin.qq.com/s/enD6Q1QRbLVE9LCGWFXquw
## jwt密钥

```bash
# 对称加密
openssl rand -base64 32 
# 非对称加密
openssl genrsa -out private.key 4096 
hmod 600 private.key
openssl rsa -in private.key -pubout -out public.key
```

## drizzle-orm
```bash
./node_modules/.bin/drizzle-kit --version
./node_modules/.bin/drizzle-kit --help
# ./node_modules/.bin/drizzle-kit init
./node_modules/.bin/drizzle-kit generate --help
```
```