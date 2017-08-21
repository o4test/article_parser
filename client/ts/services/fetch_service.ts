import {fetchFromLocal as fetch} from './fetch';

const FetchService = {
  getListToUpdate(url: string) {
    return fetch(`/api/article/?url=${url}`)
  },

  getList() {
    return fetch('/api/results');
  },

  updateOne(data: any) {
    return fetch('/api/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  approveOne(id: string) {
    return fetch('/api/approve', {
      method: 'PUT',
      body: JSON.stringify({id}),
    });
  },

  deleteOne(id: string) {
    return fetch(`/api/delete/${id}`, {method: 'DELETE'});
  },
};

export default FetchService;
