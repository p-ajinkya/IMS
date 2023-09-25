import React, { useEffect, useState, useMemo } from "react";
import "../../src/Table.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import Pagination from '../components/PaginationComponent';

let PageSize = 2;

const Tabledata = () => {
  const navigate = useNavigate();

  const [sitesList, setSitesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [submissionModal, setSubmissionModal] = useState(false);
  const [selectedSite, setSelectedSite] = useState({});

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    fetchAllSites();
  }, [currentPage]);

  useEffect(() => {
    fetchAllSites();
  }, []);

  const fetchAllSites = async () => {
    setSitesList([])
    try {
      const response = await axiosInstance.get(
        `/sites/getAllSites?limit=${PageSize}&pageNo=${currentPage}`
      );
      if (response.data["success"] == true) {
        console.log(response.data.data.sites); // handle the response from the server
        setSitesList(response.data.data.sites);
        setTotalCount(response.data.data.count);
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

  const deleteSelectedSite = async () => {
    console.log('Selected Site : ', selectedSite);
    try {
      const response = await axiosInstance.delete(
        `/sites/deleteSite/${selectedSite.id}`
      );
      if (response.data["success"] == true) {
        console.log(response); // handle the response from the server
        fetchAllSites();
        setCurrentPage(0);
      }
    } catch (error) {
      console.log(error); // handle the error
    }
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
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-4"
                      >
                        Edit
                      </a>

                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          setSubmissionModal(true);
                          setSelectedSite(item)
                        }}
                      >
                        Delete 
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
          <Pagination className="mb-2"
                totalPosts={totalCount}
                postsPerPage={PageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
        {submissionModal && (
          <>
            <div className="fixed inset-0 flex items-top  justify-center z-50">
              <div
                className="absolute inset-0 backdrop-filter backdrop-blur-sm"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
              ></div>
              <div
                className="relative top-20 z-50"
                style={{ width: "800px", maxWidth: "100%" }}
              >
                <div className="p-4 text-center sm:p-0">
                  <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl">
                    <div className="px-5 py-5">
                      <div className="flex justify-between items-center">
                        <h2 className="text-black text-[20px] font-bold helvetica not-italic">
                          Please confirm submission
                        </h2>
                        {/* <GrFormClose
                          onClick={() => setSubmissionModal(false)}
                        /> */}
                      </div>
                      <div>
                        <div className="flex py-10 justify-between items-center">
                          <p className="text-[16px] font-bold helvetica not-italic">
                            Are you sure you want to submit?
                          </p>
                          <div className="flex gap-10 pr-10">
                            <button
                              className="bg-[#00617F] text-[16px] font-bold helvetica border hover:border-[#00617F] hover:bg-[#fff] hover:text-[#00617F]  text-[#FFFFFF] px-10 py-2 rounded-[8px]"
                              onClick={async () => {
                                setSubmissionModal(false);
                                // nextStep();
                                await deleteSelectedSite(true);
                              }}
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => {
                                setSubmissionModal(false);
                              }}
                              className="bg-[#FFFFFF] text-[16px] font-bold helvetica hover:bg-[#00617F] hover:text-[#fff] text-[#00617F] px-10 py-2 rounded-[8px] border border-[#00617F]"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Tabledata;
