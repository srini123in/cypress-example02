FROM cypress/included:5.6.0

WORKDIR /e2e

COPY . .

RUN npm ci