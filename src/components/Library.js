import LibrarySong from "./LibrarySong";
const Library = ({
	songs,
	setSongs,
	setCurrentSong,
	isPlaying,
	audioRef,
	libraryStatus,
}) => {
	return (
		<div className={`library ${libraryStatus ? "active-library" : ""}`}>
			<h2>Library</h2>
			<div className="library-songs">
				{songs.map((song) => (
					<LibrarySong
						song={song}
						songs={songs}
						setSongs={setSongs}
						key={song.id}
						setCurrentSong={setCurrentSong}
						isPlaying={isPlaying}
						audioRef={audioRef}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
