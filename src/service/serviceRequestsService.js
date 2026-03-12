import apiClient from './api';

export const serviceRequestsService = {
  // Get service request by ID
  getServiceRequest(idSR) {
    return apiClient.get(`/api/ServiceRequests/${idSR}`);
  },

  // Get service requests by params (search/filter)
  getByParams(params) {
    return apiClient.post('/api/ServiceRequests/GetByParams', params);
  },

  // Create service request
  createServiceRequest(srData) {
    return apiClient.post('/api/ServiceRequests', srData);
  },

  // Update service request
  updateServiceRequest(srData) {
    return apiClient.put('/api/ServiceRequests', srData);
  },

  // Delete service request
  deleteServiceRequest(idSR) {
    return apiClient.delete(`/api/ServiceRequests/${idSR}`);
  },

  // Get watches/relogios for a service request
  getRelogiosBySR(idSR) {
    return apiClient.get(`/api/ServiceRequests/relogios/${idSR}`);
  },

  // Get specific watch for a service request
  getRelogioDetail(idSR, idRelogio) {
    return apiClient.get(`/api/ServiceRequests/relogios/${idSR}/${idRelogio}`);
  },

  // Delete watch from service request
  deleteRelogio(idSR, idRelogio) {
    return apiClient.delete(`/api/ServiceRequests/relogios/${idSR}/${idRelogio}`);
  },

  // Create watch for service request
  createRelogio(relogioData) {
    return apiClient.post('/api/ServiceRequests/relogio', relogioData);
  },

  // Update watch for service request
  updateRelogio(relogioData) {
    return apiClient.put('/api/ServiceRequests/relogio', relogioData);
  },

  // Get service request history
  getHistorico(idSR) {
    return apiClient.get(`/api/ServiceRequests/historico/${idSR}`);
  },

  // Create history entry
  createHistorico(historicoData) {
    return apiClient.post('/api/ServiceRequests/historico', historicoData);
  }
};
