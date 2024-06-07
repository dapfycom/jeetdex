import {
  AbiRegistry,
  Address,
  ArgSerializer,
  ContractFunction,
  EndpointParameterDefinition,
  ResultsParser,
  SmartContract,
  TypeExpressionParser,
  TypeMapper,
  TypedOutcomeBundle
} from '@multiversx/sdk-core/out';
import { SmartContractConfigTypes, smartContractsConfig } from '.';
import { provider } from './provider';

export const fetchScSimpleData = async <T>(scInfo: string, args?: any[]) => {
  const scInfoArr = scInfo.split(':');
  const scWsp = scInfoArr[0] as SmartContractConfigTypes;
  const funcName = scInfoArr[1];

  const res: any = await scQuery(scWsp, funcName, args);

  const { firstValue } = res;
  const data: T = firstValue?.valueOf();

  return data;
};

export const fetchScSimpleDataWithContract = async <T>(
  scInfo: string,
  abi,
  args?: any[]
) => {
  const scInfoArr = scInfo.split(':');
  const scAddress = scInfoArr[0] as string;
  const funcName = scInfoArr[1];

  const res: TypedOutcomeBundle = await scQueryWithContract(
    scAddress,
    abi,
    funcName,
    args
  );

  const { firstValue, returnMessage } = res;
  const data: T = firstValue?.valueOf();

  return { data, returnMessage };
};

export const scQuery = async (
  workspace: SmartContractConfigTypes,
  funcName: string,
  args: any[] = []
) => {
  try {
    const { address, abi } = smartContractsConfig[workspace];

    if (!abi) {
      return;
    }
    const abiRegistry = await AbiRegistry.create(abi);
    const contract = new SmartContract({
      address: address,
      abi: abiRegistry
    });

    const interaction = contract.methods[funcName](args);
    const query = interaction.check().buildQuery();
    const queryResponse = await provider.queryContract(query);

    const data = new ResultsParser().parseQueryResponse(
      queryResponse,
      interaction.getEndpoint()
    );

    return data;
  } catch (error) {
    console.log(`query error for ${funcName}  : `, error);
    throw error;
  }
};
export const scSimpleQuery = async (
  scAddress: string,
  funcName: string,
  args: any[] = [],
  pureReturn: boolean = false
) => {
  try {
    const contractAddress = new Address(scAddress);
    const contract = new SmartContract({ address: contractAddress });

    const query = contract.createQuery({
      func: new ContractFunction(funcName),
      args: args
    });
    const resultsParser = new ResultsParser();

    const queryResponse = await provider.queryContract(query);
    if (pureReturn) {
      return queryResponse;
    }
    const bundle = resultsParser.parseUntypedQueryResponse(queryResponse);

    return bundle;
  } catch (error) {
    console.log(error);
  }
};

export const scQueryByFieldsDefinitions = async (
  workspace: SmartContractConfigTypes,
  funcName = '',
  args: any[] = [],
  dataFields?: any[]
) => {
  const { address, abi } = smartContractsConfig[workspace];
  if (!abi) {
    return;
  }
  const abiRegistry = await AbiRegistry.create(abi);
  const contract = new SmartContract({
    address: address,
    abi: abiRegistry
  });

  const query = contract.createQuery({
    func: new ContractFunction(funcName),
    args: args
  });

  const queryResponse = await provider.queryContract(query);

  const response = queryResponse.returnData
    .map((item: string) => Buffer.from(item, 'base64').toString('hex'))
    .join('@');
  const serializer = new ArgSerializer();
  const typeParser = new TypeExpressionParser();
  const typeMapper = new TypeMapper();

  if (!dataFields) {
    return { response, queryResponse };
  }
  const fieldDefinitions = dataFields.map(
    ([name, expression]: [string, string]) =>
      new EndpointParameterDefinition(
        name,
        '',
        typeMapper.mapType(typeParser.parse(expression))
      )
  );

  const parsed = serializer.stringToValues(response, fieldDefinitions);

  return parsed;
};

export const scQueryWithContract = async (
  scAddress: string,
  abi: any,
  funcName = '',
  args: any[] = []
) => {
  try {
    if (!abi) {
      return;
    }
    const abiRegistry = await AbiRegistry.create(abi);
    const contract = new SmartContract({
      address: Address.fromBech32(scAddress),
      abi: abiRegistry
    });

    const interaction = contract.methods[funcName](args);
    const query = interaction.check().buildQuery();
    const queryResponse = await provider.queryContract(query);

    const data = new ResultsParser().parseQueryResponse(
      queryResponse,
      interaction.getEndpoint()
    );

    return data;
  } catch (error) {
    console.log(`query error for ${funcName}  : `, error);
    throw error;
  }
};
