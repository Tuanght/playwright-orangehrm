import loginCases from '../resources/data/login.json'
import pimCases from '../resources/data/pim.json'
import adminCases from '../resources/data/admin.json'

export const dataSchemas = {
  adminCases,
  pimCases,
  loginCases
} as const;

export type DataSchemas = typeof dataSchemas;
export type TestDataNamespace = keyof DataSchemas;

function loadDataByEnv<T>(base: T, dev: T): T {
  const env = (process.env.NODE_ENV || process.env.TEST_ENV || 'dev').toLowerCase();
  switch (env) {
    case 'dev':
    case 'development':
      return dev;
    default:
      return base;
  }
}

type DataEntry<T = any> = { data: T };

export const testDataCatalog = {
  loginCases: loadDataByEnv(loginCases, loginCases),
  pimCases: loadDataByEnv(pimCases, pimCases),
  adminCases: loadDataByEnv(adminCases, adminCases),
} as const;

function cloneData<T>(data: T): T {
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(data);
  }
  return JSON.parse(JSON.stringify(data));
}

export function getTestDataSimple<
  N extends TestDataNamespace,
  K extends keyof DataSchemas[N]
>(
  namespace: N,
  key: K,
  options?: {
    overrides?: Record<string, any>;
    transform?: (data: any) => any;
  }
): any {
  const namespaceData = testDataCatalog[namespace] as any;
  if (!namespaceData) {
    throw new Error(
      `Namespace "${String(namespace)}" không tồn tại. ` +
        `Các namespace có sẵn: ${Object.keys(testDataCatalog).join(', ')}`
    );
  }

  const entry = namespaceData[key];
  if (!entry) {
    throw new Error(
      `Key "${String(key)}" không tồn tại trong namespace "${String(namespace)}". ` +
        `Các keys có sẵn: ${Object.keys(namespaceData).join(', ')}`
    );
  }

  const dataEntry = entry as unknown as DataEntry;
  let result = cloneData(dataEntry.data);

  if (options?.overrides) {
    if (Array.isArray(result)) {
      throw new Error(
        `Không thể dùng overrides cho array. Hãy dùng transform() thay thế: ${String(
          namespace
        )}.${String(key)}`
      );
    }
    if (typeof result !== 'object' || result === null) {
      throw new Error(
        `Không thể dùng overrides cho primitive. Hãy dùng transform() thay thế: ${String(
          namespace
        )}.${String(key)}`
      );
    }
    Object.assign(result, options.overrides);
  }

  if (options?.transform) {
    result = options.transform(result);
  }

  return result;
}