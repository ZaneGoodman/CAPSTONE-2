import React, { useEffect } from "react";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import Rosary from "../models/rosary";

const Home = () => {
  //   const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    const getRosary = async () => {
      // const today = await Rosary.getByDate("112823");
      const today2 = await Rosary.getByDay();
      console.log(today2);
      // console.log(today);
    };
    getRosary();
  }, []);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default Home;
