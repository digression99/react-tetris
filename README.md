# Reac tetris

## Todos

- [x] drop the block when time passes.
- [x] spawn the new block. when the block enters the bottom.
- [x] check the block width according to the block types.
- [x] define block types and figures.
- [x] merge block if the block touches the bottom, and spawn the new block.
- [x] rotate the block.
- [ ] Add score system.
- [ ] Implement hard drop.
- [ ] Implement game start / game end.
- [x] Implement line check.
- [ ] Implement gravity change.
- [x] Implement counter-clockwise rotation.
- [ ] Show next block.
- [ ] Show colors for every pixel.
  - create a pixel object that represents which pixel is which color.
  - Add type for pixel.
- [ ] Restrain the action payload type.

### Others

- [ ] Apply prettier, eslint configuration

## Rotation System

- This game follows the SRS rotation system.
- The wallkick follows the official check system,
  where if rotation is applied and moving right or left is okay
  to place the block, move the block to the granted position.
- The floorkick is not enabled yet.

## Score System

- If you remove a line, you get 1 point.
- If you remove two lines at once, you get 4 points.
- If you remove three lines at once, you get 8 points.
- If you remove four lines at once, you get 16 points.

## Field vs FieldBuffer in playfieldSlice

- We could use FieldBuffer for the boundary check, collision check,
  since Field is the result bit map that includes the current block.
  (it's pretty dirty to check the boundary with the current block placed
  on the field bitmap, since you need to detect whether the bitmap is
  already collided with other blocks.
  )

## Drawing a current block

- The latest state of the game should be applied to the playfield bitmap.
  to change the state, and the screen will be updated by itself.
- The trick is to use the compound selector of react-redux.

## License

The ISC License (ISC)

Copyright (c) 2023 digression99. All rights reserved.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
