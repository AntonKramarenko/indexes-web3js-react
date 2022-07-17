
export interface ICaContract{
    methods: {
        getGroup:(groupId:string)=> {
            call:()=> Promise<IGroupsId>
        },
        getGroupIds:()=> {
            call:()=> Promise<string[]>
        },
        getIndex:(index:string)=>{
            call:()=> Promise<IIndexInfo>
        }
      }
}

export interface IGroupsId {
        name:string,
        indexes: string[]
}

export interface IIndexInfo{
    ethPriceInWei:string,
    name:string,
    percentageChange:string,
    usdCapitalization:string,
    usdPriceInCents:string
}
