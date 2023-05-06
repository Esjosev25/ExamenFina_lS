const { CommunicationProtocolEnum, DaprClient } = require('@dapr/dapr');
const { v4: uuidv4 } = require('uuid');
 
const protocol =
  process.env.DAPR_PROTOCOL === 'grpc'
    ? CommunicationProtocolEnum.GRPC
    : CommunicationProtocolEnum.HTTP;

const host = process.env.DAPR_HOST ?? 'localhost';

let port;
switch (protocol) {
  case CommunicationProtocolEnum.HTTP: {
    port = process.env.DAPR_HTTP_PORT;
    break;
  }
  case CommunicationProtocolEnum.GRPC: {
    
    port = process.env.DAPR_GRPC_PORT;
    break;
  }
  default: {
    port = 3500;

  }
}

const DAPR_STATE_STORE_NAME = 'votaciones';

const client = new DaprClient(host, port, protocol);
const daprGet =async (daprUuid)=>{
const data = await client.state.get(DAPR_STATE_STORE_NAME, daprUuid);
return data;
}

const daprPost = async (data) => {
  const key = uuidv4()
  const state = [
    {
      key,
      value: data,
    },
  ];
  await client.state.save(DAPR_STATE_STORE_NAME, state);
  console.log('Saving data : ', data);
return key;
};


const daprDelete= async (daprUuid)=>{
  // Delete state from the state store
        await client.state.delete(DAPR_STATE_STORE_NAME, daprUuid);
        console.log('deleted ', daprUuid);
}
module.exports = {
  protocol,
  host,
  DAPR_STATE_STORE_NAME,
  daprGet,
  daprPost,
  daprDelete,
};