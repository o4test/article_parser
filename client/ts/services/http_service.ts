import Dispatcher from '../dispatcher';
import Constants from '../constants';
import FetchService from './fetch_service';
// console.log(FetchService);
// debugger;
// import {
  // getNews,
  // getUnconfirmedList,
  // updateOne,
  // approveOne,
  // removeOve,
// } from "./fetch_service"

/**
 * Simple error handler
 * @param error
 */
const onError = (error) => {
  console.log('Error', error.message);
};


/**
 * Get list of all paragraphs that users proposed
 * @returns {Promise<never | any>}
 */
function getList() {
  return FetchService.getList()
    .then(({data}: any) => {
      Dispatcher.actions.getListFromServer(data);
    })
    .catch(onError)
}

/**
 * Get paragraphs from article
 * @param {string} url
 * @returns {Promise<never | any>}
 */
function getListToUpdate(url: string) {
  return FetchService.getListToUpdate(url)
    .then(({data}) => {
      data.articleUrl = url;
      Dispatcher.actions.getListToUpdateFromServer(data);
    })
    .catch(onError)
}

/**
 * Save proposed text
 * @param data
 * @returns {Promise<any>}
 */
function saveOne(data: any) {
  return FetchService.updateOne(data)
    .catch(onError)
}

/**
 * Approve text
 * @param {string} id
 * @returns {Promise<never | any>}
 */
function approveOne({id}: any) {
  return FetchService.approveOne(id)
    .then(() => {
      Dispatcher.actions.removeFromStoreById(id);
    })
    .catch(onError)
}

/**
 * Delete text
 * @param {string} id
 * @returns {Promise<never | any>}
 */
function deleteOne({id}: any) {
  return FetchService.deleteOne(id)
    .then(() => {
      Dispatcher.actions.removeFromStoreById(id);
    })
    .catch(onError)
}

Dispatcher.register(Constants.GET_LIST, getList);
Dispatcher.register(Constants.GET_LIST_TO_UPDATE, getListToUpdate);

Dispatcher.register(Constants.SAVE_ONE, saveOne);
Dispatcher.register(Constants.APPROVE_ONE, approveOne);
Dispatcher.register(Constants.DELETE_ONE, deleteOne);

export default {};
