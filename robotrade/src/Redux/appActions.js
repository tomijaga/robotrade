import {
 
  SELECTED_NAVBAR_ITEM
} from "./appConstants.js";

export const setSelectedNavbarItem=(index)=>({
  type:SELECTED_NAVBAR_ITEM,
  payload:index
})