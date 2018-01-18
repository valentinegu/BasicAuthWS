# BasicAuthWS
Basic Auth SOAP Web Service


#### `Install and Run `
```shell
git clone https://github.com/valentinegu/BasicAuthWS.git
cd BasicAuthWS
docker build -t basic-auth-ws .
docker run -dit -p 80:8001 --name bws --restart on-failure basic-auth-ws 
```
