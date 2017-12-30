from flask import Flask, render_template, jsonify, request
from chessboard import ChessBoard



app = Flask(__name__) # Create Flask - instance. 


@app.route('/_make_move', methods=['GET', 'POST'])
def make_move():
    if request.method == 'POST':
        try:
            move_data = request.get_json()
            board = ChessBoard(move_data)
            new_move = board.makeMove()
            for key in new_move:
                src = key
                dest = new_move[key]
            source = board.convertCoord(src[0]) + str(src[1])
            destination = board.convertCoord(dest[0]) + str(dest[1])
            
            return jsonify(sourceID=source, destID=destination)
        except Exception as err: 
            print((err))

    # a = request.args.get('a', 0, type=int)
    # b = request.args.get('b', 0, type=int)
        

@app.route("/")
def mainpage():
    return render_template('index.html') # Correct folder locations required, also correct file syntax inside files

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')


        