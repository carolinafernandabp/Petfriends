FROM beevelop/ionic:latest 
WORKDIR /app
COPY package*.json /app/
COPY ./ /app/
