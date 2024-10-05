export enum PieceState {
  Empty = 0,
  BottomPlayerPiece = 1,
  TopPlayerPiece = 2,
  TopPlayerKing = 3,
  BottomPlayerKing = 4,
  Unusable = -1,
}

export enum PieceSide {
  Top = 2, // top side player
  Bottom = 1, // bottom side player
}

export enum SquareColor {
  Dark = "bg-yellow-900",
  Light = "bg-yellow-600",
}
