LightGap
========

standart html, css and js files LightGap implementation 

to run the sample application, first install Flask if you don't have;
```
http://flask.pocoo.org/docs/0.11/installation/
```

or you may prefer to run the php code, install apache and php from below page;
```
https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu
```

run below commands in the folder;
```sh
$ export FLASK_APP=server.py
$ export FLASK_DEBUG=1
$ python -m flask run
```

and open below URL;
```
http://127.0.0.1:5000/html/index.html
```

please check NewsController, TransportController and FeedbackController for inheritance/prototype examples