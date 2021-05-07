import store from "../redux/store/index";
import { getSearchResults } from "../redux/actions/index";

window.store = store;
window.getSearchResults = getSearchResults;