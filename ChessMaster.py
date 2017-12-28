from flask import Flask, render_template, jsonify, request

app = Flask(__name__) # Create Flask - instance. 


@app.route('/_make_move', methods=['GET', 'POST'])
def make_move():
    if request.method == 'POST':
        try:
            move_data = request.get_json()
            print(move_data)
        except Exception as err: 
            print(type(err))

    # a = request.args.get('a', 0, type=int)
    # b = request.args.get('b', 0, type=int)
        return jsonify(result='succeed')

@app.route("/")
def mainpage():
    return render_template('index.html') # Correct folder locations required, also correct file syntax inside files

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')


class ChessBoard: 
    """Class for implementing chessboard"""
    def __init__(self):
        self.positions = 0
        