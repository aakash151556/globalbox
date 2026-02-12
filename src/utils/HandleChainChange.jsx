export const HandleChainChange=async(setState)=>{
    let chainInHex=await window.ethereum.request({
        method:"eth_chainId"
    })
    const chainId=parseInt(chainInHex,16)    
    setState(prevState=>({...prevState,chainId}))
}