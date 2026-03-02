FROM node:25-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN touch node_modules/@myriaddreamin/typst.react/dist/typst.css
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

