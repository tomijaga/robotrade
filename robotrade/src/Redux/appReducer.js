import {

  SELECTED_NAVBAR_ITEM
} from "./appConstants.js";

export const selectedNavbarItem=(state=0, action={})=>{

switch(action.type){
  case SELECTED_NAVBAR_ITEM:
   return action.payload;

   default:
   return state;

  }
}