FROM node:18-alpine
WORKDIR /mytop-app
ADD package.json package.json
RUN npm install --legacy-peer-deps
ADD . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000