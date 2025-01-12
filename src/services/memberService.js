import apiClient from './api';

export const getMembers = async () => {
    try {
        const response = await apiClient.get('/members');
        return response;
    } catch (error) {
        throw error;
    }
};

export const getMember = async (id) => {
    try {
        const response = await apiClient.get(`/members/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const addMember = async (newMember) => {
    try {
        const response = await apiClient.post('/members', newMember);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteMember = async (id) => {
    try {
        const response = await apiClient.delete(`/members/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateStatus = async (id, status) => {
    try {
        const response = await apiClient.patch(`/members/status/${id}?status=${status}`);
        return response;
    } catch (error) {
        throw error;
    }
}
