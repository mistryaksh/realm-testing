import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { AppStore } from "../redux";

export interface AppProviderProps{
     children:ReactNode
}

export const AppProvider:FC<AppProviderProps> =({children})=>{
     return (
          <Provider store={AppStore}>
               {children}
          </Provider>
     )
}