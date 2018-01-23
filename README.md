# BasicAuthWS
Basic Authentication SOAP Web Service, uses NodeJS SOAP and HTTP modules

WSDL file can be reached via <b>'/auth?wsld'</b>
two methods are supprted :

#### 1. authenticate user+pass by sending them via SOAP like so:
  ```
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:auth="http://LOCALHOST:8000/auth">
     <soapenv:Header/>
     <soapenv:Body>
        <auth:auth>
           <name>user</name>
           <pass>pass</pass>
        </auth:auth>
     </soapenv:Body>
  </soapenv:Envelope>
  ```
 #### 2.Check validety of an OTP ( at the moment random 6 character string ) like so:
 
  ```
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:auth="http://LOCALHOST:8000/auth">
   <soapenv:Header/>
   <soapenv:Body>
      <auth:otp>
         <token> STRING GOES HERE </token>
         <otp> STRING GOES HERE </otp>
      </auth:otp>
   </soapenv:Body>
  </soapenv:Envelope>
  ```

For now users are saved by text file within "users" folder, the content is the password :)


#### `Install and Run `
```shell
git clone https://github.com/valentinegu/BasicAuthWS.git
cd BasicAuthWS
docker build -t basic-auth-ws .
docker run -dit -p 80:8080 --name baws --env extIP=<EXTERNAL IP ADDRESS> --restart on-failure basic-auth-ws 
```

#### `Get From DockerHun`
```shell
docker pull valentineg/basic-auth-ws
docker run -dit -p 80:8080 --name baws --env extIP=<EXTERNAL IP ADDRESS> --restart on-failure basic-auth-ws
```

#### `Peek under the hood :)`
```shell
#Login to the container
docker exec -it baw /bin/sh

#Getting the LOGS
docker logs -f baws
```

