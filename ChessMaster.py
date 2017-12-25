from flask import Flask, render_template

app = Flask(__name__) # Create Fkask - instance. 

@app.route("/")
def mainpage():
    return render_template('index.html') # Correct folder locations required, also correct file syntax inside files

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
