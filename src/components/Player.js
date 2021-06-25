import React from "react";
//Font awsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	songInfo,
	setSongInfo,
	audioRef,
	songs,
	setSongs,
}) => {
	//useEffect
	const activePlayerHandler = (nextprev) => {
		const newSong = songs.map((s) => {
			if (s.id === nextprev.id) {
				return {
					...s,
					active: true,
				};
			} else {
				return {
					...s,
					active: false,
				};
			}
		});
		setSongs(newSong);
	};
	//Handler
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};
	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};
	const skipTrackHandler = async (direction) => {
		const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activePlayerHandler(songs[(currentIndex + 1) % songs.length]);
		}
		if (direction === "skip-back") {
			if ((currentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activePlayerHandler(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
			activePlayerHandler(songs[(currentIndex - 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};
	//add Styles
	const animation = {
		transform: ` translateX(${songInfo.animationPercentage}%)`,
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
					}}
					className="track"
				>
					<input
						min={0}
						value={songInfo.currentTime}
						max={songInfo.duration || 0}
						onChange={dragHandler}
						type="range"
					/>
					<div style={animation} className="animate-track"></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					icon={faAngleLeft}
					size="2x"
					onClick={() => skipTrackHandler("skip-back")}
					className="skip-back"
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					icon={isPlaying ? faPause : faPlay}
					size="2x"
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-forward")}
					className="skip-forward"
					icon={faAngleRight}
					size="2x"
				/>
			</div>
		</div>
	);
};

export default Player;
