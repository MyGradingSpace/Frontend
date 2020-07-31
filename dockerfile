FROM node:12.13.1 as base
RUN mkdir -p /srv/app
COPY . /srv/app
WORKDIR /srv/app
RUN npm install
RUN npm install serve --global
RUN npm run build
ENV PORT 3000
EXPOSE $PORT
CMD ["serve", "-s", "build", "-l", "3000"]