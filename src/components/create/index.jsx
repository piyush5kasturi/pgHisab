import { lazy } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { tabSlug } from "./helper";
import classNames from "classnames";
import Header from "../header";

const PayAll = lazy(() => import("./pay-all"));
// const ContestResult = lazy(() => import('./result'));
const Create = () => {
  const location = useLocation();
  return (
    <>asa</>
    // <Header />
    // <div className={'h-auto p-10'}>
    //     <div className="relative mb-6 bg-white">
    //         <ul className={'flex sticky top-8 w-full overflow-x-auto z-10  no-scrollbar'}>
    //             {tabSlug.map((v, i) => (
    //                 <li key={i} className="flex items-center justify-center">
    //                     <NavLink
    //                         to={v.route}
    //                         className={classNames(
    //                             'md:px-6 capitalize text-[16px] font-inter whitespace-nowrap text-[#6D6D6D] dark:text-[#888888] dark:bg-dark tracking-wide cursor-pointer  pb-[14px]  !border-r-0 border-l-0 border-y-0 border',
    //                             {
    //                                 'border-b-2 border-l-0 border-r-0 text-red-500 border dark:!bg-dark !bg-white outline-none border-primary':
    //                                     location.pathname.endsWith(
    //                                         v.route == '/' ? 'create' : v.route,
    //                                     ),
    //                                 'border-r-0 ': i === tabSlug.length - 1,
    //                                 'px-5': i > 0,
    //                                 'pr-5': i === 0,
    //                             },
    //                         )}
    //                     >
    //                         {v.name}
    //                     </NavLink>
    //                 </li>
    //             ))}
    //         </ul>
    //         <div
    //             className="absolute left-0 bottom-[0.5px] border-b-[1px] dark:border-[#3D3D3D] w-full z-0"
    //         ></div>
    //     </div>

    //     <Routes>
    //         <Route path="/" element={<PayAll />} />
    //         {/* <Route path="/upcoming" element={<ContestViewAll type="upcoming" />} /> */}
    //     </Routes>
    // </div>
  );
};

export default Create;
