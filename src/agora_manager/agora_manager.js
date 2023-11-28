import AgoraRTC from "agora-rtc-sdk-ng";

import config from "./config.json";

// MANUALLY GENERATING ID HERE
let appID = Math.round(Math.random() * 100)

// ASSIGNING APPID TO CONFIG
config.uid = appID

const AgoraManager = async (eventsCallback) => {
  let agoraEngine = null;

  AgoraRTC.enableLogUpload();

  // Set up the signaling engine with the provided App ID, UID, and configuration
  const setupAgoraEngine = async () => {
    // CHANGED CODEC FROM VP9 to VP8 TO TEST
    agoraEngine = new AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  };
  await setupAgoraEngine();

  // Event Listeners
  agoraEngine.on("user-published", async (user, mediaType) => {
    // Subscribe to the remote user when the SDK triggers the "user-published" event.
    await agoraEngine.subscribe(user, mediaType);
    console.log("subscribe success");
    eventsCallback("user-published", user, mediaType)
  });

  // Listen for the "user-unpublished" event.
  agoraEngine.on("user-unpublished", (user) => {
    console.log(user.uid + "has left the channel");
  });

  const getAgoraEngine = () => {
    return agoraEngine;
  };

  console.log(config.uid, "config")


  const join = async (localPlayerContainer, channelParameters) => {
    await agoraEngine.join(
      config.appId,
      config.channelName,
      config.token,
      config.uid
    );
    // Create a local audio track from the audio sampled by a microphone.
    channelParameters.localAudioTrack =
      await AgoraRTC.createMicrophoneAudioTrack();
    // Create a local video track from the video captured by a camera.
    channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // Append the local video container to the page body.
    document.body.append(localPlayerContainer);
    // Publish the local audio and video tracks in the channel.
    await getAgoraEngine().publish([
      channelParameters.localAudioTrack,
      channelParameters.localVideoTrack,
    ]);
    // Play the local video track.
    channelParameters.localVideoTrack.play(localPlayerContainer);
  };

  const leave = async (channelParameters) => {
    // Destroy the local audio and video tracks.
    channelParameters.localAudioTrack.close();
    channelParameters.localVideoTrack.close();
    // Remove the containers you created for the local video and remote video.
    await agoraEngine.leave();
  };

  // Return the agoraEngine and the available functions
  return {
    getAgoraEngine,
    config,
    join,
    leave,
  };
};

export default AgoraManager;
