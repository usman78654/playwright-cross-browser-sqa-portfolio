FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /work
COPY package*.json ./
RUN npm ci --include=dev
COPY application-under-test/package*.json ./application-under-test/
RUN npm --prefix application-under-test ci
COPY . .

ENV CI=true
CMD ["npm", "test"]
