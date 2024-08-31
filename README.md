# EllipsisTechSeries - Brawllball Baddies

This repository contains
- capture (python cv)
- ellipsis-tech-series_c2webui (webapp)

# To install and run capture (tested on Arch Linux)
```
cd capture
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```
afterwards, run the server
```
python server.py
```

create a new terminal and connect the client
```
source env/bin/activate
python client.py
```

a .env file has been provided, you can modify the file to fit your use case.

# Troubleshooting
You may encounter issues when installing the dependencies. You can try `pip install opencv-python ultralytics` to solve it.

# To install webapp locally
```
cd ellipsis-tech-series_c2webui
npm i
npm run dev
```

a google maps api key is required to run the webapp locally.
The project is already hosted on vercel