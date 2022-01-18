import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../../../firebase-config";
import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";
import { setsMapTemplate } from "../data/math/sets";
export const CommunityContext = createContext();
export const CommunityContextProvider = ({ children }) => {};
