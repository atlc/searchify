import Head from "next/head";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollButton from "../components/scroll_button";

const GREEN = "#1DB954";
const BLACK = "#191414";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("channel orange");
    const [searchType, setSearchType] = useState("album");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        document.body.className = "bg-dark";
    }, []);

    useEffect(() => {
        if (!searchTerm) return;

        fetch(`/api/search?searchType=${searchType}&searchTerm=${searchTerm}`)
            .then(res => res.json())
            .then(data => setSearchResults(data[`${searchType}s`].items))
            .catch(error => {
                console.log(error);
                alert("An error occurred, please try again later.");
            });
    }, [searchTerm, searchType]);

    return (
        <div>
            <Head>
                <title>Searchify 🔍</title>
                <meta name="description" content="Spotify Album/Artist search tool" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container">
                <div className="row justify-content-center">
                    <div style={{ backgroundColor: BLACK }} className="p-3 mb-5">
                        <h1 className="display-1 text-center" style={{ color: GREEN }}>
                            {/* S(poot)ify */}
                            Searchify
                        </h1>
                        <form onSubmit={e => e.preventDefault()} style={{ backgroundColor: GREEN }} className="shadow rounded-3 p-3 mb-2">
                            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="form-control" />
                            <div className="d-flex mt-1 justify-content-center">
                                <div onClick={() => setSearchType("album")} className="mx-4">
                                    <input className="mx-1" readOnly checked={searchType === "album"} type="radio" />
                                    <label>Album</label>
                                </div>
                                <div onClick={() => setSearchType("artist")} className="mx-4">
                                    <input className="mx-1" readOnly checked={searchType === "artist"} type="radio" />
                                    <label>Artist</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* album_type and artists are ALBUM data only */}
                    {/* popularity, genres, and followers are ARTIST data only */}
                    {searchResults.map(({ id, name, images, external_urls, album_type, artists, popularity, genres, followers }) => (
                        <div onClick={() => window.open(external_urls.spotify, "_blank")} key={id} className="p-1 my-2 col-11 col-md-6 col-lg-4 col-xl-3">
                            <div style={{ border: "1px solid", borderColor: GREEN }} className="shadow rounded-3">
                                <div style={{ backgroundColor: BLACK, color: GREEN }} className="card-header">
                                    <div>
                                        <strong>{name}</strong>
                                        {searchType === "album" && (
                                            <span>
                                                {" "}
                                                ({album_type}), by{" "}
                                                {artists?.map(artist => (
                                                    <a key={artist.id} style={{ color: GREEN }} className="mx-2" href={artist.external_urls.spotify}>
                                                        {artist.name}
                                                    </a>
                                                ))}
                                            </span>
                                        )}
                                        {searchType === "artist" && <>{followers && <p>{followers.total?.toLocaleString()} followers</p>}</>}
                                    </div>
                                </div>
                                <div className="card-body" style={{ height: 320, backgroundImage: `url('${images[1]?.url}')`, backgroundRepeat: "round" }}></div>
                                {genres && genres.length > 0 && <div className="card-footer">{genres?.length > 0 && <div style={{ color: GREEN }}>Genres: {genres.join(", ")}</div>}</div>}
                            </div>
                        </div>
                    ))}
                    <ScrollButton />
                </div>
            </main>
        </div>
    );
}
