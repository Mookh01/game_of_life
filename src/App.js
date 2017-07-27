import React, {Component} from 'react';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 30,
      cols: 50,
      generation: 0,
      fps: 1000,
      started: true,
      cleared: false,
      new1: false,
      new2: false,
      new3: true,
      new4: false,
      new5: false,
      new6: false,
      new7: false,
      new8: false,
      live1: false,
      live2: true,
      live3: true,
      live4: false,
      live5: false,
      live6: false,
      live7: false,
      live8: false,
    } //this.state

    for (var row = 0; row < this.state.rows; row++) {
      for (var col = 0; col < this.state.cols; col++) {
        this.state[
          [row, col]
        ] = Math.round(Math.random())
      } //2nd loop
    } //1st loop

    this.update = this.update.bind(this);
    this.cellChange = this.cellChange.bind(this);
    this.clear = this.clear.bind(this);
    this.randomize = this.randomize.bind(this);
    this.clickedCell = this.clickedCell.bind(this);

    requestAnimationFrame(this.update);
  } //constructor

  handleChange(e) {
    e.preventDefault();
    let newRow = Number(e.target.name);
    let newColumn = Number(e.target.name) + 20;
    this.setState({rows: newRow, cols: newColumn}) //setState
    for (var row = 0; row < newRow; row++) {
      for (var col = 0; col < newColumn; col++) {
        this.state[
          [row, col]
        ] = Math.round(Math.random());
      } //2nd For Loop
    } // 1st For Loop
  } //handleChange

  handleToggle() {
    if(!this.state.cleared){
      if (this.state.started) {
      this.setState({started: false});
      cancelAnimationFrame(this.createMovement);
    } else {
      this.setState({started: true})
      // console.log("handleToggle triggering animation" );
      this.createMovement = requestAnimationFrame(this.update);
      // this.createMovement = setTimeout(this.update, 2000);
    }
  } //
  else {
    this.setState({
        cleared : false,
    })
    for (var row = 0; row < this.state.rows; row++) {
      for (var col = 0; col < this.state.cols; col++) {
        this.setState({
          [[row,col]]:Math.round(Math.random()),
        })
      } //2nd loop
    } //1st loop
  }
  }; // handleToggle

  update() {
    this.cellChange();
    this.createMovement = requestAnimationFrame(this.update);
  } //update

  cellChange() {
    this.time = new Date().getTime();
    var newState = {};
    for (var r = 0; r < this.state.rows; r++) {
      for (var c = 0; c < this.state.cols; c++) {
        if (this.cellState(this.state, r, c)) {
          newState[[r, c]] = this.state[[r, c]] ? 0 : 1;
        }
      } //2nd For Loop
    } // 1st For Loop
    this.state.generation++;
    this.setState(newState);
    var now = new Date().getTime();
    var delta = now - this.time;
    while (delta < 1000 / this.state.fps) {
      now = new Date().getTime();
      delta = now - this.time;
    }
  }; //cellChange

  cellState(state, row, col) {
    var cellStatus = state[
      [row, col]
    ];
    var total = 0;
    var rStart = Math.max(row - 1, 0);
    var cStart = Math.max(col - 1, 0);
    var rEnd = Math.min(row + 1, this.state.rows - 1);
    var cEnd = Math.min(col + 1, this.state.cols - 1);
    for (var r = rStart; r <= rEnd; r++) {
      for (var c = cStart; c <= cEnd; c++) {
        total += state[
          [r, c]
        ];
      } //2nd For Loop
    } //1st For Loop

    total -= cellStatus;
    var invert = false;
    if (cellStatus === 1) {
      if (!this.state['live' + total]) {
        invert = true;
      }
    } else if (cellStatus === 0) {
      if (this.state['new' + total]) {
        invert = true;
      }
    }
    return invert;
  } //cellState

  clear(){
    this.setState({
      generation: 0,
      started:false,
      cleared: true,
    })//setState
    for(var row = 0; row < this.state.rows; row++){
      for(var col = 0; col < this.state.cols; col++){
        this.setState({
          [[row,col]]:0,
        })
      }//2nd loop
    }//2nd loop

    cancelAnimationFrame(this.createMovement);
  } //clear

  randomize(){
    for (var row = 0; row < this.state.rows; row++) {
      for (var col = 0; col < this.state.cols; col++) {
        this.setState({
          [[row,col]]:Math.round(Math.random()),
          cleared : false,
        })
      } //2nd loop
    } //1st loop
  } //randomize

  clickedCell(row,col){
    var newState = {};
    cancelAnimationFrame(this.createMovement);
    this.state[[row,col]] = this.state[[row,col]] ? 0 : 1;
    if(this.state.started){
      this.setState({
        started: false
      })
      this.forceUpdate(this.handleToggle);
    } else {
      this.forceUpdate();
    }
  } //clickedCell

  render() {
    let clickedCell = this.clickedCell;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let ratio = (width * 2 / 3 - 40) / (height - 40);
    let boardRatio = this.state.cols / this.state.rows;

    let boardW = (width * 2 / 3) - 40;
    let boardH = boardW * (this.state.rows / this.state.cols);
    let a = [];
    let cellLength = Math.min(boardW, boardH) / Math.min(this.state.rows, this.state.cols);

    let svgStyle = {
      width: boardW,
      height: boardH
    }

    for (var r = 0; r < this.state.rows; r++) {
      for (var c = 0; c < this.state.cols; c++) {
        a.push(<Cell clickedCell={clickedCell} dim={cellLength} col={c} row={r} key={r + "," + c} fill={this.state[[r, c]] ? "darkgreen" : 'lightgrey'}
        />);
      } //2nd For Loop
    } //1st For Loop

    return (
      <div>
        <div class="intro-header">
          <div class="container">

            <div class="row">
              <div class="col-lg-12">
                <div class="intro-message">
                  <h1 className="header">Game of Life</h1>
                  <h4 className="gen">
                    Generation: {this.state.generation}
                  </h4>

                  <hr className="intro-divider" />

                    <h3 className="sizer">
                      Board Size
                    </h3>
                    <ul class="list-inline intro-social-buttons">
                      <div className="controls">

                        <li>
                          <button
                            className="btn btn-primary btn-lg"
                            id="rows"
                            id="cols"
                            type="button"
                            name="40"
                            value="40 / 60 "
                            onClick={this.handleChange.bind(this)}
                          >
                            40 / 60

                          </button>

                        </li>
                        <li>
                          <button
                             className="btn btn-primary btn-lg"
                            id="rows"
                            id="cols"
                            type="button"
                            name="60"
                            value="60 / 80"
                            onClick={this.handleChange.bind(this)}
                          >
                            60 / 80

                          </button>

                        </li>
                        <li>
                          <button
                             className="btn btn-primary btn-lg"
                            id="rows"
                            id="cols"
                            type="button"
                            name="80"
                            value="80 / 100 "
                            onClick={this.handleChange.bind(this)}
                          >
                            80 / 100
                          </button>

                        </li>
                      </div>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="intro-divider" />

        <div className="controls">
          <div class="row">
              <ul class="list-inline intro-social-buttons">
                <div className="board">
                  <li>
                    <button
                      id="startButton"
                      onClick={this.handleToggle.bind(this)}
                      className={this.state.started ? "btn btn-danger lg-btn" : "btn btn-success lg-btn"}
                    >
                      {this.state.started ? "Stop" : "Start"}
                    </button>

                  </li>
                  <li>
                    <button
                      id="clear"
                      className="warning btn btn-warning btn-lg"
                      onClick={this.clear}
                    >
                      Clear Board
                    </button>

                  </li>
                  <li>
                    <button
                      id="randomize"
                      className="info btn btn-default btn-lg"
                      onClick={this.randomize}
                    >
                      Randomize
                    </button>
                  </li>
                </div>
              </ul>
          </div>
        </div>
       <div className="container">
          <div class="row">
        <svg
          width={svgStyle.width}
          height={svgStyle.height}
          className="col svg"
        >
          {a}
        </svg>
            </div>
       </div>
      </div>

    );
  };
} //Board

class Cell extends Component {
  constructor(prop) {
    super(prop);
  } //constructor

  handleClickedCell(){
    this.props.clickedCell(this.props.row, this.props.col);
  }
  render() {
    let dim = this.props.dim;
    let r = this.props.row;
    let c = this.props.col;

    return (
      <rect onClick={this.handleClickedCell.bind(this)} name={[r,c]} width={dim} height={dim} ref={[r,c]}  stroke="#ccc" fill={this.props.fill} strokeWidth='1' x={dim * this.props.col} y={dim * this.props.row} ></rect>
    ) //return
  }; //render

} //Cell

export default Board;
