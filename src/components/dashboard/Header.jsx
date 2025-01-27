import { Add, CachedSharp } from "@mui/icons-material";
import Image from "next/image";
import React, { Component, useState } from "react";

const Header = ({ setIsAddUSerDrawerOpen, isLoading, fetchUsers }) => {
  return (
    <div className="w-full h-16 bg-[var(--primary)] flex items-center justify-between md:px-4 sticky top-0 z-10">
      <div className="flex items-center gap-4 md:gap-8 pl-4 md:pl-0">
        {/* <Image src="/globe.svg" alt="Logo" className="text-white" width={40} height={40} /> */}
        <h1 className="text-white text-sm md:text-xl font-bold md:flex-1">
          User Management Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4 md:gap-8 pr-4 md:pr-0">
        <button disabled={isLoading.isFetching} onClick={fetchUsers} className="flex items-center gap-2">
          {isLoading.isFetching?"Fetching...":"Refresh"}
          <CachedSharp className={isLoading.isFetching ? "animate-spin" : ""} />
        </button>
        <button
          className=" flex items-center gap-2 md:flex-1"
          onClick={() => setIsAddUSerDrawerOpen(true)}
        >
          <Add className="md:hidden" />
          <span className="hidden md:block">Add User</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
