# text2touch

This project was created for the [Accessibility Hackathon](https://msevents.microsoft.com/event?id=221712001)
organized in March 2023 by Microsoft Romania in collaboration with the [Tactile Images](https://tactileimages.org)
organization. We used OpenAI's [text](https://platform.openai.com/docs/api-reference/chat) and
[image](https://platform.openai.com/docs/api-reference/chat) generation capabilities to produce vector graphics to be
used with the [Tactile Images editor](http://editor.tactileimages.org).

### Tech stack

The overall information flow in our system is the following:

```
user gives prompt (UI)  -->  save prompt to DB (backend)

                                          |
                                          v
                                          
                               prepare specialized prompt
                                  for DALLE-2 / GPT-3
                                 
                                 |                   |
                                 V                   v
                                  
                          get PNG images     generate an SVG image
                           from DALLE-2           using GPT
                             
                                  |                  |
                                  v                  |
                                                     |
                         convert PNGs to SVGs        |
                                                     |
                                  |                  |
                                  v                  v
  user receives                               
 SVG images (UI)    <-------    save generated SVGs to DB
```

In the frontend we use React.js + MaterialCSS.

The backend is written in Python and uses Django, its admin features and Django Rest Framework. For the purpose of the
hackathon we used SQLite as our database. The PNG-to-SVG conversion is done using
[vtracer](https://github.com/visioncortex/vtracer).

### Trying our code

The **backend** code resides in the `backend/` directory. You will need to create and activate a Python virtual
environment, install
the dependencies, run the database migrations, create a user and run the server:

```shell
$ cd backend/
$ python -m venv venv  # or `python3` on some machines
$ . venv/bin/activate  # or similar, depending on the shell
$ pip install -r requirements.txt
$ ./manage.py migrate
$ ./manage.py createsuperuser  # and following the interactive instructions
$ ./manage.py runserver
```

After the development server is running you can access:

- the REST api at: http://localhost:8000/api/
- the Django Admin interface at: http://localhost:8000/admin/

Both require authentication with the user credentials created above.

The **frontend** code can be found in the `front/` folder. To run it locally run the following commands:

```shell
$ cd front/
$ npm install
$ npm start
```

The UI should now be available at http://localhost:3000. Again you should authenticate with the same credentials as
above.

**For the OpenAI services to work**, you need to fill-in the proper API keys in `backend/text2touch/settings.py`.
See the `OPENAI` configuration variable.

A test database and a demo user with credentials `andrei`:`hackathon` are included by default in the repository. This
user can be used instead of the superuser created above if you want to see existing prompts and generated images without
setting up new OpenAI keys.

### Final thoughts

Many thanks to Microsoft Romania and to the Tactile Images NGO for organizing this event. We had the chance to build
something cool in 24 hours and learn a lot in the process.