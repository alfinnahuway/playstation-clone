import axios from "axios";
import Layout from "../layout/layout";
import { useParams } from "react-router-dom";
import { useState } from "react";

const GameDetails = () => {
  const { id } = useParams();
  const [poster, setPoster] = useState("");

  const getGameData = async () => {
    try {
      const response = await axios.get(
        `https://64b4c1000efb99d862693bc3.mockapi.io/games/${id}`
      );
      setPoster(response.data.poster2);
    } catch (err) {
      console.log(err);
    }
  };

  getGameData();
  return (
    <Layout>
      <section className="w-full h-screen -mt-20">
        <main className="w-full h-full">
          <div
            className={`w-full h-[60vh] bg-[url('${poster}')] bg-cover bg-center`}
          ></div>
          <div className="w-[30rem] h-[400px] bg-[#25262a] absolute left-10 top-56 p-5">
            <div className="text-white ">
              <h1 className="text-3xl font-light">
                EA SPORTS™ FIFA 23 PS5™ (Simplified Chinese, English, Korean,
                Japanese, Traditional Chinese)
              </h1>
            </div>
          </div>
        </main>
      </section>
    </Layout>
  );
};
export default GameDetails;
