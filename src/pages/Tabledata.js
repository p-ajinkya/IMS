import React, { useEffect, useState } from "react";
import "../../src/Table.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";

const Tabledata = () => {
  const navigate = useNavigate();

  const [sitesList, setSitesList] = useState([]);

  useEffect(() => {
    fetchAllSites();
  }, []);

  const fetchAllSites = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/sites/getAllSites?limit=10&pageNo=0"
      );
      if (response.data["success"] == true) {
        console.log(response.data.data.sites); // handle the response from the server
        setSitesList(response.data.data.sites);
      }
    } catch (error) {
      console.log(error); // handle the error
    }
  };

  useEffect(() => {
    console.log("Site Data : ", JSON.stringify(sitesList));
  }, [sitesList]);

  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  return (
    <>
      <h1 className="heading"></h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-44 top1">
        <div className="bg-white mb-12">
          <h1 className="text-6xl bg-white-600 p-6">Sites</h1>
        </div>
        <div className="bg-white ">
          <div className="">
            <Link
              to="/AddSite"
              className="text-white bg-blue-700  font-medium  text-sm px-6 py-4 text-center b1"
            >
              Add Site
            </Link>
          </div>
          <h1 className="mb-8 ml-4 text-2xl">Sites</h1>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-16 bg-white">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <input type="checkbox"></input>
                </th>
                <th scope="col" className="px-6 py-3">
                  Site name
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Remark
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sitesList ? (
                Object.values(sitesList)?.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td scope="col" className="px-6 py-3">
                      <input type="checkbox"></input>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.address}</td>
                    <td className="px-6 py-4">{formatDate(item.start_date)}</td>
                    <td className="px-6 py-4">{formatDate(item.end_date)}</td>
                    <td className="px-6 py-4">{item.remark}</td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>N/A</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tabledata;
