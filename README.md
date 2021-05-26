# AnomalyDetectionWebAPP

1. The Web Application allows the user to run anomaly detection algorythms of choice(either regression based or hybrid) on given csv files(one of normal data and another one to test for anomalies) while displaying the result(when and which anomaly) on html inner frame (the webpage is on localhost:8080).
**Note** that the webapp works on csv files that fit the definitions as shown in the attached example files: trainFile.csv, testFile.csv file (the first line must include heading titles).

2. The Application is built according to the MVC principle(Model-View-Controller) using the node.js technology.
The controller is written in javascript language.
The view is written in html and javascript languages.
The models are executable files compiled from c++ programs.(note that the models return the results in json format through outstream,'{}' if no anomalies were found)

3. In order to run the Web Application it is required to:
    - download node.js here: https://nodejs.org/en/
    - open a terminal window from the controller directory(or use cd) of the web application(recommended through VScode) and type the following commands:
      - npm init --yes
      - npm i express
      - npm i express-fileupload
      - node server.js 
    - once you have done that, you can start looking for anomalies 😃(i.e open a web browser and type localhost:8080 in the URL line, send post request etc.)

~Anything else is self explanatory 📈
