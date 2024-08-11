"use client";
import React from "react";
import { BiSolidUpvote } from "react-icons/bi";

const Upvotebtn = () => {
  const [upvoteCount, setUpvoteCount] = React.useState(0);

  return (
    <button
      onClick={() => {
        setUpvoteCount(upvoteCount + 1);
      }}
      className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg shadow-md transition-all transform hover:scale-105"
    >
      <BiSolidUpvote />

      <span className="font-semibold">{upvoteCount}</span>
      <span className="text-sm text-gray-100">Upvotes</span>
    </button>
  );
};

export default Upvotebtn;
