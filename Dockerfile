FROM nginx:1.17.1-alpine

# Copy the ./dist/time-picker content into nginx web file
COPY ./dist/time-picker /usr/share/nginx/html

# Open port 80 and put to 8080
EXPOSE 80
