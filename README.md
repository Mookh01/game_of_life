# Game of Life

A FreeCodeCamp challenge creating Conway's Game of Life. The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced "players", by creating patterns with particular properties.

# Working Application

https://codepen.io/mookh01/full/PKPqQQ/

# Objective:

User Story: When I first arrive at the game, it will randomly generate a board and start playing.

User Story: I can start and stop the board.

User Story: I can set up the board.

User Story: I can clear the board.

User Story: When I press start, the game will play out.

User Story: Each time the board changes, I can see how many generations have gone by.

Here's an explanation of Conway's Game of Life from John Conway himself: https://www.youtube.com/watch?v=E8kUJL04ELA

Challenges:
Getting Lost in Loops;   It took me much longer than I wanted to get the equation to do what was needed for the game to make deductions.  The solution was realizing that we first begin itterating through each cell of the board. Now with each cell we would look at the surrounding eight cells to determine if they were alive or dead. It really came down to determining the number of live cells around the cell we first began to exam. 
Resetting Board sizes;   when trying to change default rows and columns to become dynamic through a button click, the board size changed but the cell  coloring did not.  I needed to figure out where the transitioning wasn’t happening.  After debugging I could see that the color fill (fill={}) was undefined.
This told me that our rendering of (0 or 1) wasn’t being executed. This was an indication that our Math.random was not being updated to reflect our new size. 
After adding a new  this.state[[row,col]] = Math.round(Math.random());   Inside our handleChange function, I could render the number of cells needed to cover the entire board. 
