FROM python:3.10-alpine

WORKDIR /app/

# dependencies
#RUN apk add postgresql-dev

ADD requirements.txt ./
RUN pip install -r requirements.txt

# Django management
ADD manage.py ./

# app code
ADD text2touch/ ./text2touch/

# collect static files
RUN ./manage.py collectstatic

# local database
ADD db.sqlite3 ./

# vtracer
ADD bin/vtracer-linux /usr/local/bin/vtracer
RUN mkdir tmp/

EXPOSE 80
CMD ./manage.py migrate &&  \
    gunicorn text2touch.wsgi:application  \
        --bind=0.0.0.0:80  \
        --workers=3  \
        --access-logfile -
