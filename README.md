# Reac tetris

## Todos

- [x] drop the block when time passes.
- [x] spawn the new block. when the block enters the bottom.
- [x] check the block width according to the block types.
- [x] define block types and figures.
- [x] merge block if the block touches the bottom, and spawn the new block.
- [x] rotate the block.
- [ ] create a pixel object that represents which pixel is which color.
- [ ] Add score system.
- [ ] Implement hard drop.
- [ ] Implement game start / game end.
- [ ] Implement line check.

### Others

- [ ] Apply prettier, eslint configuration

## Rotation System

- This game follows the SRS rotation system.
- The wallkick system is not implemented currently.

## Score System

- If you remove a line, you get 1 point.
- If you remove two lines at once, you get 4 points.
- If you remove three lines at once, you get 8 points.
- If you remove four lines at once, you get 16 points.

## Drawing a current block

- The latest state of the game should be applied to the playfield bitmap.
  to change the state, and the screen will be updated by itself.
- The trick is to use the compound selector of react-redux.

