import random

class ChessBoard:
    """Class for implementing chessboard, takes JSON as argument"""
    #Idea is, that always is new board created when JSON is received
    #Can handle multiple games this way, without own instance for each player on the web

    #Very simple move making. Board is calculating all possible moves for one turn and picking one random


    def __init__(self, positions):

        self.letters = {
            'a': 1,
            'b': 2,
            'c': 3,
            'd': 4,
            'e': 5,
            'f': 6,
            'g': 7,
            'h': 8
        }
        self.possibleMoves = [] 

        self.coordinates = {}
        sides = ['white', 'black']
        for side in sides: # Get pieces of both sides
            for pieces, pos in positions[side].items(): # Get piece and all positions of that type
                for po in pos: # Loop all piece positions of same type, and create correct objects
                    x, y = self.letters[po[0]], int(po[1])
                    z = x, y
                    if pieces == 'pawn':
                        self.coordinates[z] = Pawn(side, z)
                    if pieces == 'rook':
                        self.coordinates[z] = Rook(side, z)
                    if pieces == 'knight':
                        self.coordinates[z] = Knight(side, z)
                    if pieces == 'bishop':
                        self.coordinates[z] = Bishop(side, z)
                    if pieces == 'queen':
                        self.coordinates[z] = Queen(side, z)
                    if pieces == 'king':
                        self.coordinates[z] = King(side, z)

        print(self.coordinates[(1, 2)].getColor())
        print(self.coordinates[(1, 7)].getColor())
        # print((1, 2) + (2, 1))
        # tuple(map(operator.add, (1,2), (2,1)))
        print(self.coordinates[(1,8)].getType())
        for i in self.coordinates:
            if self.coordinates[i].getColor() is 'black': # Let's find possible moves just for black at first
                moves = self.coordinates[i].getMoves()
                for m in moves:
                    a = 1
                    while (True):
                        
                        # print ((lambda x, y: x + a*y if x + a*y <= 8 and x + a*y >= 0 else 'OutOfBoard', m, i))
                        new_pos = tuple(map(lambda x, y: x + a*y if x + a*y <= 8 and x + a*y >= 1 else 'OutOfBoard', m, i)) # Calculate possible position based on moveset and current position
                        x, y = new_pos
                        if x == 'OutOfBoard' or y == 'OutOfBoard':
                            # print ('%s out of board' % (new_pos,))
                            break

                        if not self.coordinates[i].getMult():
                            if new_pos in self.coordinates:
                                if self.coordinates[new_pos].getColor() != self.coordinates[i].getColor():
                                    print('Capturable piece at %s' % (new_pos,))
                                    self.possibleMoves.append({i:new_pos})
                                    break
                                else:
                                    # print('Piece is same color.')
                                    break
                            else:
                                # print('Free square for moving.')
                                self.possibleMoves.append({i:new_pos})
                                break

                        else:
                            if new_pos in self.coordinates:
                                if self.coordinates[new_pos].getColor() != self.coordinates[i].getColor():
                                    print('Capturable piece at %s' % (new_pos,))
                                    self.possibleMoves.append({i:new_pos})
                                    break
                                else:
                                    # print('Piece is same color.')
                                    break
                            else:
                                # print('Free square for moving.')
                                self.possibleMoves.append({i:new_pos})
                                a+=1
        # print(self.possibleMoves)
    def makeMove(self):
        return random.SystemRandom().choice(self.possibleMoves)

    def convertCoord(self, term):
        for letter in self.letters:
            if self.letters[letter] == term:
                print(letter)
                return letter

                    


class ChessPiece (object):
    def __init__(self, piece, color, position):
        self.piece = piece
        self.color = color
        self.position = position
        self.moves = []
        self.capture_moves = []
        self.multiplicative = bool

    def move(self):
        pass

    def capture(self):
        pass

    def getColor(self):
        return self.color

    def getMult(self):
        return self.multiplicative

    def getType(self):
        return self.piece

    def getPosition(self):
        return self.position

    def getMoves(self):
        return self.moves


class Pawn(ChessPiece):
    def __init__(self, color, position):
        ChessPiece.__init__(self, 'pawn', color, position)
        self.multiplicative = False # Means if moveset can be repated: going as far as piece comes or border of board

    def getMoves(self):
        if self.color == 'white':  # Basic moves
            #(x, y) possible moves in coordinates
            self.moves = [(0, 1)]
            if self.position[1] == 2:
                self.moves.append((0, 2))
            self.capture_moves = [(-1, 1), (1, 1)]
        if self.color == 'black':
            self.moves = [(0, -1)]
            if self.position[1] == 7:
                self.moves.append((0, -2))
            self.capture_moves = [(-1, -1), (1, -1)]
        return self.moves

class Rook(ChessPiece):
    def __init__(self, color, position):
        ChessPiece.__init__(self, 'rook', color, position)
        self.multiplicative = True # Means if moveset can be repated: going as far as other piece comes or border of board
        self.moves = [(0, 1), (0, -1), (-1, 0), (1, 0)]
        self.capture_moves = self.moves

class Knight(ChessPiece):
    def __init__(self, color, position):
        ChessPiece.__init__(self, 'knight', color, position)
        self.multiplicative = False
        self.moves = [(1, 2), (1, -2), (-1, 2), (2, 1), (2, -1), (-1, -2), (-2, -1), (-2, 1 )]
        self.capture_moves = self.moves

class Bishop(ChessPiece):
    def __init__(self, color, position):
        ChessPiece.__init__(self, 'bishop', color, position)
        self.multiplicative = True
        self.moves = [(1, 1), (1, -1), (-1, -1), (1, -1)]
        self.capture_moves = self.moves

class Queen(ChessPiece):
    def __init__(self, color, position):
        ChessPiece.__init__(self, 'queen', color, position)
        self.multiplicative = True
        self.moves = [(1, 1), (1, -1), (-1, -1), (1, -1), (0, 1), (0, -1), (-1, 0), (1, 0)]
        self.capture_moves = self.moves

class King(ChessPiece):
    def __init__(self, color, position):
        ChessPiece.__init__(self, 'king', color, position)
        self.multiplicative = False
        self.moves = [(1, 1), (1, -1), (-1, -1), (1, -1), (0, 1), (0, -1), (-1, 0), (1, 0)]
        self.capture_moves = self.moves
