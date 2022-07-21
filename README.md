# El-masturbot

Hola este bot fue desarrolado por mamar al daniel
![image](https://user-images.githubusercontent.com/82906813/180109166-768dcb7c-5621-4107-8eb3-d5821dc6d9a0.png)


npm init -y && npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH
Escribe esto en donde pone shell
![image](https://user-images.githubusercontent.com/82906813/180109200-a722ce9a-1dd3-463d-934e-11f854d5a0a2.png)

Luego escribiras npm i en (shell tambien)



El primer paso es meterte en....
https://discord.com/developers/applications para crear tu bot poniendole un nombre en opciones de bot, pondras el token que es la contraseña del bot
![image](https://user-images.githubusercontent.com/82906813/180109228-f59463df-7d15-41fc-8c03-44926f525852.png)


Segundo paso es irte en secrets
Y escribit token ![image](https://user-images.githubusercontent.com/82906813/180110053-52df6832-de09-44c5-b974-f5e91535fa14.png)
Abajo pondras el token que te fue proporcionado 
![image](https://user-images.githubusercontent.com/82906813/180110116-68a77acc-8a76-4271-9f93-7bbb4f400acb.png)




El tercer paso es meterte en...
https://cloud.mongodb.com/v2#/org/62cdf8dea7cae11aeaff666f/projects Aqui estara el servidor
![image](https://user-images.githubusercontent.com/82906813/180109428-157963dc-8c64-4147-a8ea-99bd2f41ade9.png)


El tercer paso es poner tu mongodb y poner el link y contraseña que proporcionaras (tambien en secrets)
Ejemplo el mio es mongodb+srv://Discordbot-NathanEnc:<password>@cluster0.eqlcc.mongodb.net/?retryWrites=true&w=majority
Aqui solo se quitaria los <> y pondras tu password

(tambien en secrets)
En key pondras mongodb
![image](https://user-images.githubusercontent.com/82906813/180109677-fd3f8473-80df-4a4a-ae41-05e634168860.png)

Y para que todo funcione 
Tendras que ir en packego.json y en la parte de scripts
![image](https://user-images.githubusercontent.com/82906813/180110325-8abc1048-4dd7-4545-9c05-f98636dc698b.png)
Abajo de test poner     
"start": "node ."
