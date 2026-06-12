import { gasRequest, gasPost } from './api';
import { dummyLeads } from '../data/dummyData';

const isGASConfigured = () => {
  const url = import.meta.env.VITE_GAS_URL || '';
  return url && !url.includes('YOUR_SCRIPT_ID');
};

const getLocalLeads = () => {
  const local = localStorage.getItem('upperink_leads');
  if (!local) {
    localStorage.setItem('upperink_leads', JSON.stringify(dummyLeads));
    return dummyLeads;
  }
  return JSON.parse(local);
};

const saveLocalLeads = (leads) => {
  localStorage.setItem('upperink_leads', JSON.stringify(leads));
};

export const createLead = async (leadData) => {
  if (!isGASConfigured()) {
    const leads = getLocalLeads();
    const newLead = { 
      ...leadData, 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    leads.push(newLead);
    saveLocalLeads(leads);
    console.log('[DEV] Lead created (persisted to LocalStorage):', newLead);
    return { success: true, lead_id: leadData.lead_id };
  }

  return await gasPost({
    action: 'createLead',
    data: leadData,
  });
};

export const getLeads = async () => {
  if (!isGASConfigured()) {
    return getLocalLeads();
  }

  const result = await gasRequest({ action: 'getLeads' });
  return result?.data || [];
};

export const getLeadByTracking = async (leadId, whatsapp) => {
  if (!isGASConfigured()) {
    const leads = getLocalLeads();
    const lead = leads.find(
      (l) =>
        l.lead_id.toLowerCase() === leadId.toLowerCase() &&
        l.whatsapp.replace(/\D/g, '') === whatsapp.replace(/\D/g, '')
    );
    return lead || null;
  }

  // Under the hood, track order retrieves matching lead
  const result = await gasRequest({
    action: 'getLeads',
  });
  if (result?.data) {
    const cleanNumber = (num) => String(num).replace(/\D/g, '');
    const targetWa = cleanNumber(whatsapp);
    return result.data.find(
      (l) =>
        String(l.lead_id).toLowerCase() === leadId.toLowerCase() &&
        cleanNumber(l.whatsapp) === targetWa
    ) || null;
  }
  return null;
};

export const updateLead = async (leadId, updateData) => {
  if (!isGASConfigured()) {
    const leads = getLocalLeads();
    const updatedLeads = leads.map(l => 
      l.lead_id === leadId 
        ? { ...l, ...updateData, updated_at: new Date().toISOString() } 
        : l
    );
    saveLocalLeads(updatedLeads);
    console.log('[DEV] Lead updated (persisted to LocalStorage):', leadId, updateData);
    return { success: true };
  }

  return await gasPost({
    action: 'updateLead',
    lead_id: leadId,
    data: updateData,
  });
};

export const deleteLead = async (leadId) => {
  if (!isGASConfigured()) {
    const leads = getLocalLeads();
    const filteredLeads = leads.filter(l => l.lead_id !== leadId);
    saveLocalLeads(filteredLeads);
    console.log('[DEV] Lead deleted (persisted to LocalStorage):', leadId);
    return { success: true };
  }

  return await gasPost({
    action: 'deleteLead',
    lead_id: leadId,
  });
};
