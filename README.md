# Reac tetris

## Todos

- [ ] drop the block when time passes.
- [ ] spawn the new block. when the block enters the bottom.
- [ ] check the block width according to the block types.
- [ ] define block types and figures.
- [ ] merge block if the block touches the bottom, and spawn the new block.
- [ ] rotate the block.
- [ ] create a pixel object that represents which pixel is which color.
- [ ] Add score system 

## Score System

- If you remove a line, you get 1 point.
- If you remove two lines at once, you get 4 points.
- If you remove three lines at once, you get 8 points.
- If you remove four lines at once, you get 16 points.

## Drawing a current block

- The latest state of the game should be applied to the playfield bitmap.
- We shouldn't call the "drawBlock" or any draw method, but just call the action
  to change the state, and the screen will be updated by itself.

### Others

- [ ] Apply prettier, eslint configuration
