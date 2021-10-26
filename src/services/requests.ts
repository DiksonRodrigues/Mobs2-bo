import  api  from './api';
import {} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ITypes,
  IEnterprises,
  IStatus,
  IVehicleDescription,
  IDriver,
  IHist,
  IListMedidasTomadas,
  ILinha,
  ITerceiro
} from './interfaces';
const REnterprisesOptions = async (orgId: string) => {
  const response: {
    data: {
      data: Array<IEnterprises>;
    };
  } = await api.get(`/boletim_ocorrencia/clients/${orgId}`);

  return response.data.data.map(data => ({name: data.name, value: data}));
};

const RVehicleDescriptionOptions = async (orgId: string) => {
  const response: {
    data: {
      data: Array<IVehicleDescription>;
    };
  } = await api.get(`/assets?orgid=${orgId}`);

  return response.data.data;
};

const RGetStatus = async (orgId: string) => {
  const response: {
    data: {
      data: Array<IStatus>;
    };
  } = await api.get(`/boletim_ocorrencia/status/${orgId}`);

  return response.data.data;
};

const RGetDriver = async (orgId: string) => {
  const response: {
    data: {
      data: Array<IDriver>;
    };
  } = await api.get(`/boletim_ocorrencia/motoristas/${orgId}`);

  return response.data.data;
};

const RGetLinhas = async (orgId: string) => {
  const response: {
    data: {
      data: Array<ILinha>;
    };
  } = await api.get(`/linhas/${orgId}`);

  return response.data.data;
};

const RGetTypes = async (id: string | undefined, orgId: string) => {

  const idBoletim = await AsyncStorage.getItem('@IdBoletim');

  if ( idBoletim ) {
    console.log(" aaaaaaa " , idBoletim)
    const response: {
      data: {
        data: Array<ITypes>;
      };
    } = await api.get(`/users/${idBoletim && JSON.parse(idBoletim)}/boletim_ocorrencia/types/${orgId}`);
  
    return response.data.data;
  }
};

const RGetHistoric = async (id: string | undefined) => {
    const response: {
      data: {
        data: Array<IHist>;
      };
    } = await api.get(`/users/${id}/boletim_ocorrencia/42`);
  
    return response.data.data.map(data => ({
    ...data,
    }));
};

// const sendLocation = async (
//   typeId: string | undefined,
//   data: {long: string; lat: string},
//   orgId: string,
// ) => {
//   await api.post(`/boletim_ocorrencia/${typeId}/latlong/${orgId}`, data);
// };

const setBoletimOccurrence = async (
  data: {
    boletim_ocorrencia_type_id: string;
  },
) => {
  const response = await api.post(`/boletim_ocorrencia/initial/42`, data);
  if (response.data.data) {
    return response.data.data;
  } else {
    return response;
  }
};

const updatePhotos = async (
  id: string,
  images: Array<string>,
  orgId: string,
): Promise<void> => {
  await api.post(`/boletim_ocorrencia/${id}/images/${orgId}`, {
    images,
  });
};

const setMedidasTomadas = async (

  id: string,
  data: Array<IListMedidasTomadas>,
  orgId: string,
): Promise<void> => {
  const idBoletim = await AsyncStorage.getItem('@IdBoletim');

  if(idBoletim){
    const dataToSend = {
      measures: data,
    };
    await api.post(`/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/measures/${orgId}`, dataToSend);
  }
};

// const RGetCustosOptions = async (id: string | undefined, orgId: string) => {
//   const response: {
//     data: {
//       data: Array<ICosts>;
//     };
//   } = await api.get(`/boletim_ocorrencia/${id}/costs/${orgId}`);

//   return response.data.data.map(data => ({
//     name: data.desc,
//     value: data,
//   }));
// };

const sendCost = async (
  id: string,
  table: Array<{
    desc: string;
    value: number | null;
    accountable: string;
  }>,
  orgId: string,
): Promise<void> => {
  const idBoletim = await AsyncStorage.getItem('@IdBoletim');

  if(idBoletim){
    table.map(async data => {
      await api.post(`/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/costs/${orgId}`, {...data});
    });
  }
};

const setManu = async (
  id: string,
  maintenance_site: string,
  maintenance_started_at: string,
  maintenance_ended_at: string,
  orgId: string,
) => {
  const idBoletim = await AsyncStorage.getItem('@IdBoletim');

  if(idBoletim){
    await api.post(`/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/maintenance/${orgId}`, {
      maintenance_site,
      maintenance_started_at,
      maintenance_ended_at,
    });
  }
};

const closeBO = async (id:string) => {
  const idBoletim = await AsyncStorage.getItem('@IdBoletim');

  if(idBoletim){
    await api.post(`/boletim_ocorrencia/${id}/close/42`);
  }
};

export {
  REnterprisesOptions,
  RVehicleDescriptionOptions,
  RGetStatus,
  RGetDriver,
  RGetLinhas,
  RGetHistoric,
  // sendLocation,
  closeBO,
  updatePhotos,
  setMedidasTomadas,
  // RGetCustosOptions,
  RGetTypes,
  setBoletimOccurrence,
  sendCost,
  setManu,
  // terceiro

};
