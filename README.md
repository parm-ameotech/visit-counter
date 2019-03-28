# visit-counter

How to run this app

Server
	It contain django rest framework endpoints. To Run Plz follow steps below
		1. create a virtual environment using "virtualenv siteprpenv"
		2. activate this environment 
		3. cd to ..\server folder and run pip install -r requirements.txt
		4. python manage.py runserver. It will host api at http://127.0.0.1:8000

Client
	It contain front-end code for app that has been built using angular To Run Plz follow steps below
		1. cd to ..\client folder
		2. run pip install (You need npm and node installed before running it)
		3. now run ng serve it will host app on http://localhost:4200
		
Browse
	
	http://localhost:4200/?referral_site=abs.com&referral_user=john
	You will see user information with country fetch using geoip2 and ip using request.
	
	http://localhost:4200/admin
	You will see the grouped output by country.

