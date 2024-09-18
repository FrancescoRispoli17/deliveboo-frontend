//libreria per compiere chiamate http
import axios from "axios";
import { reactive } from "vue";

export const store = reactive({
  //currentPage: 1;

  results: [],
  url: "http://localhost:8000/api/",

  //endpoint per ristoranti
  restaurants: "restaurants/",

  //endpoint per ordini
  orders: "orders/",
});
