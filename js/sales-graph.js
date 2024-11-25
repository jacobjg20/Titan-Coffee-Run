

function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
}

class BarChart {
    constructor(options) {
      this.options = options;
      this.canvas = options.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.colors = options.colors;
      this.titleOptions = options.titleOptions;
      this.maxValue = 2100;
    }

    drawGridLines() {
      var canvasActualHeight = this.canvas.height - this.options.padding * 2;
      var canvasActualWidth = this.canvas.width - this.options.padding * 2;
      var gridValue = 0;

      while (gridValue <= this.maxValue) {
        var gridY =
          canvasActualHeight * (1 - gridValue / this.maxValue) +
          this.options.padding;
        drawLine(
          this.ctx,
          0,
          gridY,
          this.canvas.width,
          gridY,
          this.options.gridColor
        );
        drawLine(
          this.ctx,
          15,
          this.options.padding/2,
          15,
          gridY + this.options.padding/2,
          this.options.gridColor
        );

        // Writing grid markers 
        this.ctx.save();
        this.ctx.fillStyle = this.options.gridColor;
        this.ctx.textBaseline = "bottom";
        this.ctx.font = "15px ariel";
        this.ctx.fillText(gridValue, 0, gridY - 2);
        this.ctx.restore();
        gridValue += this.options.gridScale;
      }
    }

    drawBars() {
      var canvasActualHeight = this.canvas.height - this.options.padding * 2;
      var canvasActualWidth = this.canvas.width - this.options.padding * 2;
      var barIndex = 0;
      var numberOfBars = Object.keys(this.options.data).length;
      var barSize = (canvasActualWidth / numberOfBars) - 10;
      
      var values = Object.values(this.options.data);
      for (let val of values) {
        var barHeight = Math.round((canvasActualHeight * val) / this.maxValue);
        console.log(barHeight);
        
        drawBar(
          this.ctx,
          this.options.padding + barIndex * barSize,
          this.canvas.height - barHeight - this.options.padding,
          barSize - 10,
          barHeight,
          this.colors[barIndex % this.colors.length]
        );
        barIndex++;
      }
    }

    drawText(){
      const canvas = document.getElementById("chartContainer");
      const ctx = canvas.getContext("2d");
      let width = canvas.width / 4;
      ctx.font = "2rem Arial";
      ctx.fillText("Jan-March", 0 , canvas.height);
      ctx.fillText("April-June", width , canvas.height);
      ctx.fillText("Jul-Sep", width * 2, canvas.height);
      ctx.fillText("Oct-Dec", width * 3, canvas.height)
    }

    shrinkBars(){
      var i = 0;
      var ctx = this.ctx;

      var shrinking = setInterval( () => {
        

        //erase a line
        ctx.clearRect(0, i, 1000, 1);

        //subtracts from bar height form each quarter
        var obj = this.options.data;

        for (const key in obj) {
          if(obj[key] > 0){
            obj[key] -= 20;
            console.log(obj[key]);
          } 
        }

        //redraws the bars with their subtraction
        this.drawGridLines();
        this.drawBars();

        //exit the interval 
        if(i > (this.canvas.height - 50)){
          clearInterval(shrinking);
        }
        i++;
      }, 4);
    }
    
    draw() {
      this.drawGridLines();
      this.drawBars();
      this.drawText();
    }
  }

  var myBarchart = new BarChart({
    canvas: chartContainer,
    padding: 40,
    gridScale: 100,
    gridColor: "black",
    data: {
      "Jan-March": 2005, 
      "April-June": 1471, 
      "Jul-Sep": 892, 
      "Oct-Dec": 531,
    },
    colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"],
  });

window.onload = (event) => {
  myBarchart.draw();
  U.addEvent(U.$('resetGraph'), 'click', ()=> myBarchart.shrinkBars());
};