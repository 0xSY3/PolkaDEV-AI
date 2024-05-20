import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function OpBreakdown() {
  const { opAddress: initialOpAddress } = useParams();
  const [opAddress, setOpAddress] = useState(initialOpAddress);
  const [codeData, setCodeData] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [clickedInput, setClickedInput] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!clickedInput) {
      setClickedInput(true);
    }
    setOpAddress(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData();
  };

  useEffect(() => {
    if (!clickedInput) {
      fetchData();
    }
  }, [opAddress, clickedInput]);

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      // Make POST request to backend
      const response = await axios.post("http://localhost:3001/Transaction", {
        contractId: opAddress,
      });
      setCodeData(response.data.sourceCodeData.source);
      setExplanation(response.data.gptResponse.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-900 min-h-screen py-8 text-white">
        <div className="container mx-auto">
          <h1 className="text-4xl font-custom text-center mb-8 text-purple-500">
            <span className="font-bold">Optimism Smart Contract Address:</span> {opAddress}
          </h1>
          <form onSubmit={handleSubmit} className="mb-8 flex items-center">
            <input
              type="text"
              value={opAddress}
              onChange={handleInputChange}
              onClick={() => setClickedInput(true)}
              className="bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:outline-none focus:border-purple-500 flex-grow mr-2"
            />
            <button type="submit" className="bg-purple-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Submit
            </button>
          </form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ml-5 mr-5">
            <div className="bg-gray-800 p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-purple-500">
                Optimism Smart Contract Code
              </h2>
              {codeData || ""}
            </div>
            <div className="bg-gray-800 p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4 w-full text-purple-500">Explanation</h2>
              {explanation || ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpBreakdown;
