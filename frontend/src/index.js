import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastBar, Toaster, toast } from "react-hot-toast";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { AiOutlineClose } from "react-icons/ai";
import UserProvider from "./context/user/UserProvider";
import GroupsProvider from "./context/groups/GroupsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GroupsProvider>
      <UserProvider>
        <App />
        <Toaster>
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== "loading" && (
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => toast.dismiss(t.id)}
                    >
                      <AiOutlineClose fontSize={18} color="red" />
                    </button>
                  )}
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
      </UserProvider>
    </GroupsProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
