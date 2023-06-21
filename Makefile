user_data = '{"nome":"Teste nome","data":"16/06/2023","cpf":"111.222.333-44","telefone":"21912345678","email":"teste@gmail.com","senha":"teste"}'
login_data = '{"email":"teste@gmail.com","senha":"teste"}'
local_url = http://localhost:8000
prod_url = http://18.231.40.15:8000
url = $(local_url)

curl-create:
	 curl -X POST -d $(user_data) -H 'Content-Type: application/json' $(url)/user

curl-login:
	 curl -X POST -d $(login_data) -H 'Content-Type: application/json' $(url)/login