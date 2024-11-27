

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
    ctx.fillRect(upperLeftCornerX + 20,upperLeftCornerY,width ,height);
    ctx.restore();
}

function drawVerticalText(text, x, y, fontSize, ctx) {

  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "white";

  for (let i = 0; i < text.length; i++) {
    ctx.fillText(text[i], x, y + (i * fontSize)); 
  }

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
          20,
          gridY,
          this.canvas.width,
          gridY,
          this.options.gridColor
        );
        drawLine(
          this.ctx,
          50,
          this.options.padding/2,
          50,
          gridY + this.options.padding/2,
          this.options.gridColor
        );

        // Writing grid markers 
        this.ctx.save();
        this.ctx.fillStyle = this.options.gridColor;
        this.ctx.textBaseline = "bottom";
        this.ctx.font = "15px ariel";
        this.ctx.fillText(gridValue, 20, gridY - 2);
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
      let width = (canvas.width-20) / 4;
      let paddingBetweenBars = 60;
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Jan-March", paddingBetweenBars + 20, canvas.height - 10);
      ctx.fillText("April-June", width + paddingBetweenBars + 10, canvas.height - 10);
      ctx.fillText("Jul-Sep", width * 2 + paddingBetweenBars, canvas.height - 10);
      ctx.fillText("Oct-Dec", width * 3 + paddingBetweenBars - 24, canvas.height - 10);
      drawVerticalText("Sales", 0 , (canvas.height / 2), 20, ctx);
    }

    shrinkBars(){
      var i = 0;

      var shrinking = setInterval( async () => {
      
        //erase a line
        this.ctx.clearRect(0, 0, 1000, 1000);

        //subtracts from bar height form each quarter
        var obj = this.options.data;

        for (const key in obj) {
          if(obj[key] > 0){
            obj[key] -= 20;
          } else if(obj[key] <= 0){
            obj[key] = 0;
          }
        }

        //redraws the bars with their subtraction
        this.draw();
        
        //exit the interval 
        if(i > (this.canvas.height - 50)){
          clearInterval(shrinking);
        }
        i++;
      }, 10);
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
    gridColor: "white",
    data: {
      "Jan-March": 2005.00, 
      "April-June": 1471.31, 
      "Jul-Sep": 892.86, 
      "Oct-Dec": 531.60,
    },
    colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"],
  });

window.onload = (event) => {
  myBarchart.draw();

  U.addEvent(U.$('resetGraph'), 'click', ()=> myBarchart.shrinkBars());
};