import Dispatcher from '../dispatcher';
import {ARTICLE_URL_PARAM_NAME} from './other_constants';

const {pathname, search} = location;

// If our url string matches to some param, send request to the server
if (pathname === '/fb' && search.includes(`?${ARTICLE_URL_PARAM_NAME}=http`)) {
  Dispatcher.actions.getListToUpdate(search.replace(`?${ARTICLE_URL_PARAM_NAME}=`, ''))
} else if (pathname === '/fb/results') {
  Dispatcher.actions.getList();
} else {
  // Send getList for aby page, for now
  Dispatcher.actions.getList();
}