export interface EthereumTransaction {
    privateKey: string
    to: string
    methodSignature: string
    args: Array<object>
    nonce: string
    value: string
    gasLimit: string
    gasPrice: string
    data: string
}