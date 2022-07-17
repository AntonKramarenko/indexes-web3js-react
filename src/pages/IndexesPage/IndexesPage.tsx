import React, { useEffect, useState } from 'react'
import { IndexesBox } from '../../components/componentsPage/IndexesBox'
import './IndexesPage.scss'
import {ICaContract,  IGroupsId } from '../../types/types'
import { Loader } from '../../components/componentsUI/Loader'

interface IIndexesPage{
  caContract: ICaContract
}

export const IndexesPage: React.FC<IIndexesPage> = ({caContract}) => {
  const [groupIds, setGroupIds] = useState<string[]>([])
  const [groups, setGroups] = useState<IGroupsId[]>([])

  useEffect(() => {
    if (caContract) getGroupsIds()
    // eslint-disable-next-line
  }, [caContract])

  useEffect(() => {
    if (groupIds) getGroup()
    // eslint-disable-next-line
  }, [groupIds])

  const getGroupsIds = async () => {
    if(caContract){ 
      await caContract.methods.getGroupIds().call().then((groupsIds:string[]) => setGroupIds(groupsIds))
    }
  }

  const getGroup = async () => {
    const groupsArr:IGroupsId[] = []
    if(groupIds){
      groupIds.forEach(async (groupId) => {
        await caContract.methods.getGroup(groupId).call().then((groupId:IGroupsId) => groupsArr.push({...groupId}))
        setGroups(groupsArr);
      })
    }
  }

  return (
    <div className='indexesPage'>
      <h1 className='indexesPage__title'>All Indexes</h1>
      {groups.length
        ? groups.map((group:IGroupsId) => <IndexesBox key={group.name} titleName={group.name} indexes={group.indexes}/>)
        :  <Loader/>   
      }
    </div>
  )
}