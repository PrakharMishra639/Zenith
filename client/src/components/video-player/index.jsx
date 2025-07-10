import React, { useRef, useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = React.memo(
  ({
    width = "100%",
    height = "100%",
    url,
    onProgressUpdate,
    progressData,
  }) => {
    const [played, setPlayed] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    useEffect(() => {
      setPlayed(0);
    }, [url]);

    const handleProgress = useCallback(
      (state) => {
        setPlayed(state.played);
        if (state.played === 1) {
          onProgressUpdate?.({
            ...progressData,
            progressValue: state.played,
          });
        }
      },
      [onProgressUpdate, progressData]
    );

    const handleFullScreen = useCallback(() => {
      if (containerRef.current) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          containerRef.current.requestFullscreen();
        }
      }
    }, []);

    useEffect(() => {
      const onFsChange = () => setIsFullScreen(!!document.fullscreenElement);
      document.addEventListener("fullscreenchange", onFsChange);
      return () => document.removeEventListener("fullscreenchange", onFsChange);
    }, []);

    return (
      <div
        ref={containerRef}
        className={`relative bg-black rounded-lg overflow-hidden shadow-2xl ${
          isFullScreen ? "fixed inset-0 z-50" : ""
        }`}
        style={{ width, height }}
      >
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          url={url}
          controls
          onProgress={handleProgress}
          muted={false}
          volume={1}
          config={{
            youtube: {
              playerVars: {
                showinfo: 1,
                controls: 1,
                modestbranding: 1,
                rel: 0,
              },
            },
            vimeo: {
              playerOptions: {
                byline: false,
                portrait: false,
                title: false,
              },
            },
          }}
        />
        <button
          onClick={handleFullScreen}
          className="absolute bottom-4 right-4 z-10 text-white bg-gray-800 bg-opacity-70 px-3 py-1 rounded hover:bg-opacity-100 transition-opacity"
        >
          {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
    );
  },
  (prev, next) =>
    prev.url === next.url &&
    prev.width === next.width &&
    prev.height === next.height &&
    prev.onProgressUpdate === next.onProgressUpdate &&
    prev.progressData === next.progressData
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
