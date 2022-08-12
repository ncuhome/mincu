export enum NetInfoStateType {
  unknown = 'unknown',
  none = 'none',
  cellular = 'cellular',
  wifi = 'wifi',
  bluetooth = 'bluetooth',
  ethernet = 'ethernet',
  wimax = 'wimax',
  vpn = 'vpn',
  other = 'other',
}
type NetInfoMethodType = 'HEAD' | 'GET'
export enum NetInfoCellularGeneration {
  '2g' = '2g',
  '3g' = '3g',
  '4g' = '4g',
  '5g' = '5g',
}
interface NetInfoConnectedDetails {
  isConnectionExpensive: boolean
}
interface NetInfoConnectedState<
  T extends NetInfoStateType,
  D extends Record<string, unknown> = Record<string, unknown>
> {
  type: T
  isConnected: true
  isInternetReachable: boolean | null
  details: D & NetInfoConnectedDetails
  isWifiEnabled?: boolean
}
interface NetInfoDisconnectedState<T extends NetInfoStateType> {
  type: T
  isConnected: false
  isInternetReachable: false
  details: null
}
interface NetInfoUnknownState {
  type: NetInfoStateType.unknown
  isConnected: boolean | null
  isInternetReachable: null
  details: null
}
type NetInfoNoConnectionState = NetInfoDisconnectedState<NetInfoStateType.none>
type NetInfoDisconnectedStates = NetInfoUnknownState | NetInfoNoConnectionState
type NetInfoCellularState = NetInfoConnectedState<
  NetInfoStateType.cellular,
  {
    cellularGeneration: NetInfoCellularGeneration | null
    carrier: string | null
  }
>
type NetInfoWifiState = NetInfoConnectedState<
  NetInfoStateType.wifi,
  {
    ssid: string | null
    bssid: string | null
    strength: number | null
    ipAddress: string | null
    subnet: string | null
    frequency: number | null
    linkSpeed: number | null
    rxLinkSpeed: number | null
    txLinkSpeed: number | null
  }
>
type NetInfoBluetoothState = NetInfoConnectedState<NetInfoStateType.bluetooth>
type NetInfoEthernetState = NetInfoConnectedState<
  NetInfoStateType.ethernet,
  {
    ipAddress: string | null
    subnet: string | null
  }
>
type NetInfoWimaxState = NetInfoConnectedState<NetInfoStateType.wimax>
type NetInfoVpnState = NetInfoConnectedState<NetInfoStateType.vpn>
type NetInfoOtherState = NetInfoConnectedState<NetInfoStateType.other>
type NetInfoConnectedStates =
  | NetInfoCellularState
  | NetInfoWifiState
  | NetInfoBluetoothState
  | NetInfoEthernetState
  | NetInfoWimaxState
  | NetInfoVpnState
  | NetInfoOtherState
type NetInfoState = NetInfoDisconnectedStates | NetInfoConnectedStates
type NetInfoChangeHandler = (state: NetInfoState) => void
type NetInfoSubscription = () => void
interface NetInfoConfiguration {
  reachabilityUrl: string
  reachabilityMethod?: NetInfoMethodType
  reachabilityTest: (response: Response) => Promise<boolean>
  reachabilityLongTimeout: number
  reachabilityShortTimeout: number
  reachabilityRequestTimeout: number
  reachabilityShouldRun: () => boolean
  shouldFetchWiFiSSID: boolean
  useNativeReachability: boolean
}

export interface NetInfo {
  configure: (configuration: Partial<NetInfoConfiguration>) => void
  fetch: (requestedInterface?: string) => Promise<NetInfoState>
  refresh: () => Promise<NetInfoState>
  addEventListener: (listener: NetInfoChangeHandler) => NetInfoSubscription
  useNetInfo: (configuration?: Partial<NetInfoConfiguration>) => NetInfoState
}
