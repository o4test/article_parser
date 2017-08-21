import Dispatcher from '../dispatcher';
import Constants from '../constants';
import { Store } from '../core/store';

interface IArticle {
  title: string;
  articleUrl: string;
  paragraphs: any[];
}

/**
 * This store keeps our app information
 *
 * @class ApplicationStore
 * @extends {Store}
 */
class ApplicationStore extends Store {
  private list: any[];
  private article: any;
  private currentPage: string;

  constructor() {
    super();
  }

  /**
   * Get loaded article
   * @returns {any}
   */
  getArticle() {
    return this.article;
  }

  /**
   * Get unapproved paragraphs
   * @returns {any}
   */
  getUnapprovedList() {
    return this.list;
  }

  /**
   * Get page what we need to open
   */
  getCurrentPage() {
    return this.currentPage;
  }

  /**
   * Update news list to be confirmed
   *
   * @param {IArticle[]} list
   *
   * @memberof ApplicationStore
   */
  getListFromServer = (list: IArticle[]) => {
    this.currentPage = 'list';
    this.list = list;
    this.emitChange();
  }

  /**
   * Update articles list to be updated
   *
   * @param {IArticle[]} article
   *
   * @memberof ApplicationStore
   */
  getListToUpdateFromServer = (article: IArticle[]) => {
    this.article = article;
    this.currentPage = 'article';
    this.emitChange();
  }

  /**
   * Remove item from the store by id
   * @param {string} itemId
   */
  removeFromStoreById = (itemId: string) => {
    const index = this.list.findIndex(({id}) => itemId === id);
    if (index < 0) return;
    this.list.splice(index, 1);
    this.emitChange();
  }
}

let appStore: ApplicationStore;

if (!appStore) {
  appStore = new ApplicationStore();
}

Dispatcher.register(Constants.GET_LIST_FROM_SERVER, appStore.getListFromServer);
Dispatcher.register(Constants.GET_LIST_TO_UPDATE_FROM_SERVER, appStore.getListToUpdateFromServer);
Dispatcher.register(Constants.REMOVE_FROM_STORE_BY_ID, appStore.removeFromStoreById);

export default appStore;
