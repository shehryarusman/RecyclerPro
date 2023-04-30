import { React, useRef, useEffect} from 'react';
import * as tf from "@tensorflow/tfjs";
//import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./draw";
import Image3 from "../enviormental_image_1.jpeg";
import Image4 from "../recycled-cans_6.png";
import '../RecyclePage.css'


import { useState } from 'react';

function RecyclePage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const impactContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleConfirmClick = () => {
    if (impactContainerRef.current) {
      impactContainerRef.current.style.display =
        impactContainerRef.current.style.display === "none" ? "grid" : "none";
    }
  };

  let model = undefined;

  async function loadModel() {
    let location = 'http://127.0.0.1:5000/model'
    model = (await tf.loadGraphModel(location)).loadSync;
    //model.summary();
    
  }
  
  // Main function
  const runModel = async () => {
    loadModel();
    console.log("model loaded!");
    //const net = await cocossd.load();
    //  Loop and detect hands
    setInterval(() => {
      detect(model);
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
      console.log('hello');
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(()=>{runModel()},[]);
  
  return(
    <div className="App">
      <section className="video-container">
        <Webcam ref={webcamRef} muted={true} className="video" />

        <canvas ref={canvasRef} className="canvas" />
      </section>

      <div className="isTrashable">
        <button onClick={() => handleConfirmClick()}>Confirm</button>
      </div>

      <section className="impact-container" ref={impactContainerRef}>
        <div className="show-positive-image">
          <div>
            <img src={Image3} alt="A person holding a recycling bin" />
          </div>
          <div className="text-container">
            <p>
              At our waste management project, we believe in protecting our environment for future generations.
            </p>
          </div>
        </div>

        <div className="show-negative-image">
          <div>
            <img src={Image3} alt="A person holding a recycling bin" />
          </div>
          <div className="text-container">
            <p>
              At our waste management project, we believe in protecting our environment for future generations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RecyclePage;
