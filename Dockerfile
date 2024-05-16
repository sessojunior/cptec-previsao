# Use uma imagem base leve, como o nginx
FROM nginx:alpine

# Remova o arquivo padrão do site
RUN rm -rf /usr/share/nginx/html/*

# Copie o arquivo HTML estático para o diretório padrão do site
COPY . /usr/share/nginx/html/

# Exponha a porta 80 para o tráfego da web
EXPOSE 80

# Comando para iniciar o servidor nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]