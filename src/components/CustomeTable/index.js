import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React, { useState } from "react";

const TableHeader = ({ headers }) => {
  return (
    <thead className="w-full">
      <tr className="w-full bg-tertiary">
        {headers.map((header, index) => (
          <th key={index} className="text-center text-background font-[600] p-5">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = ({ data, columns, currentPage, onPageChange }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <tbody>
      {visibleData.map((item, rowIndex) => (
        <tr
          key={rowIndex}
          className={
            "border-t border-tertiary" +
            (rowIndex % 2 === 0
              ? " bg-gray100 dark:bg-[#67b5bf]"
              : " bg-gray300 dark:bg-[#438891]")
          }
        >
          {columns.map((column, columnIndex) => (
            <td
              key={rowIndex + columnIndex}
              className={
                "p-5 text-center" +
                (rowIndex % 2 === 0
                  ? " text-secondary dark:text-darkSecondary"
                  : " text-secondary dark:text-darkSecondary") +
                (column.pointer ? " cursor-pointer hover:text-tertiary" : "")
              }
            >
              {column.indexing
                ? (((currentPage - 1) * itemsPerPage) + rowIndex + 1)
                : column.transform
                  ? column.transform(item[column.property])
                  : item[column.property]}
            </td>
          ))}
        </tr>
      ))}
      <tr>
        <td colSpan={columns.length}>
          <div className="flex justify-end p-5 bg-tertiary dark:bg-tertiary">
            <select className="mr-2 bg-tertiary px-1 border rounded text-white" name="perPage" id="perPage" onChange={(event) => {
              setItemsPerPage(event.target.value)
            }}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <button
              className="mr-2 pl-2 py-1 border rounded cursor-pointer hover:bg-main text-white"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowBackIos />
            </button>
            <span className="flex justify-center items-center text-center text-white">
              {[...Array(totalPages)].map((data, index) => (
                <p key={index} onClick={() => onPageChange(index + 1)} className={currentPage === (index + 1) ? " text-main font-bold cursor-pointer w-5 h-5 rounded-full mx-1" : "text-background cursor-pointer w-5 h-5 rounded-full mx-1"}>{index + 1}</p>
              ))}

            </span>
            <button
              className="mx-2 px-1 py-1 border rounded cursor-pointer hover:bg-main text-white"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ArrowForwardIos />
            </button>
          </div>
          <div>
          </div>
        </td>
      </tr>
    </tbody>
  );
};


const CustomTable = ({ headers, data, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <table className="w-full border border-tertiary rounded-lg overflow-hidden">
        <TableHeader headers={headers} />
        <TableBody
          data={data}
          columns={columns}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </table>
    </div>
  );
};

export default CustomTable;
