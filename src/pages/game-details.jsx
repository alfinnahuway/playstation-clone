import axios from "axios";
import Layout from "../layout/layout";
import { useParams } from "react-router-dom";
import { useState } from "react";

const GameDetails = () => {
  const { id } = useParams();
  const [title2, setTitle2] = useState("");
  const [poster, setPoster] = useState("");
  const [price, setPrice] = useState("");

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

  const getGameData = async () => {
    try {
      const response = await axios.get(
        `https://64b4c1000efb99d862693bc3.mockapi.io/games/${id}`
      );
      setTitle2(response.data.title2);
      setPoster(response.data.poster2);
      setPrice(convertPrice(response.data.price));
    } catch (err) {
      console.log(err);
    }
  };

  getGameData();
  return (
    <Layout>
      <section className="w-full h-screen -mt-20">
        <main className="w-full h-full">
          <div className="w-full h-[70vh]  overflow-hidden ">
            <img className="w-full h- object-top" src={poster} alt="" />
          </div>
          <div className="w-[30rem] h-[400px] bg-[#25262a] absolute left-10 top-56 p-5">
            <div className="text-white flex flex-col gap-10">
              <h1 className="text-3xl font-light">{title2}</h1>
              <div className="p-3 flex items-center gap-5">
                <input
                  className="scale-150 w-4 h-4"
                  id="price"
                  name="price"
                  type="radio"
                  value={price}
                  checked
                />
                <label className="text-2xl" htmlFor="price">
                  {price}
                </label>
              </div>
              <div className="w-full flex gap-2 px-16">
                <button className=" w-full p-2 bg-orange-600 rounded-3xl">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </main>
      </section>
    </Layout>
  );
};
export default GameDetails;
