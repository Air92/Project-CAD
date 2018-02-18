# ruuning server in debug mode:
#     export FLASK_APP=hello.py
#     flask run

# running server in external mode:
#     flask run --host=0.0.0.0

from flask import Flask

app = Flask(__name__)
@app.route('/')
@app.route('/index')
def index():
    return '''
    <html>
        <h2>Endpoints</h2>
            <ul>
                <li>/temperature - gets temperature reading</li>
                <li>/humidity - gets humidity reading</li>
                <li>/particle - gets particle reading</li>
                <li>/gases - gets gas density reading </li>
                <li>/sensorReading - gets all sensor readings and stores in csv file</li>
                <li>/dataPoints - get all data points, in JOSN, stored in csv file </li>
            </ul>
    </html>'''


@app.route('/temperature')
def getTemperature():
    return "Temperature"

@app.route('/humidity')
def getHumidity():
    return "Humidity"

@app.route('/particle')
def getParticleData():
    return "Particle data"

@app.route('/gases')
def getGasData():
    return "Gas"

@app.route('/sensorReading')
def SensorPoint():
    return "Sensor Data"

@app.route('/dataPoints')
def getAllData():
    return "All data"