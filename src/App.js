import React, { useState, useRef } from "react";
//Adding Style file
import "./style/app.scss";
//Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
//importing util
import data from "./data";
function App() {
	//Ref
	const audioRef = useRef(null);
	//state
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);
	const onTimeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const animationPercentage = Math.round(
			(roundedCurrent / roundedDuration) * 100
		);
		setSongInfo({
			...songInfo,
			currentTime: current,
			duration,
			animationPercentage,
		});
	};
	const onEndedHandler = async () => {
		const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	};
	return (
		<div className={`app ${libraryStatus ? "library-active" : ""}`}>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} isPlaying={isPlaying} />
			<Player
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				audioRef={audioRef}
				songs={songs}
				setSongs={setSongs}
			/>
			<Library
				songs={songs}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				audioRef={audioRef}
				setSongs={setSongs}
				libraryStatus={libraryStatus}
			/>
			<audio
				onTimeUpdate={onTimeUpdateHandler}
				onLoadedMetadata={onTimeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
				onEnded={onEndedHandler}
			></audio>
		</div>
	);
}

export default App;
