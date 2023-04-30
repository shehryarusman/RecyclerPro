export const drawRect = (detections, ctx) =>{
  // Loop through each prediction
  detections.forEach(prediction => {

    // Extract boxes and classes
    const [x, y, width, height] = prediction['bbox']; 
    let text = prediction['class'];
    const score = prediction['score'];
    let color = 'blue';
    const recycle = ['bottle', 'wine glass', 'cup', 'fork','knife', 'spoon', 'bowl', 'vase','toothbrush'];
    const trash = ['banana', 'apple'];
    if(recycle.indexOf(text) > -1){
      color = 'blue';
      text += " "+ Math.round((score*100) * 100) / 100 + "%";
      text = "(Recylable) " + text;
    // Set styling
    ctx.strokeStyle = color
    ctx.font = '18px Arial';

    // Draw rectangles and text
    ctx.beginPath();   
    ctx.fillStyle = color
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height); 
    ctx.stroke();
    } else if (trash.indexOf(text) > -1){
      //color='red';
      text += " "+ Math.round((score*100) * 100) / 100 + "%";
      text = "(Trash) " + text;
    // Set styling
    ctx.strokeStyle = '#' + color
    ctx.font = '18px Arial';

    // Draw rectangles and text
    ctx.beginPath();   
    ctx.fillStyle = '#' + color
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height); 
    ctx.stroke();
    }
    
  });
}
