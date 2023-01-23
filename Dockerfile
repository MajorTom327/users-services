# base node image
FROM node:16-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /app

ADD package.json .npmrc ./
RUN npm install --production=false

FROM base as development
WORKDIR /app
ADD package.json .npmrc ./
RUN npm install
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN npx prisma generate

# Setup production node_modules
FROM base as production-deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json .npmrc ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=production-deps /app/package.json /app/package.json
COPY --from=build /app/dist /app/dist
COPY --from=build /app/prisma /app/prisma
RUN npx prisma generate

CMD ["npm", "start"]
