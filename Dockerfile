FROM node:16

WORKDIR /opt/app

RUN adduser --disabled-password app

COPY . .

RUN chown -R app:app /opt/app

USER app

WORKDIR /opt/app/frontend/

RUN npm install

RUN npm run build

WORKDIR /opt/app/backend

RUN npm install

EXPOSE 3005

CMD ["npm", "run", "start-docker"]