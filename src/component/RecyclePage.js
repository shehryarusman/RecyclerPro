import { React, useRef, useEffect} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
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

  const [showImpact, setShowImpact] = useState(false);

  const handleConfirmClick = () => {
    setShowImpact(true);
  };

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
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

  useEffect(() => {
    runCoco();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
    
    <div className='header-container'>
         <h1 className='welcome-message'>Making the world a cleaner and greener place - one recycled item at a time!</h1>
    </div>
    <section className="video-container">
      <Webcam ref={webcamRef} muted={true} className="video" />

      <canvas ref={canvasRef} className="canvas" />
    </section>

    <div className="isTrashable">
      <button onClick={() => handleConfirmClick()}>Confirm</button>
    </div>

    <section
      className={`impact-container ${showImpact ? "show" : ""}`}
      ref={impactContainerRef}
      onAnimationEnd={() => {
        if (!showImpact) {
          impactContainerRef.current.classList.remove("hide");
        }
      }}
    >
              <h5>feedback</h5>

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
