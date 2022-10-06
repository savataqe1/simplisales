import React, { FC, useState } from "react";

export interface FlightCardProps {
  className?: string;
  data: {
    id: string;
    orderDate: string;
    orderName: string;
    notes: string;
    total: string;

    price: string;
  };
}

const FlightCard: FC<FlightCardProps> = ({ className = "", data }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(data);
  const renderDetailTop = () => {
    return (
      <div>
        <div className="flex flex-col md:flex-row ">
          <div className="flex my-5 md:my-0">
            <div className="flex-shrink-0 flex flex-col items-center py-2"></div>
            <div className="ml-4 space-y-10 text-sm">
              <div className="flex flex-col space-y-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDetail = () => {
    if (!isOpen) return null;
    return (
      <div className="p-4 md:p-8 border border-neutral-200 dark:border-neutral-700 rounded-2xl ">
        {renderDetailTop()}
        <div className="my-7 md:my-10 space-y-5 md:pl-24">
          <div className="border-t border-neutral-200 dark:border-neutral-700" />
          <div className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            Products
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-700" />
        </div>
        {renderDetailTop()}
      </div>
    );
  };

  return (
    <div
      className={`nc-FlightCardgroup p-4 sm:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-100
     dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6 ${className}`}
      data-nc-id="FlightCard"
    >
      <div
        className={` sm:pr-20 relative  ${className}`}
        data-nc-id="FlightCard"
      >
        {/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="##" className="absolute inset-0" />

        <span
          className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer ${
            isOpen ? "transform -rotate-180" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="text-xl las la-angle-down"></i>
        </span>

        <div className="flex  flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0">
          {/* LOGO IMG */}

          {/* FOR MOBILE RESPONSIVE */}

          {/* TIME - NAME */}
          <div className="hidden lg:block  min-w-[150px] flex-[4] ">
            <div className="font-medium text-lg">{data.orderDate}</div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              {data.id}
            </div>
          </div>

          {/* TIMME */}
          <div className="hidden lg:block flex-[4] whitespace-nowrap">
            <div className="font-medium text-lg"> {data.orderName}</div>
          </div>

          {/* TYPE */}

          {/* PRICE */}
          <div className="flex-[4] whitespace-nowrap sm:text-right">
            <div>
              <span className="text-xl font-semibold text-secondary-6000">
                ${data.total}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
              {data.notes}
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL */}
      {renderDetail()}
    </div>
  );
};

export default FlightCard;
