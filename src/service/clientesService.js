import apiClient from './api';

export const clientesService = {
  // Get all clients
  getAllClientes() {
    return apiClient.get('/api/Clientes');
  },

  // Get client by ID
  getClienteById(idCliente) {
    return apiClient.get(`/api/Clientes/${idCliente}`);
  },

  // Create new client
  createCliente(clienteData) {
    return apiClient.post('/api/Clientes', clienteData);
  },

  // Update client
  updateCliente(clienteData) {
    return apiClient.put('/api/Clientes', clienteData);
  },

  // Delete client
  deleteCliente(idCliente) {
    return apiClient.delete(`/api/Clientes/${idCliente}`);
  },

  // Get clients by SR (Service Request)
  getClientesBySR() {
    return apiClient.get('/api/Clientes/BySR');
  }
};
