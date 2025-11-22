# ---- Frontend (Angular) Multi-stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build --omit=dev

FROM nginx:1.27-alpine AS runtime
# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*
# Copy Angular dist (adjust path if project name changes)
COPY --from=build /app/dist/library-frontend/browser /usr/share/nginx/html
# Custom nginx config for API proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]