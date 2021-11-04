import React, {useState, useEffect} from 'react';
import "./styles.scss";

export default function App() {
    //storing the returned data into items state
    const [items, setItems] = useState([]);

    useEffect(() => {
        requestGists();
    },[])

    async function requestGists() {
        const base = 'https://api.github.com/gists';
        const query = `?page=1&per_page=30`
        const res = await fetch(base + query);
        const json = await res.json();
        // console.log(Array.isArray(data))
        setItems(json);
        console.log(json)
        // console.log(json[0].owner)
        // console.log(keyNames)
        // setFileName(keyNames)
    }

    return (
        <div className="App">
            {!items.length ? (
                <h2>No gists Found</h2>
            ) : (
                    items.map((item) => (

                        <div className="line" key={item.id}>
                            <img src={item.owner.avatar_url} alt=""/>
                            <p>{Object.keys(item.files)}</p>
                        </div>
                        )
                    )
                )
            }
        </div>
    );
}
