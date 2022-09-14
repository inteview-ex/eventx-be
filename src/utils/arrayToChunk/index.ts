// arrayToChunk(
//     array:T[],
//     chunkSize:number = 1,
//   ){}


const ArraySplitToChunks = <T extends unknown>(array:T[], chunkSize:number = 1):T[][] =>{
    if(chunkSize <= 0){
        throw new Error("chunksize must greater than 0")
    }
    const result:T[][] = []
    for (let i = 0; i < array.length; i+= chunkSize) {
        const chunk = array.slice(i, i+chunkSize)
        result.push(chunk)
    }
    return result
}

export {ArraySplitToChunks}