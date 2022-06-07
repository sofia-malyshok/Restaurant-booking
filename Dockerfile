FROM node:16

WORKDIR /opt/app

RUN adduser --disabled-password app

WORKDIR /opt/app/frontend/

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

WORKDIR /opt/app/backend

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

RUN chown -R app:app /opt/app

USER app

EXPOSE 3005

ENV PORT=3005
ENV MONGODB_URL=mongodb+srv://rozliczajka:SoniaNazar2022@cluster0.vlhed.mongodb.net/restaurants-booking?retryWrites=true&w=majority
ENV FACEBOOK_API_KEY=534115848294588
ENV FACEBOOK_API_SECRET=06912f8600d7ac172632d51ef14e951f
ENV FACEBOOK_CALLBACK_URL=http://localhost:3005/api/auth/facebook/callback
ENV SECRET_KEY=my-32-character-ultra-secure-and-ultra-long-secret

CMD ["npm", "run", "start-docker"]