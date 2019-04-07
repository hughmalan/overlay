/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

// Put variables in global scope to make them available to the browser console.
const video = window.video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
const button = document.getElementById('button');
const select = document.getElementById('select');
const setimagesrcbutton = document.getElementById('setimagesrc');
const setimageopacityabutton = document.getElementById('setimageopacity_a');
const setimageopacitybbutton = document.getElementById('setimageopacity_b');

canvas.width = 480;
canvas.height = 360;

let currentStream;

function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

function gotDevices(mediaDevices) {
  select.innerHTML = '';
  select.appendChild(document.createElement('option'));
  let count = 1;
  mediaDevices.forEach(mediaDevice => {
    if (mediaDevice.kind === 'videoinput') {
      const option = document.createElement('option');
      option.value = mediaDevice.deviceId;
      const label = mediaDevice.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
}

button.addEventListener('click', event => {
  if (typeof currentStream !== 'undefined') {
    stopMediaTracks(currentStream);
  }
  const videoConstraints = {};
  if (select.value === '') {
    videoConstraints.facingMode = 'environment';
  } else {
    videoConstraints.deviceId = { exact: select.value };
  }
  const constraints = {
    video: videoConstraints,
    audio: false
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch(error => {
      console.error(error);
    });
});

setimagesrcbutton.addEventListener('click', event => {
	document.getElementById("referenceImg").src = document.getElementById("editimgesrc").value;
		//"https://www.how-to-draw-funny-cartoons.com/images/butterfly-sketch-001.jpg";
});

setimageopacityabutton.addEventListener('click', event => {
	const overlay=document.getElementById("referenceImg");
	overlay.style.opacity = (overlay.style.opacity>0.5) ? 0.1 : 0.9;
});
	
setimageopacitybbutton.addEventListener('click', event => {
	const overlay=document.getElementById("referenceImg");
	overlay.style.opacity = (overlay.style.opacity>0.5) ? 0.33 : 0.66;
});


navigator.mediaDevices.enumerateDevices().then(gotDevices);
