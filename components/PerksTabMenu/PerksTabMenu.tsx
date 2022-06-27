import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PerksTabMenu({ tabs, handleActiveTab }) {
  return (
    <div className="pb-5 border-b border-gray-200 sm:pb-0 dark:border-[#FFFFFF]/[0.05]">
      <h3 className="text-[48px] text-[#171717] dark:text-[#ECECEC]">Perks</h3>
      <div className="mt-[36px]">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full pl-3 pr-10 py-2 text-base border-black focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
            defaultValue={tabs.find((tab) => tab.active).name}
          >
            {tabs.map((tab, index) => (
              <option key={tab.name} onClick={() => handleActiveTab(index)}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab, index: Number) => {
              console.log(tab);
              return (
                <button
                  key={tab.name}
                  onClick={() => handleActiveTab(index)}
                  className={classNames(
                    tab.active
                      ? "border-black text-[#1A021B] dark:text-[#ECECEC] dark:border-[#ECECEC]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-[#ECECEC]",
                    "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition duration-150 hover:ease-in-out"
                  )}
                  aria-current={tab.active ? "page" : undefined}
                >
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
