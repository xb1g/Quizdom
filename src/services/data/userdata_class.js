import React, { useState, useEffect, createContext } from "react";
import { db, auth } from "../../../firebase-config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

class User_data{
    constructor(nothing){
        this.nothing=nothing
    }
    map(this,milestones,exp,level,current_theme,achievement,map_decor){
        this.milestones=milestones
        this.exp=exp
        this.level=level
        this.current_theme=current_theme
        this.achievement=achievement
        this.map_decor=map_decor
    }
    user(this,friend,achievement_pg,about_me,theme,questions_data,profile_pic,map_pg,subject_like,fav_badge,frame,banner){
        this.friend=friend //already have
        this.achievement_pg=achievement_pg
        this.about_me=about_me
        this.theme=theme
        this.questions_data=questions_data
        this.profile_pic=profile_pic
        this.map_pg=map_pg
        this.subject_like=subject_like
        this.fav_badge=fav_badge
        this.frame=frame
        this.banner=banner
    }
    plan(this,name_plan,map_in_p){
        this.name_plan=name_plan
        this.map_in_p=map_in_p
    }
}