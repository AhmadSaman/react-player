const LibrarySong = ({
	song,
	songs,
	setSongs,
	setCurrentSong,
	isPlaying,
	audioRef,
}) => {
	const songSelectHandler = async () => {
		await setCurrentSong(song);
		const newSong = songs.map((s) => {
			if (s.id === song.id) {
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
		if (isPlaying) audioRef.current.play();
	};
	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${song.active ? "selected" : ""}`}
		>
			<img src={song.cover} alt={song.name} />
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
