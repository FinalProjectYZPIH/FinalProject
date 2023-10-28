import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      {/* <div className="flex items-center justify-center bg-bgLightMode h-screen w-screen-sm bg-cover">
        <div className="m-10 h-screen-sm w-screen-sm bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25">
        </div>
      </div> */}
          <Outlet />
    </>
  );
}

export default AuthLayout;
