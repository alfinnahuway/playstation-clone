import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cards = () => {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [gamesLoad, setGamesLoad] = useState(false);

  const cutString = (title) => {
    if (title.length > 50) {
      return title.substring(0, 50) + "...";
    }
    return title;
  };

  const convertPrice = (val) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    if (val === 0) {
      return "FREE";
    } else {
      return formatter.format(val);
    }
  };

  const createCardLoading = (index) => {
    return (
      <div key={index} className="animate-pulse flex flex-col w-52">
        <div className="w-full  rounded-xl p-1">
          <div className="w-full h-[12rem] rounded-xl bg-gray-300" />
        </div>
        <div className="w-[9.375] h-full px-2 py-4">
          <h1 className="w-full h-2 mb-2 rounded bg-gray-300"></h1>
          <p className="w-20 h-2 rounded bg-gray-300"></p>
        </div>
      </div>
    );
  };

  const createCardResult = (poster, title, price, id) => {
    return (
      <Link
        to={`game-details/${id}`}
        key={id}
        className="flex flex-col w-52 rounded-xl  overflow-hidden group"
      >
        <div className="w-full h-full p-1  group-hover:border-2 rounded-xl border-blue-900">
          <img className="w-full rounded-xl" src={poster} alt="" />
        </div>
        <div className="w-full h-full px-2">
          <h1>{cutString(title)}</h1>
          <p>{convertPrice(price)}</p>
        </div>
      </Link>
    );
  };

  const createCards = () => {
    const cards = [];
    for (let i = 0; i < 10; i++) {
      cards.push(createCardLoading(i));
    }

    return cards;
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setGamesLoad(true);
    setTimeout(() => {
      const getGames = async () => {
        try {
          const response = await axios.get(
            "https://64b4c1000efb99d862693bc3.mockapi.io/games"
          );

          setGamesLoad(false);
          setDatas(response.data);
        } catch (err) {
          console.log(err);
          setGamesLoad(false);
        }
      };

      getGames();
    }, 2000);
  }, []);

  useEffect(() => {
    setGamesLoad(true);
    const timer = setTimeout(() => {
      const setSearchResults = async (searchGames) => {
        try {
          const response = await axios.get(
            `https://64b4c1000efb99d862693bc3.mockapi.io/games?title=${searchGames}`
          );
          setGamesLoad(false);
          setDatas(response.data);
        } catch (err) {
          console.log(err);
          setGamesLoad(true);
        }
      };

      if (search) {
        setSearchResults(search);
      } else {
        setSearchResults([]);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <>
      <section className="w-full h-[80vh]">
        <main className="w-[95%] h-full mx-auto">
          <input
            type="text"
            className="outline-none text-xl px-2 py-1"
            placeholder="Search"
            onChange={handleSearch}
          />
          <div className="grid grid-cols-5 gap-2">
            {gamesLoad
              ? createCards()
              : datas.map(({ poster, title, price, id }) =>
                  createCardResult(poster, title, price, id)
                )}
          </div>
        </main>
      </section>
    </>
  );
};

export default Cards;
