# --- Étape 1 : compilation Angular ---
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration production

# --- Étape 2 : serveur nginx ---
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/poseidon-ng/browser /usr/share/nginx/html
EXPOSE 80