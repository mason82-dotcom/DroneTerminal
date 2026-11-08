FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --omit=dev

# Bundle app source
COPY . .

RUN rm -rf dist
RUN mkdir -p dist
RUN cp -R public dist/public
RUN mkdir -p dist/mail
RUN cp -R src/mail/mail_templates dist/mail/mail_templates
RUN cp -R src/mail/mail_templates_configurations dist/mail/mail_templates_configurations

RUN npx @redocly/cli bundle public@latest -o bundled.yaml
RUN npx @redocly/cli build-docs bundled.yaml
RUN mv redoc-static.html dist/public/docs.html

RUN npx tsc --build --force --verbose

RUN echo build done

CMD [ "node", "dist/launch.js" ]
