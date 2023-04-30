import { React, useRef, useEffect} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./draw";
import Image3 from "../enviormental_image_1.jpeg";
import '../RecyclePage.css'

import { useState } from 'react';

const ProCard = ({ text }) => {
  return (
    <div className="pro-card">
      <h3>Pros</h3>
      <p>{text}</p>
    </div>
  );
};

const ConCard = ({ text }) => {
  return (
    <div className="con-card">
      <h3>Cons</h3>
      <p>{text}</p>
    </div>
  );
};

function RecyclePage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const impactContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const [showContainer, setShowContainer] = useState(false);

  const handleConfirmClick = async () => {
    setShowContainer(true);
  
    // Get the canvas element
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    // Get the video element
    const video = webcamRef.current.video;
  
    // Set the canvas dimensions to match the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  
    // Draw the current video frame onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    // Get the data URL of the canvas
    const dataURL = canvas.toDataURL();
  
    console.log(dataURL);
  
    // Send the data URL to the backend
    const response = await fetch('/api/save-canvas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataURL }),
    });
  
    const result = await response.json();
    console.log(result);
  };
  
  

  let model = undefined;

  async function loadModel() {
    //let location = 'http://127.0.0.1:5000/model';
    //model = (await tf.loadGraphModel(location)).loadSync;
    //const modelUrl =
   //'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';
    //const model = await tf.loadGraphModel(modelUrl);
    //const zeros = tf.zeros([1, 224, 224, 3]);
    //console.log(model.predict(zeros).print());
    //model.summary();
    
  }
  
  // Main function
  const runModel = async () => {
    loadModel();
    console.log("model loaded!");
    const net = await cocossd.load(); //coco is lightweight detections, our tensorflow based backend model is still training
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
    setLoading(false); // Set loading to false when everything is loaded
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(()=>{runModel()},[]);

  return (
    <div className="App">
      <section className="video-container">
        <Webcam ref={webcamRef} muted={true} className="video" />
        <canvas ref={canvasRef} className="canvas" />
      </section>

      <div className="isTrashable">
        <button onClick={() => handleConfirmClick()}>Confirm</button>
      </div>

      {showContainer && (
        <div className="container">
          <ProCard text="Reduces the amount of waste in landfills." />
          <ConCard text="Can be time-consuming to sort and recycle." />
          <ProCard text="Conserves natural resources and energy." />
          <ConCard text="May require extra effort or transportation to recycle properly." />
        </div>
      )}
    </div>
  );
}

export default RecyclePage;
