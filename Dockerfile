FROM node:20-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

RUN apt-get update && \
    apt-get install -y default-jre imagemagick graphviz ruby && \
    gem install asciidoctor-diagram

RUN dot -version

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
